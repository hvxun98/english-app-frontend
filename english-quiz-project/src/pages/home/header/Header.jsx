import React from "react";
import hvxLogo from "../../../assets/logo/hvx-logo.png";
import hvxAvt from "../../../assets/images/avt.jpg";
import { Menu, Dropdown } from "antd";
import { ROUTER_CONST } from "../../../config/paramsConst/RouterConst";
import { clearUserInfo, getUserInfo } from "../../../utils/storage";
import { useHistory } from "react-router";

const Header = () => {
  const userInfo = getUserInfo();
  const history = useHistory()

  const handleLogout = () => {
    clearUserInfo();
    window.location.replace(ROUTER_CONST.login);
  };

  const menu = (
    <Menu style={{ width: 120 }} >
      <Menu.Item key="0">
        <span>Profile</span>
      </Menu.Item>

      {userInfo?.id === 9999 && (
        <Menu.Item key="1" onClick={() => history.push(ROUTER_CONST.dashboard)}>
          <span>Dashboard</span>
        </Menu.Item>
      )}

      <Menu.Divider />
      <Menu.Item key="3" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="home-header">
      <div className="container">
        <div className="header-content">
          <div className="header-logo">
            <img className="header-logo-img" src={hvxLogo} alt="hvxLogo" />
          </div>

          <div className="header-info">
            <Dropdown overlay={menu} trigger={["click"]}>
              <div className="header-info-user">
                <img
                  className="header-info-user-avatar"
                  src={hvxAvt}
                  alt="avatar"
                />
                <span className="header-info-user-name">
                  {userInfo.firstName}&nbsp;{userInfo?.lastName}
                </span>
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
