import React from "react";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { ROUTER_CONST } from "../../../config/paramsConst/RouterConst";
import { getResults } from "../../../services/resultService";
import { notificationErr } from "../../../utils/Notification";

const Sidebar = () => {
  const [historyList, setHistoryList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getResults(
      (res) => {
        console.log(res);
        setHistoryList(res.data.data);
      },
      () => notificationErr("Can not get history")
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleViewDeatailHistory = (examId) => {
    history.push(`${ROUTER_CONST.history}/${examId}`);
  };

  return (
    <div className="col-md-3">
      <div className="center">
        <div className="home-rate">
          <div className="rate-header">
            <p className="rate-title">History</p>
          </div>
          <div className="list-item-history scrollbar">
            {historyList?.length > 0 &&
              historyList.reverse().map((item, index) => (
                <div
                  key={index}
                  className="history-item"
                  onClick={() => handleViewDeatailHistory(item.examId)}
                >
                  <p>
                    <b>{item.examName || "No name"}</b>
                  </p>
                  <div className="history-info">
                    <p>
                      <b>Time: </b>
                      {item.totalTime}
                    </p>
                    <p>
                      <b>Scores: </b>
                      {item.totalPoint}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
