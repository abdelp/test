import {
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonSpinner
} from '@ionic/react';
import { logIn } from 'ionicons/icons';
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Login.css';
import { useHistory } from 'react-router-dom';
import { signinUser } from '../APIs';

import GeolocationButton from '../components/GeolocationButton';
import { set, get } from 'idb-keyval';

import { useCookies } from "react-cookie";

const LoginPage: React.FC = () => {
  const exportWorker: Worker = new Worker('../workers/export.js');
  const history = useHistory();
  const [username, setUsername] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState({message: ''});
  const [cookies, setCookie] = useCookies(["user"]);
  const userInput = useRef<HTMLIonInputElement>(null);

  const handleUserChange = (event: any) =>
    setUsername(event.target.value);

  const handlePasswordChange = (event: any) =>
    setPassword(event.target.value);

  const login = (event:any) => {
    setLoading(true);
    event.preventDefault();

    signinUser(username, password)
      .then(async (res:any) => {
        setLoading(false);

        const autenticarExaminadorResult = res.responseXML.getElementsByTagName("AutenticarExaminadorResult")[0];
        const codError = autenticarExaminadorResult.firstChild.innerHTML;

        if (codError == 0) {
          const ticket = autenticarExaminadorResult.getElementsByTagName("Ticket")[0].innerHTML;

          setCookie("ticket", ticket, {
            path: "/"
          });

          history.push('/page/categories');
        } else {
          let errMsg;

          switch(codError) {
            case '6':
              errMsg = 'Usuario y/o contraseña incorrecta';
              break;
            default:
              errMsg = 'Error desconocido'
          }

          setError({message: errMsg})
        }
      })
      .catch(async error => {
        // @ts-ignore
        setLoading(false);
        setError(error);
        console.log('error');
      });
  }

  function saveUser() {
    exportWorker
         .postMessage({msg: 'incApple', countApple: 1});
  }

  async function getUid() {
    const x = await get('user');
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
          {error && <p className="error-msg">{error.message}</p>}
        </form>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
