import {
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonBackButton,
  IonSpinner
} from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getTestedUserData } from '../APIs';
import './RegistUser.css';

import { useCookies } from "react-cookie";

const RegistUserPage: React.FC = () => {
  const history = useHistory();
  const [rut, setRut] = useState<string>();
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState({message: ''});
  const [cookies, setCookie] = useCookies(["user"]);

  const handleRutChange = (event: any) =>
    setRut(event.target.value);

  const consultUserData = (event: any) => {
    setLoading(true);
    setError({ message: '' });
    setUser(null);
    event.preventDefault();

    getTestedUserData(rut)
    .then((result: any) => {
      setUser(result);
      setLoading(false);
    })
    .catch(err => {
      setError(err);
      setLoading(false);
    });
  }
  
  const confirmUserTested = () => {
    setCookie("usuario_testeado", JSON.stringify(user), {
      path: "/"
    });

    history.push('/page/test-types');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="categories" text="Volver" icon="ios-arrow-back" />
          </IonButtons>
          <IonTitle>Indique el RUT del conductor</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <form className="ion-padding login-list" onSubmit={consultUserData}>
          <IonItem>
            <IonLabel position="floating">RUT</IonLabel>
            <IonInput value={rut} onIonChange={handleRutChange} autofocus />
          </IonItem>
          <input type="submit" className="submit-btn" value="Consultar" />
          {error && <p className="error-msg">{error.message}</p>}
        </form>

        <IonList>
        { loading && <IonItem><IonSpinner className="loading" /></IonItem> }
            { user &&
              <>
                <IonItem>
                  <IonLabel><strong>Nombre:</strong> {user.nombre}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel><strong>C.I.:</strong> {user.ci}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel><strong>Fecha de nacimiento:</strong> {user.fechaNac}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel><strong>Domicilio:</strong> {user.domicilio}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel><strong>Nacionalidad:</strong> {user.nacionalidad}</IonLabel>
                </IonItem>
                <IonItem>
                  <input type="button" onClick={confirmUserTested} className="submit-btn confirm-btn" value="Confirmar" />
                </IonItem>
              </>
          }
          </IonList>
      </IonContent>
    </IonPage>
  );
};

export default RegistUserPage;
