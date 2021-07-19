import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "antd/dist/antd.css";
import AppRouter from "./config/router/router";
import './BaseStyle.scss'

function App() {
  return (
    <Router basename="/student/">
      <AppRouter />
    </Router>
  );
}

export default App;