import React, { Fragment, Suspense, lazy } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { Loader } from "../../components/loading";
import { ROUTER_CONST } from "../paramsConst/RouterConst";
import PrivateRoute from "./privateRouter";

const Home = lazy(() => import("../../pages/home"));
const Game = lazy(() => import("../../pages/games"));
const Oauth = lazy(() => import("../../pages/oauth"));

const AppRoutes = () => {
  return (
    <Fragment>
      <Suspense fallback={Loader}>
        <Switch>
          <PrivateRoute exact path={ROUTER_CONST.home} component={Home} />
          <Route exact path={ROUTER_CONST.login} component={Oauth} />
          <PrivateRoute exact path={ROUTER_CONST.game} component={Game} />
        </Switch>
      </Suspense>
    </Fragment>
  );
};
export default withRouter(AppRoutes);
