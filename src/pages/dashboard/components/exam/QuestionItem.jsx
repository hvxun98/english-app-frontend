import { CloseCircleOutlined } from "@ant-design/icons";
import React from "react";
import { renderQuestionLevel } from "../../../../constants/dashboardContants";
import { renderContent } from "../../../../utils/questionTools";

const QuestionItem = ({ data, handleRemoveQuestionChoosed }) => {
  return (
    <div className="col-lg-12">
      <div className="questtion-selected-list mt-3">
        {data?.length > 0 &&
          data.map((item, index) => (
            <div className="question-selected-item" key={item.id}>
              <div className="item-cpn col-md-7">
                <span className="item-title">
                  Quesion {index + 1}: {renderContent(item.questionTitle)}
                </span>
              </div>
              <div className="item-cpn col-md-2">
                <span className="item-point">Point: {item.questionPoint}</span>
              </div>
              <div className="item-cpn col-md-3">
                <span className="item-point">
                  Level: {renderQuestionLevel(item.questionLevel)}
                </span>
              </div>
              <div className="item-cpn ">
                <CloseCircleOutlined
                  className="close-icon"
                  onClick={() => handleRemoveQuestionChoosed(item.id)}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default QuestionItem;
