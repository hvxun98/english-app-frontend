import React, { useContext, useEffect, useState } from "react";
import RightContent from "./rightContent/RightContent";
import Sidebar from "./sidebar/Sidebar";
import "./style.scss";
import { Spin } from "antd";
import { shuffle } from "../../../utils/Shuffle";
import Swal from "sweetalert2";
import ScoresPage from "./scoresPage/ScoresPage";
import {
  finishGameRequest,
  listQuestionRequest,
} from "../../../services/gameService";
import { notificationErr } from "../../../utils/Notification";
import { HvxContext } from "../../../contexts";

const Main = (props) => {
  const [listQuestion, setListQuestion] = useState();
  const [exam, setExam] = useState();
  const [activeQuetionList, setActiveListQuestion] = useState([]);
  const [listQuestionChoose1Of4, setListQuestionChoose1Of4] = useState([]);
  const [listQuestionFillWord, setListQuestionFillWord] = useState([]);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [finishData, setFinishData] = useState();

  const  examInfo  = useContext(HvxContext).exam;
  console.log(examInfo);

  useEffect(() => {
    fetchQuestionList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchQuestionList = async () => {
    let params = {
      examId: examInfo.examId,
      userId: 1,
    };

    listQuestionRequest(params, getListQuestionResponse, getError);
  };

  const getListQuestionResponse = (response) => {
    const res = response.data;
    setListQuestion(shuffle(res.data));
    setExam(response);
  };

  const getError = (error) => {
    console.log(error.response);
    notificationErr("Oooooooooooop!");
  };

  const handleFinishGame = async () => {
    let finalAnswer = listQuestionChoose1Of4.concat(listQuestionFillWord);

    let params = {
      userId: 1,
      examId: 1,
      totalTime: 30,
      listAnswer: finalAnswer,
    };

    await Swal.fire({
      title: "Are you sure finish ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoadingSubmit(true);
        finishGameRequest(params, getResponseFinishGame, getError);
      }
    });
  };

  const getResponseFinishGame = (response) => {
    const res = response.data;
    console.log(res);
    setLoadingSubmit(false);
    setFinishData(res);
  };

  const handleActiveQuestion = (item) => {
    if (!activeQuetionList.includes(item)) {
      let temp = [...activeQuetionList, item];
      setActiveListQuestion(temp);
    }
  };

  const handleUnActiveQuestion = (id) => {
    let currentListQuestActive = activeQuetionList.filter((item) => {
      return item !== id;
    });
    setActiveListQuestion(currentListQuestActive);
  };

  return (
    <div className="hvx-gamePage">
      <Spin spinning={loadingSubmit}>
        <div className="container">
          {finishData ? (
            <ScoresPage
              totalScores={exam?.totalPoint}
              scores={finishData.scores}
            />
          ) : (
            <Spin
              spinning={listQuestion && listQuestion.length > 0 ? false : true}
            >
              <div className="hvx-mainGame">
                <div className="row ml-0 mr-0">
                  <div className="col-md-3 breakCol">
                    <Sidebar
                      activeQuetionList={activeQuetionList}
                      listQuestion={listQuestion}
                      handleFinishGame={handleFinishGame}
                    />
                  </div>
                  <div className="col-md-9">
                    <RightContent
                      listQuestion={listQuestion}
                      activeQuetionList={activeQuetionList}
                      examName={exam?.examName}
                      handleActiveQuestion={handleActiveQuestion}
                      handleUnActiveQuestion={handleUnActiveQuestion}
                      listQuestionChoose1Of4={listQuestionChoose1Of4}
                      setListQuestionChoose1Of4={setListQuestionChoose1Of4}
                      listQuestionFillWord={listQuestionFillWord}
                      setListQuestionFillWord={setListQuestionFillWord}
                    />
                  </div>
                </div>
              </div>
            </Spin>
          )}
        </div>
      </Spin>
    </div>
  );
};

export default Main;
