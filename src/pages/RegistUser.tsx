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
  IonMenuButton,
  IonSpinner
} from '@ionic/react';
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { getTestedUserData } from '../APIs';
import './RegistUser.css';

import { useCookies } from "react-cookie";
import { set, get } from 'idb-keyval';

const RegistUserPage: React.FC = () => {
  const history = useHistory();
  {/*
  //@ts-ignore */}
  const [state, setState]: any = useState<any>({
    rut: '',
    user: null,
    loading: false,
    error: null
  });

  // const [user, setUser] = useState<any>();
  let usuariosTesteados: any = [];
  const [cookies, setCookie] = useCookies(["usuario_testeado"]);
  const form = useRef<any>(null);

  const handleRutChange = (event: any) =>
    setState((state: any) => ({...state, rut: event.target.value }));

  const consultUserData = (event: any) => {
    setState((state: any) => ({...state, user: null, loading: true, error: {message: ''}}));
    event.preventDefault();

    get('usuarios_testeados')
    .then((result: any) => {
      if(result && result.length > 0) {
        usuariosTesteados = result;
        const usuario = usuariosTesteados.find((u: any) => u.rut === state.rut);

        if(usuario) {
          setState((state: any) => ({...state, user: usuario, loading: false}));
        } else {
          getTestedUserData(state.rut)
          .then((result: any) => {
            setState((state: any) => ({...state, user: result, loading: false}));
          })
          .catch(err => {
            setState((state: any) => ({...state, error: err, loading: false}));
          });
        }
      } else {
        getTestedUserData(state.rut)
        .then((result: any) => {
          setState((state: any) => ({...state, user: result, loading: false}));
        })
        .catch(err => {
          setState((state: any) => ({...state, error: err, loading: false}));
        });
      }
    })
    .catch(error => console.log(error));
  }
  
  const confirmUserTested = () => {
    const userT = usuariosTesteados.find((u: any) => u.rut === state.rut);
  
    if(!userT) {
      usuariosTesteados.push(state.user);
    }

    set("usuarios_testeados", usuariosTesteados);
    setCookie('usuario_testeado', state.user, {path: '/'});
    history.replace('/page/test-types');
  }

  useEffect(() => {
    setState((state: any) => ({...state, rut: '', user: null}));
  }, []);

  const { rut, user, error, loading } = state;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="favorite">
        <IonButtons slot="start">
            <IonMenuButton autoHide={false} />
          </IonButtons>
          <IonTitle className="ion-text-center">Indique el RUT del conductor</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <form className="ion-padding login-list" onSubmit={consultUserData} ref={form}>
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
