import React, { useEffect, useState } from "react";
import { Table, Button, Input, Spin, Select } from "antd";
import {
  fetchCategories,
  removeCategories,
} from "../../../../services/categoriesService";
import { getExamList } from "../../../../services/examService";
import { PlusCircleOutlined, RetweetOutlined } from "@ant-design/icons";

import { notificationSuccess } from "../../../../utils/Notification";
import Swal from "sweetalert2";
import FormAddExam from "./FormAddExam";
import { flatDataTable } from "../../../../utils/questionTools";

const { Search } = Input;
const { Option } = Select;

const ExamDashboard = () => {
  const [examList, setExamList] = useState([]);
  const [examListClone, setExamListClone] = useState([]); // search

  const [categoriesList, setListCategoriesList] = useState([]);

  const [examNameSearch, setExamNameSearch] = useState("");
  const [currentCategorySelected, setCurrentCategorySelected] = useState(0);

  const [loadingDataTable, setLoadingDataTable] = useState(false);
  const [refetch, setRefech] = useState(true);
  const [loading, setLoading] = useState(false);
  const [modeExam, setModeExam] = useState("view");

  useEffect(() => {
    fetchCategories((res) => {
      setListCategoriesList(res.data.data);
    });
  }, []);

  useEffect(() => {
    setLoadingDataTable(true);
    getExamList((res) => {
      flatDataTable(res.data.data, (data) => {
        setExamList(data);
        setExamListClone(data);
      });

      setLoadingDataTable(false);
    });
  }, [refetch]);

  useEffect(() => {
    if (!currentCategorySelected) {
      setExamList(examListClone);
    } else {
      const temp = JSON.parse(JSON.stringify(examListClone));
      const newExamListByCategory = temp.filter(
        (exam) => exam.categoryId === currentCategorySelected
      );
      console.log(newExamListByCategory);
      setExamList(newExamListByCategory);
    }
    // eslint-disable-next-line
  }, [currentCategorySelected]);

  const handleSearchCategories = () => {
    if (examNameSearch) {
      let examListCloneSearch = JSON.parse(JSON.stringify(examListClone));
      examListCloneSearch = examListCloneSearch.filter((exam) => {
        return exam.examName.toLowerCase().match(examNameSearch?.toLowerCase());
      });
      setExamList(examListCloneSearch);
    }
  };

  const handleResetExam = () => {
    setCurrentCategorySelected(0);
    setRefech(Date.now());
    setExamNameSearch("");
  };

  const handleGoToAddExam = () => {
    setModeExam("create");
  };

  const handleDeleteCategory = (categoryId) => {
    Swal.fire({
      title: "Are you sure delete this category?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        removeCategories(
          categoryId,
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

  const renderCategory = (categoryId) => {
    if (categoriesList.length) {
      const category = categoriesList.find((ctgr) => ctgr.id === categoryId);
      return category?.categoryName;
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "10%",
      key: "ID",
    },
    {
      title: "Exam Name",
      dataIndex: "examName",
      sorter: (a, b) => a.examName.localeCompare(b.examName),
      width: "25%",
      key: "examName",
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      width: "25%",
      key: "categoryId",
      render: (categoryId) => renderCategory(categoryId),
    },
    {
      title: "Total point",
      dataIndex: "totalPoint",
      width: "10%",
      key: "totalPoint",
    },
    {
      title: "Update at",
      dataIndex: "createdAt",
      width: "15%",
      key: "Created",
    },
    {
      title: "Action",
      key: "action",
      render: (row) => {
        return (
          <div className="center flex-column">
            <Button className="btn-action mb-2" type="default">
              View
            </Button>
            <Button className="btn-action mb-2" type="primary">
              Edit
            </Button>
            <Button
              className="btn-action"
              danger
              onClick={() => handleDeleteCategory(row.id)}
            >
              Delete
            </Button>
          </div>
        );
      },

      width: "25%",
    },
  ];

  const renderComponent = () => {
    switch (modeExam) {
      case "create":
        return (
          <FormAddExam
            categoriesList={categoriesList}
            setModeExam={setModeExam}
            refetch={setRefech}
          />
        );
      case "view":
        return (
          <div className="content-wrapper">
            <Spin spinning={loading}>
              <div className="content-top">
                <div className="add-field mt-4">
                  <div className="col-md-6">
                    <Button
                      onClick={handleGoToAddExam}
                      className="btn-dashboard"
                    >
                      <PlusCircleOutlined />
                      New Exam
                    </Button>
                  </div>
                </div>
              </div>
              <div className="table-field">
                <div className="row">
                  <div className="col-lg-8 mb-3">
                    <div className="align-item-center">
                      <div className="col-md-6 filter-input pl-0">
                        <Select
                          defaultValue={0}
                          value={currentCategorySelected}
                          style={{ width: "100%" }}
                          onChange={(category) =>
                            setCurrentCategorySelected(category)
                          }
                        >
                          <Option value={0}>Choose category</Option>
                          {categoriesList?.map((category) => (
                            <Option key={category.id} value={category.id}>
                              {category.categoryName}{" "}
                            </Option>
                          ))}
                        </Select>
                      </div>
                      <div className="col-md-6 filter-input pl-0">
                        <Search
                          value={examNameSearch}
                          onChange={(e) => setExamNameSearch(e.target.value)}
                          placeholder="Search exam name"
                          onSearch={handleSearchCategories}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="justify-center">
                  <div
                    className="btn-dashboard mt-2 mb-3"
                    onClick={handleResetExam}
                  >
                    <RetweetOutlined className="reset-icon icon" />
                  </div>
                </div>

                <Table
                  loading={loadingDataTable}
                  columns={columns}
                  dataSource={examList}
                  style={{ width: "100%" }}
                  pagination={{ pageSize: 10 }}
                />
              </div>
            </Spin>
          </div>
        );
      default:
        break;
    }
  };
  return renderComponent();
};

export default ExamDashboard;
