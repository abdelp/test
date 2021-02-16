import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg,
  IonButton,
} from "@ionic/react";
import { withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import { actualizarDatosUsuarioTesteadoPorNroDocumentoYAntecedente } from "../utils/db";
import "./BiggerNumber.css";
import { compose } from "recompose";
import correctSymbol from "../assets/correcto.svg";
import incorrectSymbol from "../assets/incorrecto.svg";

const defaultTime = {
  min: 0,
  sec: 30,
};

const defaultQuestionTime = {
  min: 0,
  sec: 3,
};

const BiggerNumber: React.FC = (props: any) => {
  const [time, setTime] = useState<any>({ ...defaultTime });
  const [questionTime, setQuestionTime] = useState<any>({
    ...defaultQuestionTime,
  });
  const [results, setResults] = useState<any>([]);
  const [round, setRound] = useState<any>(0);
  const [isActive] = useState(true);
  const [numbersToDisplay, setNumbersToDisplay] = useState<any>([]);
  const [showCorrectSymbol, setShowCorrectSymbol] = useState<any>(false);
  const [showIncorrectSymbol, setShowIncorrectSymbol] = useState<any>(false);

  useEffect(() => {
    if (round === 0) {
      setRound((state: any) => state + 1);
      nextSetOfNumbers();
    }
  });

  /* timer effect */

  useEffect(() => {
    let interval: any = null;
    const { history } = props;

    if (isActive) {
      interval = setInterval(() => {
        const { sec, min } = time;

        if (sec > 0) {
          setTime((state: any) => ({ ...state, sec: state.sec - 1 }));
        }

        if (sec === 0) {
          if (min === 0) {
            const { cookies } = props;

            const ticket = cookies.get("ticket");
            const categoria = cookies.get("categoria");
            const usuarioTesteado = cookies.get("usuario_testeado");
            const { nroDocumento, idAntecedente } = usuarioTesteado;

            const examen = {
              examenes: {
                [categoria]: {
                  psiquica: {
                    "numero-grande": results,
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
              .then(() => {
                history.replace("/page/instrucciones", {
                  type: "psiquica",
                  test: "posiciones-bloques",
                });
              })
              .catch((error: any) => {
                console.log(error);
              });
          } else {
            setTime((state: any) => ({
              min: state.min - 1,
              sec: 59,
            }));
          }
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, time]);

  useEffect(() => {
    let questionInterval: any = null;

    if (isActive) {
      questionInterval = setInterval(() => {
        setShowCorrectSymbol(false);
        setShowIncorrectSymbol(false);
        const { sec, min } = questionTime;

        if (sec > 0) {
          setQuestionTime((state: any) => ({ ...state, sec: state.sec - 1 }));
        }

        if (sec <= 0) {
          if (min === 0) {
            checkAnswer(-1);
          } else {
            setTime((state: any) => ({
              min: state.min - 1,
              sec: 59,
            }));
          }
        }
      }, 1000);
    }

    return () => {
      clearInterval(questionInterval);
    };
  }, [isActive, questionTime]);

  const randomNumber = (length: any) =>
    Math.floor(Math.random() * (length - 0) + 0);

  const nextSetOfNumbers = () => {
    const numbers = Array.from(Array(10).keys());
    const firstIdx = randomNumber(9);
    const firstNumber = numbers.splice(firstIdx, 1)[0];
    const secondIdx: any = randomNumber(8);
    const secondNumber = numbers.splice(secondIdx, 1)[0];
    const classes = ["numero-grande", "numero-chico"];
    const firstIdxClass = randomNumber(2);

    const firstClass = classes.splice(firstIdxClass, 1)[0];

    const secondClass = classes[0];

    setResults((state: any) => [
      ...state,
      {
        numeros: [firstNumber, secondNumber],
        numeroAElegir: Math.max(firstNumber, secondNumber),
      },
    ]);

    setNumbersToDisplay([
      { number: firstNumber, class: firstClass },
      { number: secondNumber, class: secondClass },
    ]);
  };

  const checkAnswer = (userSelection: any) => {
    results[results.length - 1].respuestaUsuario = userSelection;
    setResults([...results]);

    const resultado =
      results[results.length - 1].numeroAElegir === userSelection;

    setShowCorrectSymbol(resultado);
    setShowIncorrectSymbol(!resultado);
    setQuestionTime({ ...defaultQuestionTime });

    setRound((state: any) => state + 1);

    setTimeout(() => {
      nextSetOfNumbers();
    }, 1000);
  };

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
        <div className="grilla">
          <div className="numbers-container">
            {numbersToDisplay.map((n: any) => {
              return (
                <IonButton
                  key={n.number}
                  onClick={() => checkAnswer(n.number)}
                  className={n.class}
                  disabled={showCorrectSymbol || showIncorrectSymbol}
                >
                  {n.number}
                </IonButton>
              );
            })}
          </div>
          <div
            className="floating-result"
            style={{
              position: "absolute",
              right: 0,
              left: 0,
              width: "30vw",
              margin: "0 auto",
            }}
          >
            {showCorrectSymbol && <IonImg src={correctSymbol} />}
            {showIncorrectSymbol && <IonImg src={incorrectSymbol} />}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default compose(withRouter, withCookies)(BiggerNumber);
