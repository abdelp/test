import { Component } from 'ionicons/dist/types/stencil-public-runtime';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { loggedIn } from '../utils/db';

// @ts-ignore
export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const currentUser = loggedIn();

      if(!currentUser) {
        return <Redirect
          to ={{
            pathname: '/login',
            state: {
              from: props.location
          }}} />
      }

      return <Component {...props} />
    }} />
);