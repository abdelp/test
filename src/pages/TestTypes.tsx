import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonButtons,
  IonMenuButton
} from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { get } from 'idb-keyval';
import { getExamDate } from '../APIs';
import { useCookies } from "react-cookie";
import './TestTypes.css';

const TestTypesPage: React.FC = () => {
  const history = useHistory();
  const [cookies, setCookie] = useCookies(["user"]);
  const { categoria, ticket, usuario_testeado: { ci } } = cookies;

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

    console.log(test);

    checkExamDate()
    .then(result => {
      if (result) {
        history.replace({
          pathname: '/page/instrucciones',
          state: {categoria, test, usuario_testeado }
        });
      } else {
        history.replace({pathname: '/page/notice', state: {categoria, usuario_testeado} });
      }
    })
    .catch(() => 
      history.replace({pathname: '/page/notice', state: {categoria, usuario_testeado}})
    );
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

      <IonContent fullscreen>
        <div className="flex" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>

          <IonCard>
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
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TestTypesPage;
