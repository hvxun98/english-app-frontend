import React, { useState } from "react";
import { Button, Input, Form, Spin } from "antd";
import { getContentABCD, renderContent } from "../../../../utils/questionTools";
import { getUserInfo } from "../../../../utils/storage";
import moment from "moment";
import {
  notificationErr,
  notificationSuccess,
} from "../../../../utils/Notification";
import { editQuestion } from "../../../../services/questionService";
import FormChooseQuestion from "./FormChooseQuestion";
import { ClockCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const FormAddExam = ({ question, setRefech, setModeExam }) => {
  const userInfo = getUserInfo();
  const [loading, setLoading] = useState(false);
  const [listQuestionChoosed, setListQuestionChoosed] = useState([]);

  console.log(listQuestionChoosed);

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
                <div className="col-md-3">
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
                    setListQuestionChoosed={setListQuestionChoosed}
                  />
                </div>
                <div className="col-lg-12 col-xl-10">
                  <div className="questtion-selected-list">
                    <div className="question-selected-item">
                      <div className="item-cpn">
                        <span className="item-title">
                          Quesion 1:{" "}
                          {renderContent(
                            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae consequuntur tenetur expedita, ipsam eveniet veritatis hic dignissimos odit harum sequi"
                          )}
                        </span>
                      </div>
                      <div className="item-cpn">
                        <span className="item-point">Point: 10</span>
                      </div>
                      <div className="item-cpn">
                        <CloseCircleOutlined />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Spin>
    </>
  );
};

export default FormAddExam;
