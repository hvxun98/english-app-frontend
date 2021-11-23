import React, { useEffect, useState } from "react";
import { Table, Space, Button, Input, Form, Spin, Modal } from "antd";
import {
  createCategories,
  editCategories,
  fetchCategories,
  removeCategories,
} from "../../../../services/categoriesService";
import { PlusCircleOutlined, RetweetOutlined } from "@ant-design/icons";
import moment from "moment";
import { notificationSuccess } from "../../../../utils/Notification";
import Swal from "sweetalert2";

const { Search } = Input;

const CategoriesDashboard = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [categoriesListClone, setCategoriesListClone] = useState([]); // search
  const [categoryEdit, setCategoryEdit] = useState();

  const [loadingDataTable, setLoadingDataTable] = useState(false);
  const [openAddform, setOpenAddForm] = useState(false);
  const [refetch, setRefech] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setLoadingDataTable(true);
    fetchCategories((res) => {
      setCategoriesList(res.data.data);
      setCategoriesListClone(res.data.data)
      setLoadingDataTable(false);
    });
  }, [refetch]);

  const handleSearchCategories = (value) => {

    let categoriesListCloneSearch = JSON.parse(JSON.stringify(categoriesListClone));
    categoriesListCloneSearch = categoriesListCloneSearch.filter((category) => {
      return category.categoryName.toLowerCase().match(value.toLowerCase());
    });
    setCategoriesList(categoriesListCloneSearch);
  };

  const handleAddCategory = (value) => {
    const params = {
      categoryName: value.categoryName,
      createdAt: moment(Date.now()).format("YYYY/MM/DD"),
    };
    setLoading(true);
    createCategories(
      params,
      () => {
        setRefech(Date.now());
        setLoading(false);
        notificationSuccess("Create successfully");
      },
      (error) => console.log(error)
    );
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

  const handleEditCategory = (value) => {
    const newCategory = {
      categoryId: categoryEdit?.id,
      categoryName: value.categoryNameEdit,
      updatedAt: moment(Date.now()).format("YYYY/MM/DD"),
    };
    setLoading(true);
    editCategories(
      newCategory,
      () => {
        notificationSuccess("Edit successfully");
        setRefech(Date.now());
        setIsModalVisible(false);
        setLoading(false);
        setCategoryEdit(null);
      },
      (error) => console.log(error)
    );
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "10%",
      key: "ID",
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      sorter: (a, b) => a.categoryName.localeCompare(b.categoryName),
      width: "50%",
      key: "CategoryName",
    },
    {
      title: "Update at",
      dataIndex: "createdAt",
      width: "25%",
      key: "Created",
    },
    {
      title: "Created At",
      dataIndex: "updatedAt",
      width: "25%",
      key: "Created",
    },
    {
      title: "Action",
      key: "action",
      render: (row) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              onClick={() => {
                setCategoryEdit(row);
                setIsModalVisible(true);
              }}
            >
              Edit
            </Button>
            <Button danger onClick={() => handleDeleteCategory(row.id)}>
              Delete
            </Button>
          </Space>
        );
      },

      width: "25%",
    },
  ];

  return (
    <div className="content-wrapper">
      <Spin spinning={loading}>
        <div className="content-top">
          <div className="add-field mt-4">
            <div className="col-md-6">
              {!openAddform ? (
                <Button
                  onClick={() => setOpenAddForm(true)}
                  className="btn-dashboard"
                >
                  <PlusCircleOutlined />
                  New Category
                </Button>
              ) : (
                <Form
                  onFinish={handleAddCategory}
                  className="align-item-center"
                >
                  <Form.Item
                    style={{ width: "100%" }}
                    name="categoryName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your category name!",
                      },
                      {
                        max: 50,
                        message: "Category name too long!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter category name" />
                  </Form.Item>
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
                </Form>
              )}
            </div>
          </div>
        </div>
        <div className="table-field">
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="align-item-center">
                <Search
                  placeholder="Search category name"
                  onSearch={handleSearchCategories}
                />
                <div
                  className="btn-dashboard btn-reset"
                  onClick={() => setRefech(Date.now())}
                >
                  <RetweetOutlined className="reset-icon icon" />
                </div>
              </div>
            </div>
          </div>

          <Table
            loading={loadingDataTable}
            columns={columns}
            dataSource={categoriesList}
            style={{ width: "100%" }}
            pagination={{ pageSize: 10 }}
          />
        </div>
        {categoryEdit ? (
          <Modal
            title="Edit category"
            visible={isModalVisible}
            onCancel={() => {
              setIsModalVisible(false);
              setCategoryEdit(null);
            }}
          >
            <Spin spinning={loading}>
              <Form
                onFinish={handleEditCategory}
                className="align-item-center"
                initialValues={{ categoryNameEdit: categoryEdit?.categoryName }}
              >
                <Form.Item
                  style={{ width: "100%" }}
                  name="categoryNameEdit"
                  rules={[
                    {
                      required: true,
                      message: "Please input your category name!",
                    },
                    {
                      max: 50,
                      message: "Category name too long!",
                    },
                  ]}
                >
                  <Input placeholder="Enter category name" />
                </Form.Item>
                <span className="d-none">{categoryEdit?.categoryName}</span>
                <Form.Item>
                  <Button htmlType="submit" className="btn-dashboard mt-2">
                    Update
                  </Button>
                </Form.Item>
              </Form>
            </Spin>
          </Modal>
        ) : (
          ""
        )}
      </Spin>
    </div>
  );
};

export default CategoriesDashboard;
