import React, { useState } from "react";
import { IonItem, IonInput, IonSpinner } from "@ionic/react";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { withCookies } from "react-cookie";
import { compose } from "recompose";

const INITIAL_STATE = {
  username: "",
  password: "",
  error: null,
  loading: false,
};

const AuthenticateFormBase = ({
  history,
  setShowLogin,
}: any) => {
  const [state, setState] = useState({ ...INITIAL_STATE });
  const { username, password, error, loading } = state;

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setState((state: any) => ({ ...state, loading: true }));
    let error: any;

    if (!error) {
      /*
       * start of temporal implementation
       */

      //  cookies.set("usuario", JSON.stringify({ username, ticket }), {
      //    path: "/"
      //   });

      //  cookies.remove("usuario_testeado", {
      //    path: "/"
      //   });

      if (setShowLogin) {
        setShowLogin(false);
      }

      setState((state: any) => ({ ...state, ...INITIAL_STATE }));

      history.replace(ROUTES.PRACTICAL_TEST);

      /*
       * end of temporal implementation
       */
    } else {
      setState((state: any) => ({ ...state, loading: false, error }));
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
    </form>
  );
};

export default compose(withRouter, withCookies)(AuthenticateFormBase);
