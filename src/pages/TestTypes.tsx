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
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import { useHistory } from 'react-router-dom';
import { get } from 'idb-keyval';
import { today } from 'ionicons/icons';

const TestTypesPage: React.FC = () => {
  const history = useHistory();

  const checkExamDate = () => {
    return new Promise((resolve, reject) => {
      const ci = '123';
  
      get(ci)
      .then((result: any) => {
        // const enableDate = new Date();
        // enableDate.setDate(result.date.getDate()+30);

        // if(result.date < enableDate) {
        //   reject(true);
        // } else {
          resolve(true);
        // }
      })
      .catch(err => console.log(err));
    })
  }
  
  const goToTest = (test: any) => {
    checkExamDate()
    .then(() => 
      history.push(`/page/tutorial`)
    )
    .catch(() => 
      history.replace('/page/notice')
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
