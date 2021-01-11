import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonSpinner
} from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signinUser } from '../APIs';
import { useCookies } from "react-cookie";
import './Login.css';

const LoginPage: React.FC = () => {
  const history = useHistory();
  const [username, setUsername] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState({message: ''});
  const [cookies, setCookie] = useCookies(["usuario"]);

  const handleUserChange = (event: any) =>
    setUsername(event.target.value);

  const handlePasswordChange = (event: any) =>
    setPassword(event.target.value);

  const login = (event: any) => {
    setLoading(true);
    event.preventDefault();

    signinUser(username, password)
      .then((res: any) => {
        setLoading(false);
        // const autenticarExaminadorResult = res.responseXML.getElementsByTagName("AutenticarExaminadorResult")[0];
        // const codError = autenticarExaminadorResult.firstChild.innerHTML;

        // if (codError === '0') {
        //   const ticket = autenticarExaminadorResult.getElementsByTagName("Ticket")[0].innerHTML;
          const ticket = 'x';

          setCookie("usuario", JSON.stringify({ username, ticket }), {
            path: "/"
          });

          // setCookie("ticket", ticket, {
          //   path: "/"
          // });

          history.replace('/page/categories');
        // } else {
        //   let errMsg;

        //   switch(codError) {
        //     case '6':
        //       errMsg = 'Usuario y/o contraseña incorrecta';
        //       break;
        //     default:
        //       errMsg = 'Error desconocido'
        //   }

          // setError({message: errMsg})
        // }
      })
      .catch((error: any) => {
        // @ts-ignore
        setLoading(false);
        setError(error);
      });
  }

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="title">Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding" color="light">
        <form className="ion-padding login-list" onSubmit={login}>

          <IonItem>
            <IonLabel position="floating">Usuario</IonLabel>
            <IonInput value={username} onIonChange={handleUserChange} autofocus></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Contraseña</IonLabel>
            <IonInput value={password} type="password" onIonChange={handlePasswordChange} />
          </IonItem>

          <input type="submit" className="submit-btn" value="Ingresar" />
            {
              loading &&

              <IonItem>
                <IonSpinner className="loading" />
              </IonItem>
            }
          { error && <p className="error-msg">{error.message}</p> }
        </form>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
