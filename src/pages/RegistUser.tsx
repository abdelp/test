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
import { set, get } from 'idb-keyval';

const RegistUserPage: React.FC = () => {
  const history = useHistory();
  const [rut, setRut] = useState<string>('');
  const [user, setUser] = useState<any>();
  let usuariosTesteados: any = [];
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState({message: ''});
  const [cookies, setCookie] = useCookies(["usuario_testeado"]);

  const handleRutChange = (event: any) =>
    setRut(event.target.value);

  const consultUserData = (event: any) => {
    setLoading(true);
    setError({ message: '' });
    setUser(null);
    event.preventDefault();

    get('usuarios_testeados')
    .then((result: any) => {
      console.log('result: ')
      console.log(result);

      if(result && result.length > 0) {
        usuariosTesteados = result;
        const usuario = usuariosTesteados.find((u: any) => u.rut === rut);

        if(usuario) {
          setUser(usuario);
          setLoading(false);
        } else {
          // DRY
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
      } else {
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
    })
    .catch(error => console.log(error));
  }
  
  const confirmUserTested = () => {
    const userT = usuariosTesteados.find((u: any) => u.rut === rut);

    console.log(userT);
  
    if(!userT) {
      usuariosTesteados.push(user);
    }

    set("usuarios_testeados", usuariosTesteados);
    setCookie('usuario_testeado', user, {path: '/'});
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
