import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonImg,
} from "@ionic/react";
import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./Instructions.css";
import instruccionesPruebaTeorica from "../assets/instrucciones_prueba_teorica.svg";
import instruccionesPruebaMemorizarNumeros from "../assets/instrucciones_prueba_psiquica_memorizar_numeros.svg";
import instruccionesPruebaColores from "../assets/instrucciones_prueba_psiquica_colores.svg";
import instruccionesPruebaNumerosGrandes from "../assets/instrucciones_prueba_psiquica_numeros_grandes.svg";
import instruccionesPruebaDirecciones from "../assets/instrucciones_prueba_psiquica_direcciones.svg";
import instruccionesPruebaPosicionesBloques from "../assets/instrucciones_prueba_psiquica_posiciones_bloques.svg";
import confirmarBtn from "../assets/confirmar_btn.svg";

const InstructionsPage: React.FC = (props: any) => {
  const { categoria, test, type } = props.location.state || "";

  let [showSkip, setSkip] = useState(true);
  let [state, setState] = useState({ color: "success" });
  let backgroundImg;

  const slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  const slider = useRef<HTMLIonSlidesElement>(null);

  useEffect(() => {
    slider.current?.slideTo(0);
  }, []);

  const history = useHistory();

  const startTest = () => {
    let page = "";

    if (type === "teórica") {
      page = "multiple-options";
    } else if (type === "psiquica") {
      page = test;
    }

    history.replace({
      pathname: `/page/${page}`,
      state: "",
    });
  };

  const getHeaderColor = (type: any) => {
    let color;

    switch (type) {
      case "teórica":
        color = "light-blue";
        backgroundImg = instruccionesPruebaTeorica;
        break;
      case "psiquica":
        color = "alert";

        switch (test) {
          case "memorize-numbers":
            backgroundImg = instruccionesPruebaMemorizarNumeros;
            break;
          case "test-colores":
            backgroundImg = instruccionesPruebaColores;
            break;
          case "test-direcciones":
            backgroundImg = instruccionesPruebaDirecciones;
            break;
          case "numeros-grandes":
            backgroundImg = instruccionesPruebaNumerosGrandes;
            break;
          case "posiciones-bloques":
            backgroundImg = instruccionesPruebaPosicionesBloques;
            break;
        }

        break;
      default:
        color = "success";
    }

    return color;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={getHeaderColor(type)}>
          <IonTitle className="ion-text-center title ion-text-capitalize">
            Prueba {type}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonItem lines="none">
          <IonImg
            src={backgroundImg}
            style={{ maxWidth: "100%", width: "100%" }}
          />
        </IonItem>
        <IonButton
          onClick={startTest}
          color="none"
          className="confirmar-btn"
          size="large"
        >
          CONFIRMAR
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default InstructionsPage;
