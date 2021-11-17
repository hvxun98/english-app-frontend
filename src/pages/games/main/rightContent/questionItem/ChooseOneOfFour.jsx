import React, { useEffect, useState } from "react";
import { Radio } from "antd";
import "./style.scss";
import RenderDescription from "./renderItem/RenderDescription";
import { checkArrIncludesQuest } from "../../../../../utils/CheckData";

const ChooseOneOfFour = ({
  data,
  stt,
  handleActiveQuestion,
  listQuestionChoose1Of4,
  setListQuestionChoose1Of4,
}) => {
  const [value, setValue] = useState();
  const [objAnwer, setObjAnswer] = useState([]);

  useEffect(() => {
    const getAnswer = () => {
      if (data) {
        let ObjAnswer = data?.questionContent.split("|");
        setObjAnswer(ObjAnswer);
      }
    };
    getAnswer();
  }, [data]);

  const handleChooseAnswer = (e) => {
    setValue(e.target.value);

    // active quest on board
    handleActiveQuestion(data.id);

    // get answer
    if (checkArrIncludesQuest(listQuestionChoose1Of4, data.id)) {
      let newListQuest = listQuestionChoose1Of4.filter((value) => {
        return value.id !== data.id;
      });
      setListQuestionChoose1Of4([
        ...newListQuest,
        {
          id: data.id,
          questionAnswer: e.target.value,
        },
      ]);
    } else {
      setListQuestionChoose1Of4([
        ...listQuestionChoose1Of4,
        {
          id: data.id,
          questionAnswer: e.target.value,
        },
      ]);
    }
  };
  return (
    <div className="hvx-quetionItem itemChoose1of4" id={`quest${data?.id}`}>
      <p className="hvx-textTitleItem">
        {stt}. {data.questionTitle}
      </p>
      <div className="hvx-descriptionItem">
        <RenderDescription data={data.questionDescription} />
      </div>
      <Radio.Group
        onChange={handleChooseAnswer}
        value={value}
        className="hvx-itemOption ml-3"
      >
        <Radio className="col-md-6 option" value={objAnwer[0]}>
          A. {objAnwer[0]}
        </Radio>
        <Radio className="col-md-6 option" value={objAnwer[1]}>
          B. {objAnwer[1]}
        </Radio>
        <Radio className="col-md-6 option" value={objAnwer[2]}>
          C. {objAnwer[2]}
        </Radio>
        <Radio className="col-md-6 option" value={objAnwer[3]}>
          D. {objAnwer[3]}
        </Radio>
      </Radio.Group>
    </div>
  );
};

export default ChooseOneOfFour;
