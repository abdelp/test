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

const TestTypesPage: React.FC = () => {
  const history = useHistory();
  const [cookies, setCookie] = useCookies(["user"]);
  const { categoria, ticket, usuario_testeado } = cookies;
  let ci = '', renovacion;

  if (usuario_testeado) {
    ci = usuario_testeado.ci;
    renovacion = usuario_testeado.renovacion;
  }

  /* extend to also use local database to check date */
  const addDays = (date: any, days: any) => {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy
  };

  const checkExamDate = (test: any) => {
    return new Promise((resolve, reject) => {
      getExamDate({ categoria, ticket, ci, test })
      .then(result => {
        if (result.date) {

          const fechaExamen = new Date(result.date);
          const today = new Date();
          let fechaHabilitacion = new Date();
          fechaHabilitacion = addDays(fechaExamen, 30);

          if (today >= fechaHabilitacion) {
            resolve(true);
          } else {
            resolve(false);
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

    console.log(test);

    checkExamDate(test)
    .then(result => {
      if (result) {
        if (test === 'declaración jurada') {
          history.push({
            pathname: '/page/declaracion-jurada'
          });
        } else if(test === 'practica') {
          history.push({
            pathname: '/page/test-practico'
          });
        } else if(test === 'teórica') {
          history.push({
            pathname: '/page/instrucciones',
            state: {categoria, test, usuario_testeado }
          });
        } else if(test === 'psiquica') {
          history.push({
            pathname: '/page/instrucciones',
            state: {categoria, test, usuario_testeado }
          });
        }
      } else {
        history.push({pathname: '/page/notice', state: {categoria, usuario_testeado} });
      }
    })
    .catch(() => 
      history.push({pathname: '/page/notice', state: {categoria, usuario_testeado}})
    );
  };

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
            </div>

            {!renovacion &&
              <div className="test-type-btn" style={{
                margin: '2em',
                width: '50%',
                maxWidth: '400px'
                
                }} onClick={() => goToTest('teórica')}>
                <IonImg src={pruebaTeoricaBtnImg} />
              </div>
            }
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <div className="test-type-btn" style={{
              margin: '2em',
              width: '50%',
              maxWidth: '400px'
              }} onClick={() => goToTest('psiquica')}>
              <IonImg src={pruebaPsiquicaBtnImg} />
            </div>
            {!renovacion &&
              <div className="test-type-btn" style={{
                margin: '2em',
                width: '50%',
                maxWidth: '400px'
                }} onClick={() => goToTest('practica')}>
                <IonImg src={pruebaPracticaBtnImg} />
              </div>
            }
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
