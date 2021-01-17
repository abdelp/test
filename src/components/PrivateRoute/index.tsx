import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import LoginPage from '../../pages/Login';

// @ts-ignore
const PrivateRoute: React.FC = ({ component: Component, cookies, ...rest }): any => {
  return <Route
    {...rest}
    render={props => {
      return cookies.get('usuario') ? <Component {...props} /> : <LoginPage />;
    }}
  />
};

PrivateRoute.propTypes = {
  cookies: instanceOf(Cookies).isRequired
};

export default withCookies(PrivateRoute);