import React, { useEffect, useState } from "react";
import { Table, Button, Input, Spin } from "antd";
import { RetweetOutlined, PlusCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  notificationSuccess,
  notificationWarning,
} from "../../../../utils/Notification";
import Swal from "sweetalert2";
import {
  createQuestion,
  fetchQuestions,
  removeQuestion,
} from "../../../../services/questionService";
import FormAddQuestion from "./FormAddQuestion";
import { getUserInfo } from "../../../../utils/storage";
import { flatDataTable, getContentABCD } from "../../../../utils/questionTools";
import {
  renderQuestionLevel,
  renderQuestionType,
} from "../../../../constants/dashboardContants";
import { fetchCategories } from "../../../../services/categoriesService";
import { notificationErr } from "../../../../utils/Notification";
import FormEditQuestion from "./FormEditQuestion";
import FormViewQuestion from "./FormViewQuestion";

const { Search } = Input;

const QuestionDashboard = () => {
  const [questionsList, setQuestionList] = useState([]);
  const [questionsListClone, setQuestionListClone] = useState([]); // search
  const [categoriesList, setCategoriesList] = useState([]);
  const [questionSearchName, setQuestionSearchName] = useState("");

  const [loadingDataTable, setLoadingDataTable] = useState(false);
  const [openAddform, setOpenAddForm] = useState(false);
  const [refetch, setRefech] = useState(true);
  const [loading, setLoading] = useState(false);

  const userInfo = getUserInfo();

  useEffect(() => {
    setLoadingDataTable(true);
    fetchQuestions((res) => {
      flatDataTable(res.data.data, (data) => {
        setQuestionList(data);
        setQuestionListClone(data);
      });
      setLoadingDataTable(false);
    });
  }, [refetch]);

  const handleSearchQuestion = () => {
    if (questionSearchName) {
      let questionsListCloneSearch = JSON.parse(
        JSON.stringify(questionsListClone)
      );
      questionsListCloneSearch = questionsListCloneSearch.filter((question) => {
        return question.questionName
          .toLowerCase()
          .match(questionSearchName.toLowerCase());
      });
      console.log(questionsListCloneSearch);
      setQuestionList(questionsListCloneSearch);
    } else notificationWarning("Please enter name before search");
  };

  useEffect(() => {
    fetchCategories(
      (res) => setCategoriesList(res.data.data),
      () => notificationErr("Oop something went wrong")
    );
  }, []);

  const renderCategory = (categoryId) => {
    if (categoriesList.length) {
      const category = categoriesList.find((ctgr) => ctgr.id === categoryId);
      return category?.categoryName || "no category";
    }
  };

  const handleAddQuestion = (value) => {
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
        questionName,
        questionType,
        questionTitle,
        questionDescription,
        questionLevel,
        questionCategory,
        questionAnswer: questionAnswer || "no answer",
        questionPoint: questionPoint || 0,
        questionExam: 0,
        questionContent: getContentABCD({ optionA, optionB, optionC, optionD }),
        createdBy: userInfo?.id,
        createdAt: moment(Date.now()).format("YYYY/MM/DD"),
      };
      console.log(newQuestion);
      setLoading(true);
      createQuestion(
        newQuestion,
        () => {
          setRefech(Date.now());
          setLoading(false);
          notificationSuccess("Create successfully");
        },
        () => setLoading(false)
      );
    }
  };

  const handleResetQuestions = () => {
    setRefech(Date.now());
    setQuestionSearchName("");
  };

  const handleDeleteQuestion = (questionId) => {
    Swal.fire({
      title: "Are you sure delete this question?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        removeQuestion(
          questionId,
          () => {
            setLoading(false);
            setRefech(Date.now());
            notificationSuccess("Delete successfully");
          },
          (error) => console.log(error)
        );
      }
    });
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
      render: (questionContent) => (
        <div className="quest-content">{questionContent}</div>
      ),
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
      render: (questionAnswer) => (
        <div className="quest-content">{questionAnswer}</div>
      ),
    },
    {
      title: "Level",
      dataIndex: "questionLevel",
      width: "5%",
      key: "questionLevel",
      render: (questionLevel) => renderQuestionLevel(questionLevel),
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
            <FormViewQuestion
              question={row}
              categoriesList={categoriesList}
              setRefech={setRefech}
            />
            <FormEditQuestion
              question={row}
              categoriesList={categoriesList}
              setRefech={setRefech}
            />
            <Button
              className="mt-2"
              danger
              onClick={() => handleDeleteQuestion(row.id)}
            >
              Delete
            </Button>
          </div>
        );
      },
      width: "10%",
    },
  ];

  return (
    <div className="content-wrapper">
      <Spin spinning={loading}>
        <div className="content-top">
          <div className="add-field mt-4">
            {!openAddform ? (
              <Button
                onClick={() => setOpenAddForm(true)}
                className="btn-dashboard ml-3"
              >
                <PlusCircleOutlined />
                New Question
              </Button>
            ) : (
              <FormAddQuestion
                handleAddQuestion={handleAddQuestion}
                setOpenAddForm={setOpenAddForm}
                categoriesList={categoriesList}
              />
            )}
          </div>
        </div>
        <div className="table-field">
          <div className="row mt-3">
            <div className="col-md-6 mb-3">
              <div className="align-item-center">
                <Search
                  value={questionSearchName}
                  onChange={(e) => setQuestionSearchName(e.target.value)}
                  placeholder="Search question name"
                  onSearch={handleSearchQuestion}
                />
              </div>
            </div>
          </div>
          <div className="justify-center">
            <div
              className="btn-dashboard mt-2 mb-3"
              onClick={handleResetQuestions}
            >
              <RetweetOutlined className="reset-icon icon" />
            </div>
          </div>
          <Table
            loading={loadingDataTable}
            columns={columns}
            dataSource={questionsList}
            style={{ width: "100%" }}
            pagination={{ pageSize: 10 }}
          />
        </div>
      </Spin>
    </div>
  );
};

export default QuestionDashboard;
