import React from "react";
import hvxLogo from "../../../assets/logo/hvx-logo.png";
import hvxAvt from "../../../assets/images/avt.jpg";
import { Menu, Dropdown } from "antd";
import { useHistory } from "react-router";
import { ROUTER_CONST } from "../../../config/paramsConst/RouterConst";

const Header = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push(ROUTER_CONST.login);
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <span>Profile</span>
      </Menu.Item>

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
                <span className="header-info-user-name">Hoang Vu</span>
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
