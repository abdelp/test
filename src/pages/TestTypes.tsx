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

const TestTypesPage: React.FC = () => {
  const history = useHistory();
  const [cookies, setCookie] = useCookies(["user"]);

  const checkExamDate = () => {
    return new Promise((resolve, reject) => {

      const { categoria, ticket, usuario_testeado: { ci } } = cookies;
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

    checkExamDate()
    .then(result => {
      if (result) {
        history.replace({
          pathname: '/page/tutorial',
          state: {categoria, usuario_testeado }
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
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton autoHide={false} />
          </IonButtons>
          <IonTitle>Tests</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="flex" style={{display: 'flex', flexWrap: 'wrap'}}>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Teórico</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <br/>
              <IonButton onClick={goToTest}>Empezar</IonButton>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Psicotécnico</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <br/>
              <IonButton onClick={goToTest}>Empezar</IonButton>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Prueba de manejo</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <br/>
              <IonButton onClick={goToTest}>Empezar</IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TestTypesPage;
