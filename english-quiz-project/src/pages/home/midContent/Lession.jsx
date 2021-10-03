import { Button } from "antd";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { HvxContext } from "../../../contexts";

const Lession = ({ id, title, totalTime, totalPoint }) => {
  const history = useHistory();

  const { setExam } = useContext(HvxContext);

  const handleClickStart = () => {
    setExam({
      examId: id,
      totalTime: totalTime,
    });
    history.push(`/exam`);
  };
  return (
    <div className="col-md-6">
      <div className="item">
        <p className="item-title text-bold">{title || "Không có tiêu đề"}</p>
        <p>
          Tổng điểm: <span className="text-bold">{totalPoint || 0}</span>{" "}
        </p>
        <p>
          Thơi gian thực hiện:{" "}
          <span className="text-bold">{totalTime || 0}</span>
        </p>
        <div className="best-score">
          <span>90</span>
        </div>
        <Button className="hvx-btn-item" onClick={handleClickStart}>
          Làm bài
        </Button>
      </div>
    </div>
  );
};

export default Lession;
