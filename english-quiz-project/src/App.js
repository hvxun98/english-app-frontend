import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "antd/dist/antd.css";
import AppRouter from "./config/router/router";
import "./BaseStyle.scss";
import HvxContextProvider from "./contexts/HvxContext";

function App() {
  return (
    <HvxContextProvider>
      <Router>
        <AppRouter />
      </Router>
    </HvxContextProvider>
  );
}

export default App;
