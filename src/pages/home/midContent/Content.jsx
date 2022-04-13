import React, { useEffect, useState } from "react";
import { Input, Spin } from "antd";
import Lession from "./Lession";
import { getExamListByCategory } from "../../../services/examService";

const { Search } = Input;

const Content = ({ currentMenu }) => {
  const [listExam, setListExam] = useState();
  const [listExamClone, setListExamClone] = useState();
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    setLoadingData(true);
    getExamListByCategory(
      currentMenu,
      (res) => {
        setListExam(res.data.data);
        setListExamClone(res.data.data);
        setLoadingData(false);
      },
      getError
    );
    // eslint-disable-next-line
  }, [currentMenu]);

  const onSearch = (value) => {
    if (!value.trim() || !value?.length) {
      setListExam(listExamClone);
    } else {
      const newExams = listExamClone.filter(
        (exam) => exam?.examName.toLowerCase() === value.trim().toLowerCase()
      );
      setListExam(newExams);
    }
  };

  const getError = (err) => {
    console.log(err);
    setLoadingData(false);
  };

  return (
    <div className="col-md-6 midContent">
      <Spin spinning={loadingData}>
        <div className="content-header">
          <div className="row">
            {/* <div className="col-md-6">
              <Select
                defaultValue="all"
                style={{ width: "100%" }}
                className="rate-selected"
              >
                <Option value="all">All</Option>
                <Option value="used">Used to do</Option>
                <Option value="not">Not done yet</Option>
              </Select>
            </div> */}
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
            {listExam?.length > 0 ? (
              listExam.map((exam) => {
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
            ) : (
              <div className="center" style={{ width: "100%" }}>
                No data
              </div>
            )}
          </div>
        </div>
        {/* <div className="center">
          <Pagination defaultCurrent={1} total={50} />
        </div> */}
      </Spin>
    </div>
  );
};

export default Content;
