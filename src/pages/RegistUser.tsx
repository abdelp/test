import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonMenuButton,
  IonSpinner
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import to from 'await-to-js';

import { useHistory } from 'react-router-dom';
import { getTestedUserData } from '../APIs';
import './RegistUser.css';
import SearchTestedUserFormBase from '../components/SearchTestedUserFormBase';
import DataList from '../components/DataList';

import { useCookies } from "react-cookie";
import { set, get } from 'idb-keyval';

// import { eliminarUsuarioTesteadoPorCedula } from '../utils/db';

const RegistUserPage: React.FC = () => {
  const history = useHistory();
  const [state, setState]: any = useState<any>({
    cedula: '',
    user: null,
    loading: false,
    error: null
  });

  const [usuariosTesteados, setUsuariosTesteados]: any = useState([]);
  const [cookies, setCookie] = useCookies(["usuario_testeado"]);

  const handleChange = (event: any) =>
    setState((state: any) => ({...state, [event.target.name]: event.target.value }));

  const consultUserData = async (event: any) => {
    setState((state: any) => ({...state, user: null, loading: true, error: {message: ''}}));
    event.preventDefault();

    let [err, result]: any = await to(get('usuarios_testeados'));
    
    if (err) return;

    if(result && result.length > 0) {
      setUsuariosTesteados((state: any) => result);
      const usuario = usuariosTesteados.find((u: any) => u.cedula === state.cedula);

      if(usuario) {
        setState((state: any) => ({...state, user: usuario, loading: false}));
      } else {
        [err, result] = await to(getTestedUserData(state.cedula));

        if(err) {
          setState((state: any) => ({...state, error: err, loading: false}));
        } else {
          setState((state: any) => ({...state, user: result, loading: false}));
        }
      }
    } else {
      [err, result ] = await to(getTestedUserData(state.cedula));

      if(err) {
        setState((state: any) => ({...state, error: err, loading: false}));
      } else {
        setState((state: any) => ({...state, user: result, loading: false}));
      }
    }
  }
  
  const confirmUserTested = () => {
    const userT = usuariosTesteados.find((u: any) => u.cedula === state.cedula);
  
    if(!userT) {
      usuariosTesteados.push(state.user);
    }

    set("usuarios_testeados", usuariosTesteados);
    setCookie('usuario_testeado', {
      nombres: state.user.nombres,
      apellidos: state.user.apellidos,
      cedula: state.user.cedula,
      nroAntecedente: state.user.nroAntecedente,
      renovacion: state.user.renovacion
    }, {path: '/'});
    setCookie('categoria', state.user.categoria, {path: '/'});

    history.replace({
      pathname: '/page/test-types',
      state: state.user
    });
  }

  useEffect(() => {
    // const x = async () => {
    //   const result = await eliminarUsuarioTesteadoPorCedula('111');

    //   return result;
    // };

    // x().then((result: any) => console.log(result));

    setState((state: any) => ({...state, cedula: '', user: null}));
  }, []);

  const { cedula, user, error, loading } = state;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="favorite">
        <IonButtons slot="start">
            <IonMenuButton autoHide={false} />
          </IonButtons>
          <IonTitle className="ion-text-center title">Ingresar C.I.N&deg; / Pasaporte</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <div className="grilla">
          <SearchTestedUserFormBase
            onSubmit={consultUserData}
            handleChange={handleChange}
            cedula={cedula}
            error={error}
          />

          { loading && <IonItem><IonSpinner className="loading" /></IonItem> }

          { user &&
            <>
              <DataList user={user} />
              <input type="button" onClick={confirmUserTested} className="submit-btn confirm-btn" value="Confirmar" />
            </>
          }
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RegistUserPage;
