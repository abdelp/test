import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as ROUTES from '../../constants/routes';
// import * as ERRORS from '../../constants/errors';

const INITIAL_STATE = {
  username: '',
  password: '',
  error: null,
  loading: false
};

const SignInFormBase = ({
  history
}) => {
  const [state, setState] = useState({ ...INITIAL_STATE });

  const onSubmit = event => {
    const { username, password } = state;

    /*
      reemplazar lo de firebase
    */
  }
}