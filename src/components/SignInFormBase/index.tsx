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
  auth,
  history
}: any) => {
  const [state, setState] = useState({ ...INITIAL_STATE });

  const onSubmit = async (event: any) => {
    const { username, password } = state;


  }
}