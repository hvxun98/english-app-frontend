import React, { useEffect, useState } from "react";
import { Button, Input, Form, Spin } from "antd";
import { getContentABCD } from "../../../../utils/questionTools";
import { getUserInfo } from "../../../../utils/storage";
import moment from "moment";
import {
  notificationErr,
  notificationSuccess,
} from "../../../../utils/Notification";
import { editQuestion } from "../../../../services/questionService";
import FormChooseQuestion from "./FormChooseQuestion";
import { ClockCircleOutlined } from "@ant-design/icons";
import QuestionItem from "./QuestionItem";

const FormAddExam = ({ question, setRefech, setModeExam }) => {
  const userInfo = getUserInfo();
  const [loading, setLoading] = useState(false);
  const [listQuestionChosen, setListQuestionChosen] = useState([]);
  const [totalPoint, setTotalPoint] = useState(0);

  useEffect(() => {
    if (listQuestionChosen?.length) {
      let tPoint = 0;
      listQuestionChosen.forEach((item) => (tPoint += item.questionPoint));
      setTotalPoint(tPoint);
    }
    // eslint-disable-next-line
  }, [listQuestionChosen]);

  const handleRemoveQuestionChoosed = (questId) => {
    if (questId) {
      const newListQuestionChosen = listQuestionChosen.filter(
        (question) => question.id !== questId
      );
      setListQuestionChosen(newListQuestionChosen);
    }
  };

  const handleEditQuestion = (value) => {
    if (value) {
      const {
        questionName,
        questionType,
        questionTitle,
        questionDescription,
        questionLevel,
        questionCategory,
        questionAnswer,
        questionPoint,
        optionA,
        optionB,
        optionC,
        optionD,
      } = value;

      const newQuestion = {
        questionId: question?.id,
        questionName,
        questionType,
        questionTitle,
        questionDescription,
        questionLevel,
        questionCategory,
        questionAnswer,
        questionPoint,
        questionExam: 0,
        questionContent: getContentABCD({ optionA, optionB, optionC, optionD }),
        createdBy: userInfo?.id,
        createdAt: moment(Date.now()).format("YYYY/MM/DD"),
      };
      setLoading(true);
      editQuestion(
        newQuestion,
        () => {
          setRefech(Date.now());
          setLoading(false);
          notificationSuccess("Update successfully");
        },
        (err) => {
          setLoading(false);
          notificationErr(err?.response?.message || "Something went wrong");
        }
      );
    }
  };

  return (
    <>
      <Spin spinning={loading}>
        <Form onFinish={handleEditQuestion}>
          <div>
            <div className="col-md-12">
              <h3 className="exam-title">Create new exam</h3>
              <div className="row">
                {/* name */}
                <div className="col-md-4">
                  <label className="quest-label" htmlFor="questionType">
                    <span className="required mt-2 mr-1">*</span> Name
                  </label>
                  <Form.Item
                    style={{ width: "100%" }}
                    name="questionName"
                    className="form-add-item"
                    rules={[
                      {
                        required: true,
                        message: "Please input your question name!",
                      },
                      {
                        max: 50,
                        message: "Question name too long!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter exam name" />
                  </Form.Item>
                </div>
                <div className="col-md-2">
                  <label className="quest-label" htmlFor="questionType">
                    <span className="required mt-2 mr-1">*</span>{" "}
                    <ClockCircleOutlined className="mr-2" /> Time (minutes)
                  </label>
                  <Form.Item
                    style={{ width: "150px" }}
                    name="totalTime"
                    className="form-add-item"
                    rules={[
                      {
                        required: true,
                        message: "Please enter time!",
                      },
                      () => ({
                        validator(_, value) {
                          if (!/\D/.test(value)) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Please enter the number!")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input placeholder="0" />
                  </Form.Item>
                </div>
                <div className="col-md-2">
                  <label className="quest-label" htmlFor="questionType">
                    <span className="required mt-2 mr-1">*</span> Point
                  </label>
                  <span className="ml-2">
                    <b>{totalPoint}</b>
                  </span>
                </div>
                <div className="col-md-4 mt-4">
                  <div className="row pl-2 mt-1">
                    <Form.Item>
                      <Button htmlType="submit" className="btn-dashboard ml-2">
                        Create
                      </Button>
                    </Form.Item>
                    <Form.Item>
                      <Button
                        onClick={() => setModeExam("view")}
                        className="btn-dashboard-outline ml-3"
                      >
                        Close
                      </Button>
                    </Form.Item>
                  </div>
                </div>
                <div className="col-md-12">
                  <FormChooseQuestion
                    listQuestionChosen={listQuestionChosen}
                    setListQuestionChosen={setListQuestionChosen}
                  />
                </div>
                <div className="col-md-12 mt-5">
                  Questions selected: <b>{listQuestionChosen?.length}</b>
                </div>

                <QuestionItem
                  data={listQuestionChosen}
                  handleRemoveQuestionChoosed={handleRemoveQuestionChoosed}
                />
              </div>
            </div>
          </div>
        </Form>
      </Spin>
    </>
  );
};

export default FormAddExam;
