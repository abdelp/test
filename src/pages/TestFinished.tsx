import {
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSlides,
  IonSlide,
  IonList,
  IonItemSliding,
  IonItem,
  IonLabel,
  IonItemOptions,
  IonItemOption,
  IonIcon,
  IonNote,
  IonBackButton
} from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import { heart, trash, star, archive, ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

import './TestFinished.css';

const TestFinishedPage: React.FC = () => {
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
        <h1>El test ha finalizado</h1>
        <br/>
        <IonList>
            <IonItem>
              <IonLabel><strong>Correctas:</strong> 10/20</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel><strong>Porcentaje:</strong> 50%</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel><strong>No respondidas:</strong> 3/20</IonLabel>
            </IonItem>
            <IonItem>
              <IonButton onClick={returnMenu} size="default" className="confirm-btn">Volver a los tests</IonButton>
            </IonItem>
          </IonList>
      </IonContent>
  </IonPage>
  );
};

export default TestFinishedPage;
