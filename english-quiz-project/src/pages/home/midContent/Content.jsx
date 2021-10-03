import React, { useEffect } from "react";
import { Select, Input, Spin } from "antd";
import Lession from "./Lession";
import { getExamList } from "../../../services/examService";
import { useState } from "react/cjs/react.development";

const { Option } = Select;
const { Search } = Input;

const Content = ({ currentMenu }) => {
  const [listExam, setListExam] = useState();
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    setLoadingData(true);
    getExamList(
      currentMenu,
      (res) => {
        setListExam(res.data.data);
        setLoadingData(false);
      },
      getError
    );
    // eslint-disable-next-line
  }, [currentMenu]);

  const onSearch = (value) => console.log(value);

  const getError = (err) => {
    console.log(err);
    setLoadingData(false);
  };

  return (
    <div className="col-md-6 midContent">
      <Spin spinning={loadingData}>
        <div className="content-header">
          <div className="row">
            <div className="col-md-6">
              <Select
                defaultValue="lucy"
                style={{ width: "100%" }}
                className="rate-selected"
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </div>
            <div className="col-md-6">
              <Search
                placeholder="Search..."
                allowClear
                onSearch={onSearch}
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>
        <div className="list-box">
          <div className="row">
            {listExam?.length > 0
              ? listExam.map((exam) => {
                  return (
                    <Lession
                      key={exam.id}
                      id={exam.id}
                      title={exam.examName}
                      totalPoint={exam.totalPoint}
                      totalTime={exam.totalTime}
                    />
                  );
                })
              : "No data"}
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default Content;
