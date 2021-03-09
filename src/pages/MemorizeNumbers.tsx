//@ts-nocheck
import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { withCookies } from "react-cookie";
import { actualizarDatosUsuarioTesteadoPorNroDocumentoYAntecedente } from "../utils/db";
import "./MemorizeNumbers.css";
import _ from "lodash";
import NumberBoard from "../components/NumberBoard";

const btnsInitialState = [
  {
    num: 0,
  },
  {
    num: 1,
  },
  {
    num: 2,
  },
  {
    num: 3,
  },
  {
    num: 4,
  },
  {
    num: 5,
  },
  {
    num: 6,
  },
  {
    num: 7,
  },
  {
    num: 8,
  },
  {
    num: 9,
  },
];

const defaultState = {
  round: 0,
  mensaje: "",
  numerosAElegir: [[], [], [], []],
  turnoUsuario: false,
  numerosElegidos: [[], [], [], []],
  roundFinished: false,
  showButtons: false,
  btns: btnsInitialState.map((v) => ({ ...v })),
};

const isNumber = (n) =>
  !isNaN(parseFloat(n)) && isFinite(n);

const MemorizeNumbers: React.FC = (props: any) => {
  const [state, setState] = useState<any>({ ..._.cloneDeep(defaultState) });
  const history = useHistory();

  const randomNumber = () => Math.floor(Math.random() * (9 - 0) + 0);

  useEffect(() => {
    setState((state: any) => ({
      ...state,
      ..._.cloneDeep(defaultState),
      mensaje: "Atención",
      round: 1,
    }));
  }, []);

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
        if (round === 3) {
          rotationInterval = window.setTimeout(() => {
            const { cookies } = props;
            const categoria = cookies.get("categoria");
            const usuarioTesteado = cookies.get("usuario_testeado");
            const { nroDocumento, idAntecedente } = usuarioTesteado;
            const { numerosAElegir, numerosElegidos } = state;

            const examen = {
              examenes: {
                [categoria]: {
                  psiquica: {
                    "memorizar numeros": { numerosAElegir, numerosElegidos },
                    fecha: new Date(),
                  },
                },
              },
            };

            actualizarDatosUsuarioTesteadoPorNroDocumentoYAntecedente(
              nroDocumento,
              "cedula",
              idAntecedente,
              examen
            )
              .then((result) => {
                setState((state: any) => ({
                  ...state,
                  ..._.cloneDeep(defaultState),
                }));
                history.replace("/page/instrucciones", {
                  type: "psiquica",
                  test: "test-colores",
                });
              })
              .catch((error: any) => {
                console.log(error);
              });
          }, 300);
        } else {
          round++;

          rotationInterval = window.setTimeout(() => {
            setState((state: any) => ({
              ..._.cloneDeep(defaultState),
              mensaje: "Atención",
              round,
              numerosAElegir: [...state.numerosAElegir],
              turnoUsuario: false,
              numerosElegidos: [...state.numerosElegidos],
              btns: btnsInitialState.map((v) => ({ ...v })),
            }));
          }, 2000);
        }
      } else {
        if (round >= 1 && round <= 3) {
          if (mensaje === "Atención") {
            rotationInterval = window.setTimeout(() => {
              setState((state: any) => ({ ...state, mensaje: "" }));
            }, 2000);
          } else if (
            mensaje === "" &&
            numerosAElegir[round - 1].length < round + 1
          ) {
            let randNum: any = randomNumber().toString();

            while (
              numerosAElegir[round - 1].findIndex((n: any) => n == randNum) !==
              -1
            ) {
              randNum = randomNumber().toString();
            }

            numerosAElegir[round - 1].push(randNum);
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
          } else if (numerosAElegir[round - 1].length === round + 1) {
            setState((state: any) => ({
              ...state,
              mensaje: "Tu turno",
              turnoUsuario: true,
              showButtons: true,
            }));
          }
        }
      }
    } else {
      if (!showButtons) {
        rotationInterval = window.setTimeout(() => {
          setState((state: any) => ({ ...state, showButtons: true }));
        }, 2000);
      } else if (
        numerosAElegir[round - 1].length === numerosElegidos[round - 1].length
      ) {
        const mensaje =
          numerosAElegir[round - 1].join("") ===
          numerosElegidos[round - 1].join("")
            ? "Correcto"
            : "Incorrecto";

        rotationInterval = window.setTimeout(() => {
          setState((state: any) => ({
            ...state,
            mensaje,
            turnoUsuario: false,
            roundFinished: true,
            showButtons: false,
          }));
        }, 300);
      }
    }
    return () => {
      clearTimeout(rotationInterval);
    };
  }, [state]);

  const empezar = () =>
    setState((state: any) => ({ ...state, mensaje: "Atención", round: 1 }));

  const { round, mensaje } = state;

  const pickNumber = (number: any) => {
    let { numerosElegidos, numerosAElegir, btns } = state;

    btns[number].color = "alert";

    if (numerosElegidos[round - 1].length < numerosAElegir[round - 1].length) {
      numerosElegidos[round - 1].push(number);

      setState((state: any) => ({ ...state, numerosElegidos, btns }));
    }
  };

  const claseDeMensaje = (mensaje: any) => {
    let result;

    if (parseInt(mensaje, 10) || parseInt(mensaje, 10) === 0) {
      result = "elemento-grande ";
    } else {
      result = "elemento-chico";

      if (mensaje === "Atención") {
        result += " atencion";
      }
    }

    return result;
  };

  const { btns, showButtons } = state;

  return (
    <IonPage id="memorize-numbers">
      <IonHeader>
        <IonToolbar color="alert">
          <IonTitle className="ion-text-uppercase ion-text-center title">
            prueba psiquica
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="display-container">
          <div className="number-display">
            {!isNumber(mensaje) &&
              <p className={claseDeMensaje(mensaje)}>{mensaje}</p>
            }
          </div>
        </div>
        <div className="grid">
          {showButtons && <NumberBoard btns={btns} pickNumber={pickNumber} />}
          {isNumber(mensaje) && 
            <div className="display-container">
              <div className="number-display">
                <p className={claseDeMensaje(mensaje)}>{mensaje}</p>
              </div>
            </div>
          }
        </div>
      </IonContent>
    </IonPage>
  );
};

export default withCookies(MemorizeNumbers);
