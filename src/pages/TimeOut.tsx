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
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Test finalizado</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent id="test-finished-content" fullscreen>
        <h1>Se ha terminado el tiempo :(</h1>
        <br/>
        <IonButton onClick={returnMenu}>Pagina principal</IonButton>
      </IonContent>
  </IonPage>
  );
};

export default TimeOutPage;
