import React from "react";
import { Route } from "react-router-dom";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
import LoginPage from "../../pages/Login";
import RegistUserPage from "../../pages/RegistUser";

// @ts-ignore
const UnloggedRoute: React.FC = ({
  component: Component,
  cookies,
  ...rest
}): any => {
  return (
    <Route
      {...rest}
      render={() => {
        return cookies.get("usuario") ? <RegistUserPage /> : <LoginPage />;
      }}
    />
  );
};

UnloggedRoute.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(UnloggedRoute);
