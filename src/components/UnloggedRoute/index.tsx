// @ts-nocheck

import React from "react";
import { Route } from "react-router-dom";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
import LoginPage from "../../pages/Login";
import RegistUserPage from "../../pages/RegistUser";
import TestTypesPage from "../../pages/TestTypes";

const UnloggedRoute: React.FC = ({
  component: Component,
  restricted = false,
  cookies,
  ...rest
}): any => {
  return (
    <Route
      {...rest}
      render={() => {
        if (cookies.get("usuario")) {
          if (cookies.get("usuario_testeado") && restricted) {
            return <TestTypesPage />
          } else {
            return <RegistUserPage />
          }
         } else {
          return <LoginPage />
         }
      }}
    />
  );
};

UnloggedRoute.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(UnloggedRoute);
