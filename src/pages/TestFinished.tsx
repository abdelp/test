import {
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg,
} from "@ionic/react";
import React from "react";
import { useHistory } from "react-router-dom";
import "./TestFinished.css";
import successImg from "../assets/green-checkmark.svg";

const TestFinishedPage: React.FC = (props) => {
  const history = useHistory();

  const returnMenu = () =>
    history.replace("/page/test-types");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="favorite">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="ion-text-center title">Test finalizado</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent id="test-finished-content" fullscreen>
        <div className="grilla">
          <IonImg src={successImg} style={{ width: "20vw" }} />
          <h4 className="texto-finalizado">PRUEBA FINALIZADA</h4>
          <IonButton
            onClick={returnMenu}
            size="large"
            className="confirm-btn confirmar-btn"
            color="favorite"
            style={{ margin: "3vh auto" }}
          >
            aceptar
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TestFinishedPage;
