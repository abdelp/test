import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonImg
} from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { get } from 'idb-keyval';
import { getExamDate } from '../APIs';
import { useCookies } from "react-cookie";
import './TestTypes.css';

import pruebaTeoricaBtnImg from '../assets/prueba-teorica-btn-img.svg';
import pruebaPsiquicaBtnImg from '../assets/prueba-psiquica-btn-img.svg';
import pruebaPracticaBtnImg from '../assets/prueba-practica-btn-img.svg';
import declaracionJuradaBtnImg from '../assets/declaracion-jurada-btn-img.svg';
import backArrow from '../assets/back-arrow.svg';

const TestTypesPage: React.FC = () => {
  const history = useHistory();
  const [cookies, setCookie] = useCookies(["user"]);
  const { categoria, ticket, usuario_testeado } = cookies;
  let ci = '';

  if (usuario_testeado) {
    ci = usuario_testeado.ci;
  }

  const checkExamDate = () => {
    return new Promise((resolve, reject) => {

      const examType = 'seleccion_multiple';

      getExamDate({ categoria, ticket, ci, examType })
      .then(result => {
        if (result.date) {
          const fechaExamen = new Date(result.date);
          const today = new Date();
          const fechaHabilitacion = new Date();
          fechaHabilitacion.setDate(fechaExamen.getDate()+30);

          if (today >= fechaHabilitacion) {
            resolve(true);
          } else {
            resolve(true);
          }
        } else {
          resolve(true);
        }
      })
      .catch(err => { 
        console.log(err)
      });
    });
  }
  
  const goToTest = (test: any) => {
    const { categoria, ticket, usuario_testeado } = cookies;

    if (test === 'declaración jurada') {
      history.push({
        pathname: '/page/declaracion-jurada'
      });
    } else if(test === 'practica') {
      history.push({
        pathname: '/page/test-practico'
      });
    } else {
      checkExamDate()
      .then(result => {
        if (result) {
          history.push({
            pathname: '/page/instrucciones',
            state: {categoria, test, usuario_testeado }
          });
        } else {
          history.push({pathname: '/page/notice', state: {categoria, usuario_testeado} });
        }
      })
      .catch(() => 
        history.push({pathname: '/page/notice', state: {categoria, usuario_testeado}})
      );
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="favorite">
          <IonButtons slot="start">
            <IonMenuButton autoHide={false} />
          </IonButtons>
          <IonTitle className="ion-text-uppercase ion-text-center title">{categoria}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div
          className="flex"
          style={{
            height: '100%',
            // maxHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <div
              className="test-type-btn"
              style={{
                margin: '2em',
                width: '50%',
                maxWidth: '400px'
              }}
              onClick={() => goToTest('declaración jurada')}>
              <IonImg src={declaracionJuradaBtnImg} />
            </div >
            <div className="test-type-btn" style={{
              margin: '2em',
              width: '50%',
              maxWidth: '400px'
              
              }} onClick={() => goToTest('teórica')}>
              <IonImg src={pruebaTeoricaBtnImg} />
            </div>
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <div className="test-type-btn" style={{
              margin: '2em',
              width: '50%',
              maxWidth: '400px'
              }} onClick={() => goToTest('psiquica')}>
              <IonImg src={pruebaPsiquicaBtnImg} />
            </div>
            <div className="test-type-btn" style={{
              margin: '2em',
              width: '50%',
              maxWidth: '400px'
              }} onClick={() => goToTest('practica')}>
              <IonImg src={pruebaPracticaBtnImg} />
            </div>
          </div>
          {/* <IonCard>
            <IonCardHeader color="light-blue">
              <IonCardTitle className="ion-text-uppercase">prueba teorica</IonCardTitle>
            </IonCardHeader>

            <IonCardContent className="ion-text-center">
              <br/>
              <IonButton
                className="ion-text-uppercase"
                color="light-blue"
                onClick={() => goToTest('teórica')}
              >seleccionar</IonButton>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader color="alert">
              <IonCardTitle className="ion-text-uppercase">prueba psiquica</IonCardTitle>
            </IonCardHeader>

            <IonCardContent className="ion-text-center">
              <br/>
              <IonButton
                className="ion-text-uppercase"
                color="danger"
                onClick={() => goToTest('psiquica')}>seleccionar</IonButton>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader color="orange">
              <IonCardTitle className="ion-text-uppercase">prueba practica</IonCardTitle>
            </IonCardHeader>

            <IonCardContent className="ion-text-center">
              <br/>
              <IonButton
                className="ion-text-uppercase"
                color="orange"
                onClick={goToTest}>seleccionar</IonButton>
            </IonCardContent>
          </IonCard> */}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TestTypesPage;
