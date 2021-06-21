import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import ButtonAppBar from "./components/AppNavbar";
import SignIn from "./components/Signin";
import SignUp from "./components/SignUp";

const Routes = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <ButtonAppBar />
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/signin" exact component={SignIn} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
};
export default Routes;
