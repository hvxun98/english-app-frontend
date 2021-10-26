import React, { useEffect } from "react";
import { getUserInfo } from "../../../utils/storage";
import { fetchCategories } from "../../../services/categoriesService";
import { useState } from "react/cjs/react.development";
import { notificationErr } from "../../../utils/Notification";

const Sidebar = ({ setCurrentMennu }) => {
  const userInfo = getUserInfo();
  const [categoriesList, setCategoriesList] = useState([]);
  const [currentTab, setCurrentTab] = useState(1);

  useEffect(() => {
    fetchCategories(getCategoriesRespone, getError);
  }, []);

  const getCategoriesRespone = (res) => {
    setCategoriesList(res?.data?.data);
  };

  const getError = () => {
    notificationErr("Cannot get categories")
  };

  const handleSelectCategories = (id) => {
    setCurrentTab(id);
    setCurrentMennu(id);
  };

  return (
    <div className="col-md-3">
      <div className="center">
        <div className="home-sidebar">
          <div className="user-profile">
            <p className="user-fullname">{`${userInfo.firstName} ${userInfo.lastName}`}</p>
            <p>
              Best score: <span className="best-scores">100</span>
            </p>
          </div>
          <div className="sidebar-menu mt-2">
            {categoriesList?.length > 0
              ? categoriesList.map((category) => {
                  return (
                    <div
                      key={category.id}
                      className={`menu-item ${
                        currentTab === category.id && "active"
                      }`}
                      onClick={() => handleSelectCategories(category.id)}
                    >
                      <span className="item">{category.categoryName}</span>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
