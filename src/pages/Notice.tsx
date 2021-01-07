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

const NoticePage: React.FC = (props: any) => {
  console.log(props);
  const {ci, fechaExamen, fechaHabilitacion} = props;
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
            <IonLabel>La persona con CI ${ci} ha realizado el examen en fecha {fechaExamen} y necesita aguardar 30 días para poder volver a realizarlo
            Fecha habilitada para volver a tomar el examen: ${fechaHabilitacion}</IonLabel>
          </IonItem>
          <IonItem>
            <IonButton onClick={returnMenu} size="default" className="confirm-btn">Volver a los tests</IonButton>
          </IonItem>
        </IonList>
      </IonContent>
  </IonPage>
  );
};

export default NoticePage;
