import React from "react";
import Header from "./header/Header";
import Rate from "./rate/Rate";

import "./home.scss";
import Sidebar from "./sidebar/Sidebar";
import Content from "./midContent/Content";

const Home = () => {
  return (
    <div className="home">
      <Header />
      <div className="content">
        <div className="row">
          <Sidebar />
          <Content />
          <Rate />
        </div>
      </div>
    </div>
  );
};

export default Home;
