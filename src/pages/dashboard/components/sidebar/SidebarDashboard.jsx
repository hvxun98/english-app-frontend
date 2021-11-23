import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ApartmentOutlined,
  QuestionOutlined,
  BookOutlined,
  HomeOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import {
  DASHBOARD_CATEGORIES_MENU,
  DASHBOARD_EXAMS_MENU,
  DASHBOARD_HOME_MENU,
  DASHBOARD_QUESTIONS_MENU,
  TOOLTIP_POSITION,
} from "../../../../constants/dashboardContants";
import { useHistory } from "react-router-dom";
import { ROUTER_CONST } from "../../../../config/paramsConst/RouterConst";

const SidebarDashboard = ({ currentMenu }) => {
  const [isExpand, setIsExpand] = useState("");
  const history = useHistory();

  const activeCurrentMenu = (curMenu) => {
    switch (curMenu) {
      case DASHBOARD_CATEGORIES_MENU:
        return history.push(ROUTER_CONST.categories);
      case DASHBOARD_EXAMS_MENU:
        return history.push(ROUTER_CONST.exams);
      case DASHBOARD_HOME_MENU:
        return history.push(ROUTER_CONST.dashboardHome);
      case DASHBOARD_QUESTIONS_MENU:
        return history.push(ROUTER_CONST.questions);
      default:
        history.push(ROUTER_CONST.dashboardHome);
        break;
    }
  };

  return (
    <div className={`sidebar ${isExpand}`}>
      <div className="sidebar-header">
        <Tooltip
          placement={TOOLTIP_POSITION}
          title={"Go back"}
          color={"white"}
          destroyTooltipOnHide={!isExpand}
        >
          <div
            className="sidebar-reponsive icon-back"
            onClick={() => history.push(ROUTER_CONST.home)}
          >
            <ArrowLeftOutlined className="sidebar-reponsive-icon" />
          </div>
        </Tooltip>
        {isExpand ? (
          <div className="sidebar-reponsive" onClick={() => setIsExpand("")}>
            <MenuFoldOutlined className="sidebar-reponsive-icon" />
          </div>
        ) : (
          <div
            className="sidebar-reponsive"
            onClick={() => setIsExpand("sidebar-expand")}
          >
            <MenuUnfoldOutlined className="sidebar-reponsive-icon" />
          </div>
        )}

        <div className="sidebar-user">
          <img src="http://placehold.it/50x50" alt="avt" className="user-avt" />
        </div>
      </div>
      <div className="sidebar-menu">
        <Tooltip
          placement={TOOLTIP_POSITION}
          title={"Home"}
          color={"white"}
          destroyTooltipOnHide={!isExpand}
        >
          <div
            className={`sidebar-menu-item ${
              currentMenu === DASHBOARD_HOME_MENU && "active-menu"
            }`}
            onClick={() => activeCurrentMenu(DASHBOARD_HOME_MENU)}
          >
            <HomeOutlined className="sidebar-menu-icon" />{" "}
            <span className="menu-item-text">Home</span>
          </div>
        </Tooltip>
        <Tooltip
          placement={TOOLTIP_POSITION}
          title={"Categories"}
          color={"white"}
        >
          <div
            className={`sidebar-menu-item ${
              currentMenu === DASHBOARD_CATEGORIES_MENU && "active-menu"
            }`}
            onClick={() => activeCurrentMenu(DASHBOARD_CATEGORIES_MENU)}
          >
            <ApartmentOutlined className="sidebar-menu-icon" />
            <span className="menu-item-text">Categories</span>
          </div>
        </Tooltip>
        <Tooltip
          placement={TOOLTIP_POSITION}
          title={"Questions"}
          color={"white"}
        >
          <div
            className={`sidebar-menu-item ${
              currentMenu === DASHBOARD_QUESTIONS_MENU && "active-menu"
            }`}
            onClick={() => activeCurrentMenu(DASHBOARD_QUESTIONS_MENU)}
          >
            <QuestionOutlined className="sidebar-menu-icon" />
            <span className="menu-item-text">Questions</span>
          </div>
        </Tooltip>
        <Tooltip placement={TOOLTIP_POSITION} title={"Exams"} color={"white"}>
          <div
            className={`sidebar-menu-item ${
              currentMenu === DASHBOARD_EXAMS_MENU && "active-menu"
            }`}
            onClick={() => activeCurrentMenu(DASHBOARD_EXAMS_MENU)}
          >
            <BookOutlined className="sidebar-menu-icon" />
            <span className="menu-item-text">Exams</span>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default SidebarDashboard;
