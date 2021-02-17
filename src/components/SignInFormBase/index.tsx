import React, { useState } from "react";
import { IonItem, IonInput, IonSpinner } from "@ionic/react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import * as ROUTES from "../../constants/routes";
import { signInWithUsernameAndPassword } from "../Auth/auth";
import { withCookies, Cookies } from "react-cookie";
import to from "await-to-js";
import { compose } from "recompose";
import { UserAuth } from "../../interfaces";

// import * as ERRORS from '../../constants/errors';

const INITIAL_STATE = {
  username: "",
  password: "",
  error: null,
  loading: false,
};

const SignInFormBase = ({ history, cookies, setShowLogin }: any) => {
  const [state, setState] = useState({ ...INITIAL_STATE });
  const { username, password, error, loading } = state;

  const onSubmit = async (event: any) => {
    event.preventDefault();

    setState((state: any) => ({ ...state, loading: true }));
    let error: any, result: any;

    [error, result] = await to(
      signInWithUsernameAndPassword(username, password)
    );

    if (!error) {
      if (result?.codError === "0") {
        cookies.set(
          "usuario",
          JSON.stringify({ username, ticket: result.ticket }),
          {
            path: "/",
          }
        );

        cookies.remove("usuario_testeado", {
          path: "/",
        });

        if (setShowLogin) {
          setShowLogin(false);
        }

        history.replace(ROUTES.REGIST_USER);
      } else {
        setState((state: any) => ({
          ...state,
          loading: false,
          error: result?.mensaje,
        }));
      }
    } else {
      // const error = { ...err }; // LEAVE EXACT ERRORS FOR LATER
      setState((state: any) => ({
        ...state,
        loading: false,
        error: error.message || 'Error de conexión',
      }));
    }
  };

  const onChange = (e: any) =>
    setState((state: any) => ({ ...state, [e.target.name]: e.target.value }));

  const isInvalid = !password || !username;

  return (
    <form className="ion-padding login-list" onSubmit={onSubmit}>
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
        disabled={isInvalid}
      />
      {loading && (
        <IonItem>
          <IonSpinner className="loading" />
        </IonItem>
      )}
      {
        // @ts-ignore
        error && <p className="error-msg">{error}</p>
      }
      <p className="error-msg">Network error</p>
    </form>
  );
};

export default compose(withRouter, withCookies)(SignInFormBase);
