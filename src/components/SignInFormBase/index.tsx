import React, { useState } from 'react';
import {
  IonItem,
  IonLabel,
  IonInput,
  IonSpinner
} from '@ionic/react';
import PropTypes from 'prop-types';
import * as ROUTES from '../../constants/routes';
import { signInWithUsernameAndPassword } from '../Auth/auth';
import to from 'await-to-js';
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
  const { username, password, error, loading } = state;

  const onSubmit = async (event: any) => {
    // setState((state: any) => ({ ...state, loading: true })); // TRY
    let error: any, result;

    [ error, result] = await to(auth
      .siginInWithUsernameAndPassword(username, password))

    if(!error) {
      setState((state: any) => ({ ...state, ...INITIAL_STATE }));
    } else {
      // const error = { ...err }; // LEAVE EXACT ERRORS FOR LATER
      setState((state: any) => ({ ...state, error }));
    }

    event.preventDefault();
  };

  const onChange = (e: any) => {
    e.persist();
    setState((state: any) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const isInvalid = !password || !username;

  return (
    <form
      className="ion-padding login-list"
      onSubmit={onSubmit}>
      <IonItem>
        <IonLabel
          position="floating"
        >
          Usuario
        </IonLabel>
        <IonInput
          value={username}
          onIonChange={onChange}
          autofocus
        />
      </IonItem>

      <IonItem>
        <IonLabel
          position="floating">
            Contraseña
        </IonLabel>
        <IonInput
          value={password}
          type="password"
          onIonChange={onChange}
          />
      </IonItem>

      <input
        type="submit"
        className="submit-btn"
        value="Ingresar"
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