import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { getHistory } from "../../../services/resultService";
import { notificationErr } from "../../../utils/Notification";
import { getUserInfo } from "../../../utils/storage";

const Sidebar = () => {
  const [historyList, setHistoryList] = useState([]);

  const currentUser = getUserInfo();

  useEffect(() => {
    getHistory(
      currentUser.id,
      (res) => {
        setHistoryList(JSON.parse(JSON.stringify(res.data.data)));
      },
      () => notificationErr("Can not get history")
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleViewDeatailHistory = (examId) => {
    // history.push(`${ROUTER_CONST.history}/${examId}`);
    console.log(examId);
  };

  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + " min " + (seconds < 10 ? "0" : "") + seconds + " sec";
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
                      <b>Correct: </b>
                      {item.numberOfCorrect}/{item.totalRecords}
                    </p>
                    <p>
                      <b>Time: </b>
                      {millisToMinutesAndSeconds(item.totalTime)}
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
