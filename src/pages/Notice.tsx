import {
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import { heart, trash, star, archive, ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

import './Notice.css';

const NoticePage: React.FC = () => {
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
          <IonTitle>Examen no habilitado</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent id="test-finished-content" fullscreen>
        <h1>Lo sentimos, el examen no se encuentra habilitado</h1>
        <br/>
        <IonList>
          <IonItem>
            <IonLabel>La persona con CI 4.484.595, ha realizado el examen en fecha 28/12/2020 y necesita aguardar 30 días para poder volver a realizarlo, 28/01/2021</IonLabel>
          </IonItem>
          <IonItem>
            <IonButton onClick={returnMenu} size="default" className="confirm-btn">Pagina principal</IonButton>
          </IonItem>
        </IonList>
      </IonContent>
  </IonPage>
  );
};

export default NoticePage;
