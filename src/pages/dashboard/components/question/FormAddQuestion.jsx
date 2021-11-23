import React, { useState } from "react";
import { Button, Input, Form, Select } from "antd";
import {
  questionLevel,
  questionPoint,
  questionType,
  QUESTION_CHOOSE_ABCD,
} from "../../../../constants/dashboardContants";

const { Option } = Select;
const { TextArea } = Input;

const FormAddQuestion = ({
  handleAddQuestion,
  setOpenAddForm,
  categoriesList,
}) => {
  const [questTypeSelected, setQuestTypeSelected] = useState();

  const renderFormAnswer = (questType) => {
    if (questType) {
      if (questType === QUESTION_CHOOSE_ABCD) {
        return (
          <div className="col-md-12">
            <label className="quest-label" htmlFor="Content">
              <span className="required mt-2 mr-1">*</span> Content
            </label>
            <div className="row pl-2 pr-2">
              {" "}
              <div className="col-md-6">
                <Form.Item
                  style={{ width: "100%" }}
                  name="optionA"
                  className="form-add-item"
                  label="A"
                  rules={[
                    {
                      required: true,
                      message: "Please enter option A!",
                    },
                    {
                      max: 100,
                      message: "Option too long!",
                    },
                  ]}
                >
                  <Input placeholder="Enter option A" />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item
                  style={{ width: "100%" }}
                  name="optionB"
                  className="form-add-item"
                  label="B"
                  rules={[
                    {
                      required: true,
                      message: "Please enter option B!",
                    },
                    {
                      max: 100,
                      message: "Option too long!",
                    },
                  ]}
                >
                  <Input placeholder="Enter option B" />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item
                  style={{ width: "100%" }}
                  name="optionC"
                  className="form-add-item"
                  label="C"
                  rules={[
                    {
                      required: true,
                      message: "Please enter option C!",
                    },
                    {
                      max: 100,
                      message: "Option too long!",
                    },
                  ]}
                >
                  <Input placeholder="Enter option C" />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item
                  style={{ width: "100%" }}
                  name="optionD"
                  className="form-add-item"
                  label="D"
                  rules={[
                    {
                      required: true,
                      message: "Please enter option D!",
                    },
                    {
                      max: 100,
                      message: "Option too long!",
                    },
                  ]}
                >
                  <Input placeholder="Enter option D" />
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
    <Form onFinish={handleAddQuestion}>
      <div className="form-add-question">
        <div className="col-md-8">
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
                <Select
                  defaultValue=""
                  onChange={(value) => setQuestTypeSelected(value)}
                >
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
            {renderFormAnswer(questTypeSelected)}

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
                Add
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                onClick={() => setOpenAddForm(false)}
                className="btn-dashboard-outline ml-2"
              >
                Close
              </Button>
            </Form.Item>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default FormAddQuestion;
