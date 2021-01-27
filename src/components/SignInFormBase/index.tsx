import React, { useState } from 'react';
import {
  IonItem,
  IonLabel,
  IonInput,
  IonSpinner
} from '@ionic/react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as ROUTES from '../../constants/routes';
import * as Auth from '../Auth/auth';
import { signInWithUsernameAndPassword } from '../Auth/auth';
import { withCookies, Cookies } from 'react-cookie';

import to from 'await-to-js';
import { compose } from 'recompose';

// import * as ERRORS from '../../constants/errors';

const INITIAL_STATE = {
  username: '',
  password: '',
  error: null,
  loading: false
};

const SignInFormBase = ({
  // auth,
  history,
  cookies,
  setShowLogin
}: any) => {
  const [state, setState] = useState({ ...INITIAL_STATE });
  const { username, password, error, loading } = state;

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setState((state: any) => ({ ...state, loading: true }));
    let error: any, result;

    // [ error, result] = await to(Auth
    //   .signInWithUsernameAndPassword(username, password));

    if(!error) {

      /*
      * start of temporal implementation
      */
     
     const ticket = 'x';
     
     cookies.set("usuario", JSON.stringify({ username, ticket }), {
       path: "/"
      });

     cookies.remove("usuario_testeado", {
       path: "/"
      });
      
      if(setShowLogin) {
        setShowLogin(false);
      }

      setState((state: any) => ({ ...state, ...INITIAL_STATE }));

      history.replace(ROUTES.REGIST_USER);

      /*
       * end of temporal implementation
       */

    } else {
      // const error = { ...err }; // LEAVE EXACT ERRORS FOR LATER
      setState((state: any) => ({ ...state, loading: false, error }));
    }

  };

  const onChange = (e: any) =>
    setState((state: any) => ({ ...state, [e.target.name]: e.target.value }));

  const isInvalid = !password || !username;

  return (
    <form
      className="ion-padding login-list"
      onSubmit={onSubmit}>
      <IonItem lines="none">
        <IonInput
          name="username"
          value={username}
          onIonChange={onChange}
          placeholder="USUARIO"
          autofocus
        />
      </IonItem>

      <IonItem lines="none">
        <IonInput
          name="password"
          value={password}
          type="password"
          onIonChange={onChange}
          placeholder="CONTRASEÑA"
          />
      </IonItem>

      <input
        type="submit"
        className="submit-btn"
        value="ACEPTAR"
        color="favorite"
      />
      {
        loading &&

        <IonItem>
          <IonSpinner className="loading" />
        </IonItem>
      }
      { // @ts-ignore
        error && <p className="error-msg">{error}</p> }
    </form>
  );
}

export default compose(
  withRouter,
  withCookies
)(SignInFormBase);