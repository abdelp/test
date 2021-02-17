import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { withCookies } from "react-cookie";
import "./LocationTest.css";

const defaultState = {
  round: 0,
  mensaje: "",
  numerosAElegir: [],
  turnoUsuario: false,
  numerosElegidos: [],
  min: 3,
  sec: 0,
  roundFinished: false,
};

const LocationTestPage: React.FC = (props: any) => {
  const [state, setState] = useState<any>(defaultState);
  const history = useHistory();
  const randomNumber = () => Math.floor(Math.random() * (9 - 0) + 0);

  useEffect(() => {
    const {
      mensaje,
      numerosAElegir,
      turnoUsuario,
      numerosElegidos,
      roundFinished,
    } = state;
    let { round } = state;
    let rotationInterval: any;

    if (!turnoUsuario) {
      if (roundFinished) {
        if (round === 4) {
          history.replace("/page/test-finished", { state: "prueba psiquica" });
        } else {
          round++;

          rotationInterval = window.setTimeout(() => {
            setState((state: any) => ({
              ...defaultState,
              mensaje: "Atención",
              round,
              numerosAElegir: [],
              turnoUsuario: false,
              numerosElegidos: [],
            }));
          }, 2000);
        }
      } else {
        if (round >= 1 && round <= 4) {
          if (mensaje === "Atención") {
            rotationInterval = window.setTimeout(() => {
              setState((state: any) => ({ ...state, mensaje: "" }));
            }, 2000);
          } else if (mensaje === "" && numerosAElegir.length < round + 1) {
            const randNum: any = randomNumber().toString();
            numerosAElegir.push(randNum);
            rotationInterval = window.setTimeout(() => {
              setState((state: any) => ({
                ...state,
                mensaje: randNum,
                numerosAElegir,
              }));
            });
          } else if (mensaje !== "" && mensaje !== "Atención") {
            rotationInterval = window.setTimeout(() => {
              setState((state: any) => ({ ...state, mensaje: "" }));
            }, 2000);
          } else if (numerosAElegir.length === round + 1) {
            setState((state: any) => ({
              ...state,
              mensaje: "Tu turno",
              turnoUsuario: true,
            }));
          }
        }
      }
    } else {
      if (numerosAElegir.length === numerosElegidos.length) {
        const mensaje =
          numerosAElegir.join("") === numerosElegidos.join("")
            ? "Correcto"
            : "Incorrecto";

        setState((state: any) => ({
          ...state,
          mensaje,
          turnoUsuario: false,
          roundFinished: true,
        }));
      }
    }
    return () => {
      clearTimeout(rotationInterval);
    };
  }, [state]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="alert">
          <IonTitle className="ion-text-uppercase ion-text-center title">
            prueba psiquica
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="main-container">
          <div className="row ion-text-center">
            <IonButton>Arriba</IonButton>
          </div>
          <div className="row middle">
            <div className="btn-container">
              <IonButton>Izquierda</IonButton>
            </div>
            <div className="text-container">
              <IonItem></IonItem>
            </div>
            <div className="btn-container">
              <IonButton>Derecha</IonButton>
            </div>
          </div>
          <div className="row ion-text-center">
            <IonButton>Abajo</IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default withCookies(LocationTestPage);
