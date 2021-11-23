import React, { useState } from "react";
import { Modal, Button, Input, Form, Select } from "antd";
import {
  questionLevel,
  questionPoint,
  questionType,
  QUESTION_CHOOSE_ABCD,
} from "../../../../constants/dashboardContants";

const { Option } = Select;
const { TextArea } = Input;

const FormEditQuestion = ({ question, categoriesList }) => {
  const [visible, setVisible] = useState(false);

  const handleEditQuestion = (value) => {
    console.log(value);
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Edit
      </Button>
      <Modal
        title="Edit question"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <Form
          onFinish={handleEditQuestion}
          initialValues={{
            questionType: question?.questionType,
            questionName: question?.questionName,
            questionTitle: question?.questionTitle,
            questionDescription: question?.questionDescription,
            questionLevel: question?.questionLevel,
            questionCaregory: question?.questionCaregory,
            questionAnswer: question?.questionAnswer,
            questionPoint: question?.questionPoint,
            optionA: question?.optionA,
            optionB: question?.optionB,
            optionC: question?.optionC,
            optionD: question?.optionD,
          }}
        >
          <div className="form-edit-question">
            <div className="col-md-12">
              <div className="row">
                {/* type */}
                <div className="col-md-6">
                  <label className="quest-label" htmlFor="questionType">
                    <span className="required mt-2 mr-1">*</span> Type
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
                    <Select defaultValue="">
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
                    <Input placeholder="Enter question name" />
                  </Form.Item>
                </div>

                {/* level */}
                <div className="col-md-6">
                  <label className="quest-label" htmlFor="questionType">
                    <span className="required mt-2 mr-1">*</span> Level
                  </label>
                  <Form.Item
                    style={{ width: "100%" }}
                    name="questionLevel"
                    className=" form-add-item"
                    rules={[
                      {
                        required: true,
                        message: "Please choose level!",
                      },
                    ]}
                  >
                    <Select defaultValue="">
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
                    <span className="required mt-2 mr-1">*</span> Category
                  </label>
                  <Form.Item
                    style={{ width: "100%" }}
                    name="questionCaregory"
                    className="form-add-item"
                    rules={[
                      {
                        required: true,
                        message: "Please choose category!",
                      },
                    ]}
                  >
                    <Select defaultValue={0}>
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
                    <span className="required mt-2 mr-1">*</span> Title
                  </label>
                  <Form.Item
                    style={{ width: "100%" }}
                    name="questionTitle"
                    className="form-add-item"
                    rules={[
                      {
                        required: true,
                        message: "Please input your question title!",
                      },
                      {
                        max: 500,
                        message: "Question title too long!",
                      },
                    ]}
                  >
                    <TextArea placeholder="Enter question title" />
                  </Form.Item>
                </div>

                {/* Description */}
                <div className="col-md-6">
                  <label className="quest-label" htmlFor="questionDescription">
                    <span className="mt-2 mr-1">Description</span>
                  </label>
                  <Form.Item
                    style={{ width: "100%" }}
                    name="questionDescription"
                    className="form-add-item"
                    rules={[
                      {
                        max: 500,
                        message: "Description too long!",
                      },
                    ]}
                  >
                    <TextArea placeholder="Enter description " />
                  </Form.Item>
                </div>

                {/* Point */}
                <div className="col-md-6">
                  <label className="quest-label" htmlFor="questionPoint">
                    <span className="required mt-2 mr-1">*</span> Point
                  </label>
                  <Form.Item
                    style={{ width: "100%" }}
                    name="questionPoint"
                    className="form-add-item"
                    rules={[
                      {
                        required: true,
                        message: "Please choose Point!",
                      },
                    ]}
                  >
                    <Select defaultValue={0}>
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
                {/* Answer */}
                <div className="col-md-6">
                  <label className="quest-label" htmlFor="questionAnswer">
                    <span className="required mt-2 mr-1">*</span> Answer
                  </label>
                  <Form.Item
                    style={{ width: "100%" }}
                    name="questionAnswer"
                    className="form-add-item"
                    rules={[
                      {
                        required: true,
                        message: "Please input your question answer!",
                      },
                      {
                        max: 200,
                        message: "Answer name too long!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            getFieldValue("questionType") !==
                              QUESTION_CHOOSE_ABCD ||
                            getFieldValue("optionA") === value ||
                            getFieldValue("optionB") === value ||
                            getFieldValue("optionC") === value ||
                            getFieldValue("optionD") === value
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "The answer does not match one of the options!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input placeholder="Enter question answer" />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="col-md-4 mt-4">
              <div className="row pl-2">
                <Form.Item>
                  <Button htmlType="submit" className="btn-dashboard ml-2">
                    Update
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

export default FormEditQuestion;
