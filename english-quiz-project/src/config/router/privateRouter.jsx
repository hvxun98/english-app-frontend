import React from "react";
import { Route, useLocation } from "react-router-dom";
import { redirectLogin } from "../libs/redirects/redirectLogin";
import { checkDataInStore } from "../libs/saveAndGetData/checkData";
import { getToken } from "../libs/saveAndGetData/getData";

// var Jwt = require("jsonwebtoken");

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = getToken();

  const location = useLocation();

  localStorage.setItem(
    "urlBeforeLogin",
    `${location.pathname}${location.search}`
  );

  return (
    <Route
      {...rest}
      render={({ props }) =>
        checkDataInStore(token) ? <Component {...props} /> : redirectLogin()
      }
    />
  );
};

export default PrivateRoute;