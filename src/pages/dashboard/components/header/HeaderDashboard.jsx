import React from "react";
import { LogoutOutlined } from "@ant-design/icons";
import logoHVX from "../../../../assets/logo/hvx-logo.png";

const HeaderDashboard = () => {
  return (
    <div className="header-dashboard">
      <div className="container-fluid">
        <div className="header-content pl-5 pr-5">
          <img src={logoHVX} className="header-logo" alt="logo" />

          <div className="header-row">
            <span className="username">
              Admin: <b className="name">HoangVX</b>
            </span>
            <div className="logout">
              <LogoutOutlined className="logout-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderDashboard;
