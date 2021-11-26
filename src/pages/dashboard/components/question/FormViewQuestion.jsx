import React, { useEffect, useState } from "react";
import { Modal, Button, Input, Form, Select } from "antd";
import {
  questionLevel,
  questionPoint,
  questionType,
  QUESTION_CHOOSE_ABCD,
} from "../../../../constants/dashboardContants";

const { Option } = Select;
const { TextArea } = Input;

const FormViewQuestion = ({ question, categoriesList }) => {
  const [visible, setVisible] = useState(false);
  const [optionAnswer, setOptionAnswer] = useState({
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
  });

  useEffect(() => {
    if (question && question.questionType === QUESTION_CHOOSE_ABCD) {
      const arrOption = question.questionContent?.split("|");
      if (arrOption) {
        setOptionAnswer({
          optionA: arrOption[0],
          optionB: arrOption[1],
          optionC: arrOption[2],
          optionD: arrOption[3],
        });
      }
    }
  }, [question]);

  const renderFormAnswer = (questType) => {
    if (questType) {
      if (questType === QUESTION_CHOOSE_ABCD) {
        return (
          <div className="col-md-12">
            <label className="quest-label" htmlFor="Content">
              <span className="mt-2 mr-1"></span> Content
            </label>
            <div className="row pl-2 pr-2">
              {" "}
              <div className="col-md-6">
                <Form.Item
                  style={{ width: "100%" }}
                  name="optionA"
                  className="form-add-item"
                  label="A"
                >
                  <Input placeholder="Enter option A" disabled={true} />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item
                  style={{ width: "100%" }}
                  name="optionB"
                  className="form-add-item"
                  label="B"
                >
                  <Input placeholder="Enter option B" disabled={true} />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item
                  style={{ width: "100%" }}
                  name="optionC"
                  className="form-add-item"
                  label="C"
                >
                  <Input placeholder="Enter option C" disabled={true} />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item
                  style={{ width: "100%" }}
                  name="optionD"
                  className="form-add-item"
                  label="D"
                >
                  <Input placeholder="Enter option D" disabled={true} />
                </Form.Item>
              </div>
            </div>
          </div>
        );
      }
    } else {
      return null;
    }
  };

  return (
    <>
      <Button
        type="default"
        style={{ width: "75px" }}
        className="mb-2"
        onClick={() => setVisible(true)}
      >
        View
      </Button>
      <Modal
        title={`View question ${question?.questionName}`}
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <Form
          initialValues={{
            questionType: question?.questionType,
            questionName: question?.questionName,
            questionTitle: question?.questionTitle,
            questionDescription: question?.questionDescription,
            questionLevel: question?.questionLevel,
            questionCategory: question?.questionCategory,
            questionAnswer: question?.questionAnswer,
            questionPoint: question?.questionPoint,
            optionA: optionAnswer?.optionA,
            optionB: optionAnswer?.optionB,
            optionC: optionAnswer?.optionC,
            optionD: optionAnswer?.optionD,
          }}
        >
          <div className="form-edit-question">
            <div className="col-md-12">
              <div className="row">
                {/* type */}
                <div className="col-md-6">
                  <label className="quest-label" htmlFor="questionType">
                    <span className="mt-2 mr-1"></span> Type
                  </label>
                  <Form.Item
                    style={{ width: "100%" }}
                    name="questionType"
                    className=" form-add-item"
                    rules={[
                      {
                        required: true,
                        message: "Please choose type!",
                      },
                    ]}
                  >
                    <Select defaultValue="" disabled={true}>
                      <Option value="">Choose type</Option>
                      {questionType.map((item) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}{" "}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>

                {/* name */}
                <div className="col-md-6">
                  <label className="quest-label" htmlFor="questionType">
                    <span className="mt-2 mr-1"></span> Name
                  </label>
                  <Form.Item
                    style={{ width: "100%" }}
                    name="questionName"
                    className="form-add-item"
                  >
                    <Input placeholder="Enter question name" disabled={true} />
                  </Form.Item>
                </div>

                {/* level */}
                <div className="col-md-6">
                  <label className="quest-label" htmlFor="questionType">
                    <span className="mt-2 mr-1"></span> Level
                  </label>
                  <Form.Item
                    style={{ width: "100%" }}
                    name="questionLevel"
                    className=" form-add-item"
                  >
                    <Select defaultValue="" disabled={true}>
                      <Option value="">Choose level</Option>
                      {questionLevel.map((item) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}{" "}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>

                {/* category */}
                <div className="col-md-6">
                  <label className="quest-label" htmlFor="questionCategory">
                    <span className="mt-2 mr-1"></span> Category
                  </label>
                  <Form.Item
                    style={{ width: "100%" }}
                    name="questionCategory"
                    className="form-add-item"
                  >
                    <Select defaultValue={0} disabled={true}>
                      <Option value={0}>Choose category</Option>
                      {categoriesList?.map((category) => (
                        <Option key={category.id} value={category.id}>
                          {category.categoryName}{" "}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>

                {/* title */}
                <div className="col-md-6">
                  <label className="quest-label" htmlFor="questionType">
                    <span className="mt-2 mr-1"></span> Title
                  </label>
                  <Form.Item
                    style={{ width: "100%" }}
                    name="questionTitle"
                    className="form-add-item"
                  >
                    <TextArea
                      placeholder="Enter question title"
                      disabled={true}
                    />
                  </Form.Item>
                </div>

                {/* Description */}
                <div className="col-md-6">
                  <label className="quest-label" htmlFor="questionDescription">
                    <span className=" mr-1">Description</span>
                  </label>
                  <Form.Item
                    style={{ width: "100%" }}
                    name="questionDescription"
                    className="form-add-item"
                  >
                    <TextArea placeholder="No description " disabled={true} />
                  </Form.Item>
                </div>

                {/* Point */}
                <div className="col-md-6">
                  <label className="quest-label" htmlFor="questionPoint">
                    <span className="mt-2 mr-1"></span> Point
                  </label>
                  <Form.Item
                    style={{ width: "100%" }}
                    name="questionPoint"
                    className="form-add-item"
                  >
                    <Select defaultValue={0} disabled={true}>
                      <Option value={0}>Choose Point</Option>
                      {questionPoint?.map((point) => (
                        <Option key={point.id} value={point.value}>
                          {point.value}{" "}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>

                {/* Content */}

                {renderFormAnswer(question?.questionType)}
                {/* Answer */}
                <div className="col-md-6">
                  <label className="quest-label" htmlFor="questionAnswer">
                    <span className="mt-2 mr-1"></span> Answer
                  </label>
                  <Form.Item
                    style={{ width: "100%" }}
                    name="questionAnswer"
                    className="form-add-item"
                  >
                    <Input
                      placeholder="Enter question answer"
                      disabled={true}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="col-md-4 mt-4">
              <div className="row pl-2">
                <Form.Item>
                  <Button
                    onClick={() => setVisible(false)}
                    className="btn-dashboard ml-2"
                  >
                    Close
                  </Button>
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default FormViewQuestion;
