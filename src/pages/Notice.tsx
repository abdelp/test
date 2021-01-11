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
import { useHistory } from 'react-router-dom';
import { useCookies } from "react-cookie";

import './Notice.css';

const NoticePage: React.FC = (props: any) => {
  const [cookies, setCookie] = useCookies(["usuario"]);
  const { categoria, usuario_testeado: { ci } } = cookies;

  // console.log(categoria);
  // console.log(usuario_testeado);

  console.log(props.location.state);

  const {fechaExamen, fechaHabilitacion, tipoExamen } = props.location.state;
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
            <IonLabel className="ion-text-wrap">La persona con CI <strong>{ci}</strong> ha realizado el examen <strong>{tipoExamen}</strong> para la categoría <strong>{categoria}</strong> en fecha <strong>{fechaExamen}</strong> y necesita aguardar 30 días para poder volver a realizarlo
            Fecha habilitada para volver a tomar el examen: <strong>{fechaHabilitacion}</strong></IonLabel>
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
