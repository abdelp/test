import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonImg,
  IonPopover,
} from "@ionic/react";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { getExamDate } from "../APIs";
import { withCookies } from "react-cookie";
import { compose } from "recompose";
import AuthenticateFormBase from "../components/AuthenticateFormBase";

import "./TestTypes.css";

import pruebaTeoricaBtnImg from "../assets/icono-prueba-teorica.svg";
import pruebaPsiquicaBtnImg from "../assets/icono-prueba-psiquica.svg";
import pruebaPracticaBtnImg from "../assets/icono-prueba-practica.svg";
import declaracionJuradaBtnImg from "../assets/declaracion-jurada.svg";

const TestTypesPage: React.FC<any> = ({ cookies, history }) => {
  const categoria = cookies.get("categoria");
  const { ticket } = cookies.get("usuario");
  const usuario_testeado = cookies.get("usuario_testeado");
  const [showLogin, setShowLogin] = useState<any>();

  let ci = "",
    renovacion;

  if (usuario_testeado) {
    ci = usuario_testeado.ci;
    renovacion =
      usuario_testeado.tramite === "RENOVACIÓN" ||
      usuario_testeado.categoria === "EXTRANJERO";
  }

  /* extend to also use local database to check date */
  const addDays = (date: any, days: any) => {
    const copy = new Date(Number(date));
    copy.setDate(date.getDate() + days);
    return copy;
  };

  const checkExamDate = (test: any) => {
    return new Promise((resolve, reject) => {
      getExamDate({ categoria, ticket, ci, test })
        .then((result) => {
          if (result.date) {
            const fechaExamen = new Date(result.date);
            const today = new Date();
            let fechaHabilitacion = new Date();
            fechaHabilitacion = addDays(fechaExamen, 30);

            if (today >= fechaHabilitacion) {
              resolve(true);
            } else {
              resolve(false);
            }
          } else {
            resolve(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const goToTest = (test: any) => {
    const { categoria, usuario_testeado } = cookies;

    checkExamDate(test)
      .then((result) => {
        if (result) {
          if (test === "declaración jurada") {
            history.push({
              pathname: "/page/declaracion-jurada",
            });
          } else if (test === "practica") {
            setShowLogin(true);
          } else if (test === "teórica") {
            history.push({
              pathname: "/page/instrucciones",
              state: { categoria, type: test, test, usuario_testeado },
            });
          } else if (test === "psiquica") {
            history.push({
              pathname: "/page/instrucciones",
              state: {
                categoria,
                type: "psiquica",
                test: "memorize-numbers",
                usuario_testeado,
              },
            });
          }
        } else {
          history.push({
            pathname: "/page/notice",
            state: { categoria, usuario_testeado },
          });
        }
      })
      .catch(() =>
        history.push({
          pathname: "/page/notice",
          state: { categoria, usuario_testeado },
        })
      );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="favorite">
          <IonButtons slot="start">
            <IonMenuButton autoHide={false} />
          </IonButtons>
          <IonTitle className="ion-text-center title">
            {/* {categoria}*/}Pruebas
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonPopover cssClass="login-popover ion-text-center" isOpen={showLogin}>
          {/*
            //@ts-ignore */}
          <AuthenticateFormBase setShowLogin={setShowLogin} />
        </IonPopover>

        <div
          className="flex"
          style={{
            height: "100%",
            // maxHeight: '100%',
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              className="test-type-btn"
              style={{
                margin: "2em",
                width: "50%",
                maxWidth: "400px",
              }}
              onClick={() => goToTest("declaración jurada")}
            >
              <IonImg src={declaracionJuradaBtnImg} />
            </div>

            {!renovacion && (
              <div
                className="test-type-btn"
                style={{
                  margin: "2em",
                  width: "50%",
                  maxWidth: "400px",
                }}
                onClick={() => goToTest("teórica")}
              >
                <IonImg src={pruebaTeoricaBtnImg} />
              </div>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              className="test-type-btn"
              style={{
                margin: "2em",
                width: "50%",
                maxWidth: "400px",
              }}
              onClick={() => goToTest("psiquica")}
            >
              <IonImg src={pruebaPsiquicaBtnImg} />
            </div>
            {!renovacion && (
              <div
                className="test-type-btn"
                style={{
                  margin: "2em",
                  width: "50%",
                  maxWidth: "400px",
                }}
                onClick={() => goToTest("practica")}
              >
                <IonImg src={pruebaPracticaBtnImg} />
              </div>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default compose(withCookies, withRouter)(TestTypesPage);
