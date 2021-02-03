import {
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { obtenerDatosUsuarioTesteadoPorCedula } from '../utils/db';
import DataList from '../components/DataList';
import './Report.css';
import { withCookies } from 'react-cookie';

const ReportPage: React.FC = ({
  cedula,
  cookies
}: any) => {
  cedula = '222';

  const history = useHistory();
  const [state, setState]: any = useState<any>({
    cedula: '',
    user: null,
    porcentajes: {
      declaracionJurada: 0,
      practico: 0,
      teorico: 0,
      testMemorizarNumeros: 0,
      testColores: 0,
      testDirecciones: 0,
      testNumerosGrandes: 0,
      testPosicionesBloques: 0
    },
    loading: false,
    error: null
  });

  useEffect(() => {
    obtenerDatosUsuarioTesteadoPorCedula(cedula)
    .then((result: any) => {
      setState((state: any) => ({...state, user: result}));
      calculateResults(result);
    })
    .catch((error: any) => console.log(error));

  }, []);

  const returnMenu = () => {
    history.push('/page/test-types');
  }

  const calculateResults = (usuario: any) => {
    console.log(usuario);
    const categoria = cookies.get('categoria');
    const declaracionJurada = usuario.examenes[categoria].declaracionJurada ? 100 : 0;

    const respuestasPractico = usuario
        .examenes[categoria]
        .practico
        .declaracion
        .map((i: any) => i.items.map((si: any) => si.respuesta)).flat();

    const respuestasCorrectasPractico = respuestasPractico.filter((correcta: any) => correcta);
  
    const porcentajePractico = respuestasCorrectasPractico.length * 100 / respuestasPractico.length;

    // console.log(usuario.map((i: any) => i.items));
    // const practico = 
    let nuevosPorcentajes = {
      declaracionJurada,
      practico: porcentajePractico
    };

    setState((state: any) => ({
      ...state,
      porcentajes: nuevosPorcentajes
    }))
  };

  const { user, porcentajes } = state;

  console.log(porcentajes)
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="favorite">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="ion-text-center title">Informe</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {user &&
        <>
          <DataList user={user} />
          <IonTitle className="report-title">Declaración Jurada</IonTitle>
          <IonItem>
            <div className="percentage-container">
              <div className="percentage-text">Declaración Jurada</div>
              <div className="percentage-number">
                <progress
                  id="file"
                  value={porcentajes.declaracionJurada}
                  max="100"
                  className="percentage-bar"
                ></progress> {porcentajes.declaracionJurada}%
              </div>
            </div>
          </IonItem>
          <IonTitle className="report-title">Prueba Práctica - porcentaje mínimo para aprobación 70%</IonTitle>
          <IonItem>
            <div className="percentage-container">
              <div className="percentage-text">Idoneidad conductiva</div>
              <div className="percentage-number">
                <progress
                  id="file"
                  value={porcentajes.practico}
                  max="100"
                  className="percentage-bar"></progress>
                {porcentajes.practico}%
              </div>
            </div>
          </IonItem>
          <IonTitle className="report-title">Prueba Teórica - Porcentaje mínimo para aprobación 70%</IonTitle>
          <IonItem>
            <div className="percentage-container">
              <div className="percentage-text">
                <p>conocimientos sobre conducción</p>
                <p>señalización</p>
                <p>legislación</p>
                <p>accidentes y modo de prevenirlos</p>
              </div>
              <div className="percentage-number">
                <progress
                  id="file"
                  value="32"
                  max="100"
                  className="percentage-bar"
                > 32% </progress>%
              </div>
            </div>
          </IonItem>
          <IonTitle className="report-title">Prueba psíquica - Porcentaje mínimo para aprobación 70%</IonTitle>

            <div className="percentage-container">
              <div className="percentage-text">
                <p>prueba 1</p>
              </div>
              <div className="percentage-number">
                <progress
                  id="file"
                  value="32"
                  max="100"
                  className="percentage-bar"></progress>%
              </div>
            </div>
            <div className="percentage-container">
              <div className="percentage-text">
                <p>prueba 2</p>
              </div>
              <div className="percentage-number">
                <progress id="file" value="32" max="100" className="percentage-bar"></progress>%
              </div>
            </div>
            <div className="percentage-container">
              <div className="percentage-text">
                <p>prueba 3</p>
              </div>
              <div className="percentage-number">
                <progress id="file" value="32" max="100" className="percentage-bar"></progress>%
              </div>
            </div>
            <div className="percentage-container">
              <div className="percentage-text">
                <p>prueba 4</p>
              </div>
              <div className="percentage-number">
                <progress id="file" value="32" max="100" className="percentage-bar"></progress>%
              </div>
            </div>
            <div className="percentage-container">
              <div className="percentage-text">
                <p>prueba 5</p>
              </div>
              <div className="percentage-number">
                <progress id="file" value="32" max="100" className="percentage-bar"></progress>%
              </div>
            </div>
          <IonButton className="back-to-main" color="favorite" onClick={returnMenu}>Pagina principal</IonButton>
        </>
        }
      </IonContent>
  </IonPage>
  );
};

export default withCookies(ReportPage);
