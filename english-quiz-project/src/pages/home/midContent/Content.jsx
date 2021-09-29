import React from "react";
import { Select, Input } from "antd";

const { Option } = Select;
const { Search } = Input;

const Content = () => {
  const onSearch = (value) => console.log(value);

  return (
    <div className="col-md-6 midContent">
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
          <div className="col-md-6">
            <div className="item">

            </div>
          </div>
          <div className="col-md-6">
            <div className="item">

            </div>
          </div>
          <div className="col-md-6">
            <div className="item">

            </div>
          </div>
          <div className="col-md-6">
            <div className="item">

            </div>
          </div>
          <div className="col-md-6">
            <div className="item">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
