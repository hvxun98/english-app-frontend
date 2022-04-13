import { CloseCircleOutlined } from "@ant-design/icons";
import React from "react";

const QuestionDetailItem = ({
  item,
  index,
  onRemove = Function,
  mode = "view",
}) => {
  const handleRemove = (examId) => {
    onRemove(examId);
  };
  return (
    <div className="col-12">
      <div className="quest-item">
        <div className="quest-item-title">
          Quest {index + 1}: {item.questionTitle}]
        </div>
        <div className="row">
          <div className="col-md-6 quest-opt">
            <b>A.</b> {item.questionContent?.split("|")[0]}
          </div>
          <div className="col-md-6 quest-opt">
            <b>B.</b> {item.questionContent?.split("|")[1]}
          </div>
          <div className="col-md-6 quest-opt">
            <b>C.</b> {item.questionContent?.split("|")[2]}
          </div>
          <div className="col-md-6 quest-opt">
            <b>D.</b> {item.questionContent?.split("|")[3]}
          </div>
        </div>
        {mode === "edit" && (
          <div className="item-cpn">
            <CloseCircleOutlined
              className="close-icon"
              onClick={() => handleRemove(item.id)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionDetailItem;
