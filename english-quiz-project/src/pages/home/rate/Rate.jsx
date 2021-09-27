import React from "react";
import { Select } from "antd";
import UserRateItem from "./UserRateItem";

const { Option } = Select;

const topUser = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Sidebar = () => {
  return (
    <div className="col-md-3">
      <div className="home-rate">
        <div className="rate-header">
          <p className="rate-title">Top</p>
          <div className="rate-select-top">
            <Select defaultValue="lucy" className="rate-selected">
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </div>
        </div>
        <div className="list-user-top">
          {topUser.length > 0
            ? topUser.map((item) => {
                return <UserRateItem key={item} name={`User name ${item}`} idx={item} />;
              })
            : "Comming soon"}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
