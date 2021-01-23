import {
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router-dom';

import './TimeOut.css';

const TimeOutPage: React.FC = () => {
  const history = useHistory();

  const returnMenu = () => {
    history.push('/page/test-types');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="favorite">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="ion-text-center">Test finalizado</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent id="test-finished-content" fullscreen>
        <h1>Se ha terminado el tiempo :(</h1>
        <br/>
        <IonButton color="favorite" onClick={returnMenu}>Pagina principal</IonButton>
      </IonContent>
  </IonPage>
  );
};

export default TimeOutPage;
