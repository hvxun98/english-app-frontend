import React, { useEffect, useState } from "react";
import { Modal, Button, Select, Spin, Table } from "antd";
import {
  questionLevel,
  questionType,
  renderQuestionLevel,
  renderQuestionType,
} from "../../../../constants/dashboardContants";

import { fetchCategories } from "../../../../services/categoriesService";
import FormViewQuestion from "../question/FormViewQuestion";
import { fetchQuestions } from "../../../../services/questionService";
import { flatDataTable, renderContent } from "../../../../utils/questionTools";
import { RetweetOutlined } from "@ant-design/icons";
import { notificationWarning } from "../../../../utils/Notification";

const { Option } = Select;

const FormChooseQuestion = ({ listQuestionChosen, setListQuestionChosen }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingDataTable, setLoadingDataTable] = useState(false);
  const [resetTableQuestion, setResetTableQuestion] = useState();

  const [categoriesList, setCategoriesList] = useState([]);
  const [questionsList, setQuestionList] = useState([]);
  const [questionsListClone, setQuestionListClone] = useState([]); // search

  const [questionTypeSelected, setQuestionTypeSelected] = useState("");
  const [questionLevelSelected, setQuestionLevelSelected] = useState("");
  const [questionCategorySelected, setQuestionCategorySelected] = useState(0);

  const [questionRowsSelected, setQuestionRowsSelected] = useState([]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    if (listQuestionChosen) {
      const listKeySelected = listQuestionChosen?.map((item) => item.key);
      setSelectedRowKeys(listKeySelected);
    }
  }, [listQuestionChosen]);

  useEffect(() => {
    setLoading(true);
    fetchCategories((res) => {
      setCategoriesList(res.data.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoadingDataTable(true);
    fetchQuestions((res) => {
      flatDataTable(res.data.data, (data) => {
        setQuestionList(data);
        setQuestionListClone(data);
      });
      //
      setLoadingDataTable(false);
    });
  }, [resetTableQuestion]);

  useEffect(() => {
    if (questionsListClone) {
      console.log(questionsListClone);
      console.log(
        questionTypeSelected,
        questionCategorySelected,
        questionLevelSelected
      );
      if (
        questionTypeSelected |
        questionCategorySelected |
        questionLevelSelected
      ) {
        const newQuestionList = questionsListClone.filter(
          (item) =>
            item?.questionType ===
              (questionTypeSelected || item?.questionType) &&
            item?.questionLevel ===
              (questionLevelSelected || item?.questionLevel) &&
            item?.questionCategory ===
              (questionCategorySelected || item?.questionCategory)
        );
        setQuestionList(newQuestionList);
      }
    }
    // eslint-disable-next-line
  }, [questionTypeSelected, questionLevelSelected, questionCategorySelected]);

  const renderCategory = (categoryId) => {
    if (categoriesList.length) {
      const category = categoriesList.find((ctgr) => ctgr.id === categoryId);
      return category?.categoryName;
    }
  };

  const handleDoneForm = () => {
    if (questionRowsSelected?.length) {
      setVisible(false);
      setListQuestionChosen(questionRowsSelected);
    } else notificationWarning("Please select the questions");
  };

  const handleResetQuestions = () => {
    setResetTableQuestion(Date.now());
    setQuestionCategorySelected(0);
    setQuestionLevelSelected("");
    setQuestionTypeSelected("");
  };

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys([...selectedRowKeys, selectedRowKeys]);
      setQuestionRowsSelected(selectedRows);
    },
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "3%",
      key: "id",
    },
    {
      title: "Question Name",
      dataIndex: "questionName",
      sorter: (a, b) => a.questionName.localeCompare(b.questionName),
      width: "8%",
      key: "questionName",
    },
    {
      title: "Title",
      dataIndex: "questionTitle",
      width: "17%",
      key: "questionTitle",
      render: (title) => renderContent(title),
    },
    {
      title: "Type",
      dataIndex: "questionType",
      width: "5%",
      key: "questionType",
      render: (questionType) => renderQuestionType(questionType),
    },
    {
      title: "Content",
      dataIndex: "questionContent",
      width: "30%",
      key: "questionContent",
      render: (content) => renderContent(content),
    },
    {
      title: "Category",
      dataIndex: "questionCategory",
      width: "5%",
      key: "questionCategory",
      render: (category) => renderCategory(category),
    },
    {
      title: "Answer",
      dataIndex: "questionAnswer",
      width: "18%",
      key: "questionAnswer",
      render: (questionAnswer) => renderContent(questionAnswer),
    },
    {
      title: "Level",
      dataIndex: "questionLevel",
      width: "5%",
      key: "questionLevel",
      render: (level) => renderQuestionLevel(level),
    },
    {
      title: "Point",
      dataIndex: "questionPoint",
      width: "5%",
      key: "questionPoint",
    },
    {
      title: "Action",
      key: "action",
      render: (row) => {
        return (
          <div className="center flex-column">
            <FormViewQuestion question={row} categoriesList={categoriesList} />
          </div>
        );
      },
      width: "10%",
    },
  ];

  return (
    <>
      <Button className="btn-dashboard" onClick={() => setVisible(true)}>
        Choose Questions
      </Button>

      <Modal
        title="Choose questions"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1500}
      >
        <Spin spinning={loading}>
          <div className="col-12">
            <div className="row">
              {/* category */}
              <div className="col-md-4">
                <label className="quest-label" htmlFor="questionCategory">
                  <span className="required mt-2 mr-1">*</span> Category
                </label>

                <Select
                  value={questionCategorySelected}
                  style={{ width: "100%" }}
                  onChange={(value) => setQuestionCategorySelected(value)}
                >
                  <Option value={0}>Choose category</Option>
                  {categoriesList?.map((category) => (
                    <Option key={category.id} value={category.id}>
                      {category.categoryName}{" "}
                    </Option>
                  ))}
                </Select>
              </div>

              {/* type */}
              <div className="col-md-4">
                <label className="quest-label" htmlFor="questionType">
                  <span className="required mt-2 mr-1">*</span> Type
                </label>

                <Select
                  value={questionTypeSelected}
                  style={{ width: "100%" }}
                  onChange={(value) => setQuestionTypeSelected(value)}
                >
                  <Option value="">Choose type</Option>
                  {questionType.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}{" "}
                    </Option>
                  ))}
                </Select>
              </div>

              {/* level */}
              <div className="col-md-4">
                <label className="quest-label" htmlFor="questionType">
                  <span className="required mt-2 mr-1">*</span> Level
                </label>

                <Select
                  value={questionLevelSelected}
                  style={{ width: "100%" }}
                  onChange={(value) => setQuestionLevelSelected(value)}
                >
                  <Option value="">Choose level</Option>
                  {questionLevel.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}{" "}
                    </Option>
                  ))}
                </Select>
              </div>

              <div className="col-md-12">
                <div className="justify-center">
                  <div
                    className="btn-dashboard mt-2 mb-3"
                    onClick={handleResetQuestions}
                  >
                    <RetweetOutlined className="reset-icon icon" />
                  </div>
                </div>
              </div>
              <div className="col-12 modal-table mt-3">
                <Table
                  rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                    selectedRowKeys,
                  }}
                  loading={loadingDataTable}
                  columns={columns}
                  dataSource={questionsList}
                  style={{ width: "100%" }}
                  pagination={{ pageSize: 10 }}
                />
              </div>
              <div className="col-md-6">
                {" "}
                <Button className="btn-dashboard mt-3" onClick={handleDoneForm}>
                  Done
                </Button>
              </div>
            </div>
          </div>
        </Spin>
      </Modal>
    </>
  );
};

export default FormChooseQuestion;
