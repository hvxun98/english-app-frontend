import React, { useState } from "react";
import Header from "./header/Header";
import Rate from "./rate/Rate";

import "./home.scss";
import Sidebar from "./sidebar/Sidebar";
import Content from "./midContent/Content";

const Home = () => {
  const [currentMenu, setCurrentMennu] = useState(2);
  return (
    <div className="home">
      <Header />
      <div className="content">
        <div className="row">
          <Sidebar setCurrentMennu={setCurrentMennu} />
          <Content currentMenu={currentMenu} />
          <Rate />
        </div>
      </div>
    </div>
  );
};

export default Home;
