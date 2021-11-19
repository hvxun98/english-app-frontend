import React, { useEffect, useState } from "react";
import SidebarDashboard from "./components/SidebarDashboard";
import "./dashboard.scss";
import {
  DASHBOARD_HOME_MENU,
  DASHBOARD_QUESTIONS_MENU,
  DASHBOARD_EXAMS_MENU,
  DASHBOARD_CATEGORIES_MENU,
} from "../../constants/dashboardContants";
import HomeDashBoard from "./components/HomeDashboard";
import { useLocation } from "react-router-dom";
import { ROUTER_CONST } from "../../config/paramsConst/RouterConst";
import CategoriesDashboard from "./components/CategoriesDashboard";
import HeaderDashboard from "./components/HeaderDashboard";
import QuestionDashboard from "./components/QuestionDashboard";

const Dashboard = () => {
  const [currentMenu, setCurrentMenu] = useState(DASHBOARD_HOME_MENU);
  const paramlFromUrl = useLocation();

  useEffect(() => {
    if (paramlFromUrl.pathname === ROUTER_CONST.dashboardHome) {
      setCurrentMenu(DASHBOARD_HOME_MENU);
    }
    if (paramlFromUrl.pathname === ROUTER_CONST.categories) {
      setCurrentMenu(DASHBOARD_CATEGORIES_MENU);
    }
    if (paramlFromUrl.pathname === ROUTER_CONST.questions) {
      setCurrentMenu(DASHBOARD_QUESTIONS_MENU);
    }
    if (paramlFromUrl.pathname === ROUTER_CONST.exams) {
      setCurrentMenu(DASHBOARD_EXAMS_MENU);
    }
  }, [paramlFromUrl]);

  const renderDashboardContent = () => {
    switch (paramlFromUrl.pathname) {
      case ROUTER_CONST.dashboardHome:
        return <HomeDashBoard />;
      case ROUTER_CONST.categories:
        return <CategoriesDashboard />;
      case ROUTER_CONST.questions:
        return <QuestionDashboard />;
      default:
        break;
    }
  };
  return (
    <div className="dashboard">
      <SidebarDashboard
        setCurrentMenu={setCurrentMenu}
        currentMenu={currentMenu}
      />

      <div className="dashboard-content">
        <HeaderDashboard />
        {renderDashboardContent()}
      </div>
    </div>
  );
};

export default Dashboard;
