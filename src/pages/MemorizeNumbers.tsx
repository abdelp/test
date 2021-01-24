import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonAlert
} from '@ionic/react';
// import Timer from './Timer';
import { useHistory } from 'react-router-dom';
// import { getPreguntasSenhales } from '../APIs';
import { set } from 'idb-keyval';
// import { sendResult } from '../APIs';
// import { updateUserTest } from '../utils/db';
import { withCookies, Cookies } from 'react-cookie';
import './MemorizeNumbers.css';
// import { setMaxListeners } from 'process';

const btnsInitialState = [
  {
    num: 0,
    color: 'light'
  },
  {
    num: 1,
    color: 'light'
  },
  {
    num: 2,
    color: 'light'
  },
  {
    num: 3,
    color: 'light'
  },
  {
    num: 4,
    color: 'light'
  },
  {
    num: 5,
    color: 'light'
  },
  {
    num: 6,
    color: 'light'
  },
  {
    num: 7,
    color: 'light'
  },
  {
    num: 8,
    color: 'light'
  },
  {
    num: 9,
    color: 'light'
  },
];

const defaultState = {
  round: 0,
  mensaje: '',
  numerosAElegir: [],
  turnoUsuario: false,
  numerosElegidos: [],
  min: 3,
  sec: 0,
  roundFinished: false,
  btns: btnsInitialState.map(v => ({...v}))
};

const MemorizeNumbers: React.FC = (props: any) => {
  const [state, setState] = useState<any>(defaultState);

  // const [iniciado, setIniciado] = useState<boolean>(false);
  // const [round, setRound] = useState<number>(0);
  // const [numerosAElegir, setNumerosAElegir] = useState<any>([]);
  // // const [bloquearBotones, setBloquearBotones] = useState<boolean>(false);
  // const [turnoUsuario, setTurnoUsuario] = useState<boolean>(false);
  // const [mensaje, setMensaje] = useState<string>('');
  // const [time, setTime] = useState<number>(2000);

  // const [selected, setSelected] = useState<string>();
  // const [questions, setQuestions] = useState<any>([]);
  // const [currentQuestion, setCurrentQuestion] = useState<any>();
  // const [questionIdx, setQuestionIdx] = useState<number>(0);
  // const [minutes, setMinutes] = useState<any>({val: 3});
  const [showTimer, setShowTimer] = useState<any>(true);
  const history = useHistory();
  // const [loading, setLoading] = useState<boolean>(false);
  let continuar: boolean = false;
  const [showAlert, setShowAlert] = useState(false);

  // const [statex, setState] = useState({min: 3, sec: 0});
  // const [isActive, setIsActive] = useState(true);

  const doSaveExamProgress = async (exam: any) =>
    await set("exam", {exam});

  const randomNumber = () =>  
    Math.floor(Math.random() * (9 - 0) + 0);

  useEffect(() => {
    const {mensaje, numerosAElegir, turnoUsuario, numerosElegidos, roundFinished, btns } = state;
    let { round } = state;
    let rotationInterval: any;

    if(!turnoUsuario) {
      if(roundFinished) {
        if(round === 4) {
          history.replace('/page/test-finished', {state: 'prueba psiquica' })
        } else {
          round++;

          rotationInterval = window.setTimeout(() => {
            setState((state: any) => ({
              ...defaultState,
              mensaje: 'Turno del ordenador',
              round,
              numerosAElegir: [],
              turnoUsuario: false,
              numerosElegidos: [],
              btns: btnsInitialState.map(v => ({...v}))
            }));
          }, 2000);
        }
      } else {
        if(round >= 1 && round <= 4) {
          if(mensaje === 'Turno del ordenador') {        
            rotationInterval = window.setTimeout(() => {
              setState((state: any) => ({...state, mensaje: '' }));
            }, 2000);
          } else if (mensaje === '' && numerosAElegir.length < round + 1) {
            const randNum: any = randomNumber().toString();
            numerosAElegir.push(randNum);
            rotationInterval = window.setTimeout(() => {
              setState((state: any) => ({...state, mensaje: randNum, numerosAElegir}));
            });
          } else if (mensaje != '' && mensaje != 'Turno del ordenador') {
            rotationInterval = window.setTimeout(() => {
              setState((state: any) => ({...state, mensaje: '' }));
            }, 2000);
          } else if (numerosAElegir.length === round + 1) {
            setState((state: any) => ({...state, mensaje: 'Tu turno', turnoUsuario: true}));
          }
        }
      }
    } else {  
      if(numerosAElegir.length === numerosElegidos.length) {
        const mensaje = numerosAElegir.join('') === numerosElegidos.join('') ? 'Correcto' : 'Incorrecto';

        setState((state: any) => ({...state, mensaje, turnoUsuario: false, roundFinished: true }));
      }
    }
    return () => {
      clearTimeout(rotationInterval)
    }
  }, [state]);

  const empezar = () =>
    setState((state: any) => ({...state, mensaje: 'Turno del ordenador', round: 1}));

  const { round, mensaje } = state;

  const pickNumber = (number: any) => {
    let { numerosElegidos, numerosAElegir, btns } = state;
  
    btns[number].color = 'success';

    if(numerosElegidos.length < numerosAElegir.length) {
      numerosElegidos.push(number);

      setState((state: any) => ({...state, numerosElegidos, btns}));
    }
  };

  const { min, sec, btns } = state;

  console.log(mensaje);
  console.log(state.mensaje);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="alert">
          <IonTitle className="ion-text-uppercase ion-text-center title">prueba psiquica</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            cssClass='my-custom-class'
            header={'Confirmación'}
            message={'No has seleccionado ninguna opción. ¿Estás segurdo que deseas continuar?'}
            buttons={[
              {
                text: 'Cancelar',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                  console.log('Cancelado');
                }
              },
              {
                text: 'Ok',
                handler: () => {
                  continuar = true;
                  // nextQuestion();
                }
              }
            ]}
          />
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{textAlign: 'center', display: 'flex', flexDirection: 'column'}}>
              {btns.slice(0, 5).map((b: any) => {
                return <IonButton
                  key={b.num}
                  className="number-btn"
                  color={b.color}
                  onClick={() => pickNumber(b.num)}
                  disabled={mensaje !== 'Tu turno' ? true : false}
                >
                    {b.num}
                  </IonButton>
              }
              )}
            </div>
            <div className="display-container">
              <div className="number-display">
                <p>
                { mensaje }
                </p>
              </div>
            </div>
            <div style={{textAlign: 'center', display: 'flex', flexDirection: 'column'}}>
              {btns.slice(5).map((b: any) => {
                return <IonButton
                  key={b.num}
                  className="number-btn"
                  color={b.color}
                  onClick={() => pickNumber(b.num)}
                  disabled={mensaje !== 'Tu turno' ? true : false}
                >
                    {b.num}
                  </IonButton>
              }
              )}
          </div>
        </div>

          {/* <IonItem lines="none">
            Tiempo restante: <Timer min={min} sec={sec}></Timer>
          </IonItem> */}

          <div className="btn-container">
            {!round &&
              <IonButton color="primary" onClick={empezar}>
                empezar
              </IonButton>
            }
          </div>
      </IonContent>
    </IonPage>
  );
};

export default withCookies(MemorizeNumbers);