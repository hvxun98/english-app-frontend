import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./config/router/router";
import "antd/dist/antd.css";
import "./BaseStyle.scss";
import { HvxContextProvider } from "./contexts";
import Notification from "./components/notification/alert";

function App() {
  return (
    <HvxContextProvider>
      <Notification />
      <Router>
        <AppRouter />
      </Router>
    </HvxContextProvider>
  );
}

export default App;
