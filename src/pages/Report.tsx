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

const round = (value: any) => {
  {/*
  //@ts-ignore */}
  return (value).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
};

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
    /* verificar cuando se redondea el porcentaje 99.9 */
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

    const respuestasTeorico = usuario.examenes[categoria]
      .teorica
      .result;

    const respuestasCorrectasTeorico = respuestasTeorico.filter((q: any) => q.respuesta === q.selected);

    const porcentajeTeorico = round(respuestasCorrectasTeorico.length * 100 / respuestasTeorico.length);

    let nuevosPorcentajes = {
      declaracionJurada,
      practico: porcentajePractico,
      teorico: porcentajeTeorico
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
              <div className="percentage-number" id="file">
                <div className="w3-light-grey w3-round verde">
                  <div className="w3-container w3-blue w3-round " 
                  style={{ width: porcentajes.declaracionJurada}}
                  /*style={{ width: "30%"}}*/
                  ></div>
                </div>
                <b>{porcentajes.declaracionJurada}%</b>
              </div>
            </div>
          </IonItem>
          <IonTitle className="report-title">Prueba Práctica - porcentaje mínimo para aprobación 70%</IonTitle>
          <IonItem>
            <div className="percentage-container">
              <div className="percentage-text">Idoneidad conductiva</div>
              <div className="percentage-number" id="file">
                <div className="w3-light-grey w3-round naranja">
                  <div className="w3-container w3-blue w3-round " 
                  style={{ width: porcentajes.practico}}
                  /*style={{ width: "30%"}}*/
                  ></div>
                </div>
                <b>{porcentajes.practico}%</b>
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
              <div className="percentage-number" id="file">
                <div className="w3-light-grey w3-round celeste">
                  <div className="w3-container w3-blue w3-round " 
                  style={{ width: porcentajes.teorico}}
                  /* style={{ width: "30%"}} */
                  >

                  </div>
                </div>
                <b>{porcentajes.teorico}%</b>
              </div>
            </div>
          </IonItem>
          <IonTitle className="report-title">Prueba psíquica - Porcentaje mínimo para aprobación 70%</IonTitle>
          <div className="reporte-psiquica">
            <div className="percentage-container">
              <div className="percentage-text">
                <p>prueba 1</p>
              </div>
              <div className="percentage-number" id="file">
                <div className="w3-light-grey w3-round rojo">
                  <div className="w3-container w3-blue w3-round " 
                  /*style={{ width: porcentajes.teorico}}*/
                  style={{ width: "32%"}}
                  >
                  </div>
                </div>
                <b>32%</b>
              </div>
            </div>
            <div className="percentage-container">
              <div className="percentage-text">
                <p>prueba 2</p>
              </div>
              <div className="percentage-number" id="file">
                <div className="w3-light-grey w3-round rojo">
                  <div className="w3-container w3-blue w3-round " 
                  /*style={{ width: porcentajes.teorico}}*/
                  style={{ width: "32%"}}
                  >
                  </div>
                </div>
                <b>32%</b>
              </div>
            </div>
            <div className="percentage-container">
              <div className="percentage-text">
                <p>prueba 3</p>
              </div>
              <div className="percentage-number" id="file">
                <div className="w3-light-grey w3-round rojo">
                  <div className="w3-container w3-blue w3-round " 
                  /*style={{ width: porcentajes.teorico}}*/
                  style={{ width: "32%"}}
                  >
                  </div>
                </div>
                <b>32%</b>
              </div>
            </div>
            <div className="percentage-container">
              <div className="percentage-text">
                <p>prueba 4</p>
              </div>
              <div className="percentage-number" id="file">
                <div className="w3-light-grey w3-round rojo">
                  <div className="w3-container w3-blue w3-round " 
                  /*style={{ width: porcentajes.teorico}}*/
                  style={{ width: "32%"}}
                  >
                  </div>
                </div>
                <b>32%</b>
              </div>
            </div>
            <div className="percentage-container">
              <div className="percentage-text">
                <p>prueba 5</p>
              </div>
              <div className="percentage-number" id="file">
                <div className="w3-light-grey w3-round rojo">
                  <div className="w3-container w3-blue w3-round " 
                  /*style={{ width: porcentajes.teorico}}*/
                  style={{ width: "32%"}}
                  >
                  </div>
                </div>
                <b>32%</b>
              </div>
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
