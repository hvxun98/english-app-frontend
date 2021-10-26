import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { getTopRequest } from "../../../services/rateService";
import { notificationErr } from "../../../utils/Notification";
import UserRateItem from "./UserRateItem";

const Sidebar = () => {
  const [topListRender, setTopListRender] = useState();
  const [userList, setUserList] = useState();
  useEffect(() => {
    getTopRequest(getTopResponse, () =>
      notificationErr("Can not get top user!")
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTopResponse = (res) => {
    console.log(res);
    const listResults = res.data.results;
    setUserList(res.data.users);
    let listResultsMax = JSON.parse(JSON.stringify(listResults.sort(compare)));
    const finalList = [];
    for (let i = 0; i < listResultsMax.length; i++) {
      if (
        !finalList?.find((item) => item.examId === listResultsMax[i].examId)
      ) {
        finalList.push(listResultsMax[i]);
      }
    }
    console.log(finalList);
    setTopListRender(finalList);
  };

  const compare = (a, b) => {
    if (a.totalPoint < b.totalPoint) {
      return 1;
    }
    if (a.totalPoint > b.totalPoint) {
      return -1;
    }
    return 0;
  };

  return (
    <div className="col-md-3">
      <div className="center">
        <div className="home-rate">
          <div className="rate-header">
            <p className="rate-title">Top</p>
          </div>
          <div className="list-user-top">
            {topListRender?.length > 0
              ? topListRender.map((item, index) => {
                  return (
                    <UserRateItem
                      key={item.id}
                      name={userList.find((user) => user.id === item.userId)}
                      idx={index + 1}
                      point={item.totalPoint}
                    />
                  );
                })
              : "Comming soon"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
