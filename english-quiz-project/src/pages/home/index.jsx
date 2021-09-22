import React from "react";
import hvxLogo from "../../assets/logo/hvx-logo.png";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="home-header">
        <div className="container">
          <div className="header-content">
            <div className="header-logo">
              <img sr={hvxLogo} alt="logo" />
            </div>

            <div className="header-info">
              <div className="header-info-user">
                <img className="header-info-user-avatar" src="http://placehold.it/30x30" alt="avatar" />
                <span className="header-info-user-name">Hoang Vu</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
