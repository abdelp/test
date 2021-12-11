import React, { useState, useEffect, Fragment } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonRadioGroup,
  IonButton,
  IonLabel,
  IonItem,
  IonRadio,
  IonTextarea,
  IonAlert,
  IonPopover,
  IonSpinner,
} from "@ionic/react";
import { getPracticalTestItems } from "../APIs";
import { useHistory } from "react-router-dom";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import _ from 'lodash';
import to from "await-to-js";
import { get } from "idb-keyval";
import {
  obtenerDatosUsuarioTesteadoPorNroDocumentoYAntecedente,
  actualizarDatosUsuarioTesteadoPorNroDocumentoYAntecedente,
} from "../utils/db";
import "./PracticalTest.css";

import retrovisor from '../assets/retrovisor.png';
import palancaCambio from '../assets/palanca-cambio.png';
import panel from '../assets/car-panel.png';
import acelerador from '../assets/acelerador.png';
import carrilCorrecto from '../assets/carril-correcto.png';

const opciones =
  [
    {id: 1, texto: "Ajusta el ángulo de los espejos retrovisores", img: retrovisor, elegido: false},
    {id: 2, texto: "Revisa el tablero o panel", img: panel, elegido: false},
    {id: 3, texto: "Revisa el juego libre de embrague", img: palancaCambio, elegido: false},
    {id: 4, texto: "Prueba el acelerador", img: acelerador, elegido: false},
    {id: 5, texto: "Entra al carril correcto", img: carrilCorrecto, elegido: false},
    {id: 6, texto: "Ajusta el ángulo de los espejos retrovisores", img: retrovisor, elegido: false},
    {id: 7, texto: "Revisa el tablero o panel", img: panel, elegido: false},
    {id: 8, texto: "Revisa el juego libre de embrague", img: palancaCambio, elegido: false},
    {id: 9, texto: "Prueba el acelerador", img: acelerador, elegido: false},
    {id: 10, texto: "Entra al carril correcto", img: carrilCorrecto, elegido: false},
    {id: 11, texto: "Ajusta el ángulo de los espejos retrovisores", img: retrovisor, elegido: false},
    {id: 12, texto: "Revisa el tablero o panel", img: panel, elegido: false},
    {id: 13, texto: "Revisa el juego libre de embrague", img: palancaCambio, elegido: false},
    {id: 14, texto: "Prueba el acelerador", img: acelerador, elegido: false},
    {id: 15, texto: "Entra al carril correcto", img: carrilCorrecto, elegido: false},
    {id: 16, texto: "Ajusta el ángulo de los espejos retrovisores", img: retrovisor, elegido: false},
    {id: 17, texto: "Revisa el tablero o panel", img: panel, elegido: false},
    {id: 18, texto: "Revisa el juego libre de embrague", img: palancaCambio, elegido: false},
    {id: 19, texto: "Prueba el acelerador", img: acelerador, elegido: false},
    {id: 20, texto: "Entra al carril correcto", img: carrilCorrecto, elegido: false}

  ];

const PracticalTestPage: React.FC = (props: any) => {
  const [state, setState] = useState('');

  const handleClick = (val: number) => {
    const op = opciones[opciones.findIndex(o => o.id === val)];

    op.elegido = !op.elegido;

    setState(op.texto);
  }

  useEffect(() => {
    let interval: any = null;

    if(state !== "") {
      interval = setInterval(() => {
        setState("")
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    }
  }, [state]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="orange">
          <IonTitle className="ion-text-center title">Prueba Práctica</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="option-message">
          {state}
        </div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div className='row-option' style={{display: 'flex', flexWrap: 'wrap'}}>
            {
              opciones.map(o => {
                return (
                  <IonButton className="opt-btnn" key={o.id} color={o.elegido ? 'favorite' : 'light'} onClick={() => handleClick(o.id)}>
                    <img src={o.img}/> {o.elegido}
                  </IonButton>
                )
                })
              }
          </div>
       </div>
      </IonContent>
    </IonPage>
  );
};

PracticalTestPage.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(PracticalTestPage);
