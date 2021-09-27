import React from "react";
import Header from "./header/Header";
import Rate from "./rate/Rate";

import "./home.scss";
import Sidebar from "./sidebar/Sidebar";

const Home = () => {
  return (
    <div className="home">
      <Header />
      <div className="content">
        <div className="row">
          <Sidebar />
          <div className="col-md-6">
            content
          </div>
          <Rate />
        </div>
      </div>
    </div>
  );
};

export default Home;
