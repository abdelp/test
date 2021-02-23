// @ts-nocheck
import React from "react";
import { Route } from "react-router-dom";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
import LoginPage from "../../pages/Login";
import TestTypesPage from "../../pages/TestTypes";

const PrivateRoute: React.FC = ({
  component: Component,
  restricted = false,
  cookies,
  ...rest
}): any => (
  <Route
    {...rest}
    render={(props) => {
      if (cookies.get("usuario")) {
        if (cookies.get("usuario_testeado") && restricted) {
          return <TestTypesPage />;
        } else {
          return <Component {...props} />;
        }
      } else {
        return <LoginPage />;
      }
    }}
  />
);

PrivateRoute.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(PrivateRoute);
