import React, { useEffect, useState } from "react";
import { Table, Space, Button, Input } from "antd";
import { fetchCategories } from "../../../services/categoriesService";

const { Search } = Input;

const CategoriesDashboard = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [loadingDataTable, setLoadingDataTable] = useState(false);
  useEffect(() => {
    setLoadingDataTable(true);
    fetchCategories((res) => {
      setCategoriesList(res.data.data);
      setLoadingDataTable(false);
    });
  }, []);

  const handleSearchCategories = () => {
    console.log("search");
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "10%",
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      sorter: (a, b) => a - b,
      width: "50%",
    },
    {
      title: "Created At",
      dataIndex: "updatedAt",
      width: "25%",
    },
    {
      title: "Action",
      render: () => (
        <Space size="middle">
          <Button type="primary">Edit</Button>
          <Button danger>Delete</Button>
        </Space>
      ),
      width: "25%",
    },
  ];

  return (
    <>
      <div className="content-wrapper">
        <div className="content-top">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <Search
                  placeholder="input search text"
                  onSearch={handleSearchCategories}
                />
              </div>
            </div>
          </div>
        </div>
        <Table
          loading={loadingDataTable}
          columns={columns}
          dataSource={categoriesList}
          style={{ width: "100%" }}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </>
  );
};

export default CategoriesDashboard;
