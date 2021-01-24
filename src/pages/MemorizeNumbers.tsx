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
import { sendResult } from '../APIs';
import { updateUserTest } from '../utils/db';
import './MemorizeNumbers.css';
import { debug } from 'console';
// import { setMaxListeners } from 'process';

const btnsInitialState = [
  {
    num: 0
  },
  {
    num: 1
  },
  {
    num: 2
  },
  {
    num: 3
  },
  {
    num: 4
  },
  {
    num: 5
  },
  {
    num: 6
  },
  {
    num: 7
  },
  {
    num: 8
  },
  {
    num: 9
  },
];

const defaultState = {
  round: 0,
  mensaje: '',
  numerosAElegir: [[],[],[],[]],
  turnoUsuario: false,
  numerosElegidos: [[],[],[],[]],
  min: 3,
  sec: 0,
  roundFinished: false,
  showButtons: false,
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

          /*
           * Poner webservice
           */

          const { cookies } = props;

          const ticket = cookies.get('ticket');
          const categoria = cookies.get('ticket');
          const usuarioTesteado = cookies.get('usuario_testeado');
          const { cedula } = usuarioTesteado;

          // updateUserTest(cedula, categoria, "teorica", questions)
          // .then(result => {
          //   sendResult(ticket, cedula, resultado)
          //   .then(result => {    
          //     history.replace('/page/test-finished', { state: 'prueba psiquica' });
          //   });
          // })
          // .catch((error: any) => {
          //   // setLoading(false);
          // });

          // history.replace('/page/test-finished', {state: 'prueba psiquica' })
        } else {
          round++;

          rotationInterval = window.setTimeout(() => {
            setState((state: any) => ({
              ...defaultState,
              mensaje: 'Turno del ordenador',
              round,
              numerosAElegir: [...state.numerosAElegir],
              turnoUsuario: false,
              numerosElegidos: [...state.numerosElegidos],
              btns: btnsInitialState.map(v => ({...v}))
            }));
          }, 2000);
        }
      } else {
        if(round >= 1 && round <= 4) {
          // debug();
          if(mensaje === 'Turno del ordenador') {        
            rotationInterval = window.setTimeout(() => {
              setState((state: any) => ({...state, mensaje: '' }));
            }, 2000);
          } else if (mensaje === '' && numerosAElegir[round-1].length < round + 1) {
            let randNum: any = randomNumber().toString();

            while(numerosAElegir[round-1].findIndex((n: any) => n == randNum) != -1) {
              randNum = randomNumber().toString();
            }

            numerosAElegir[round-1].push(randNum);
            rotationInterval = window.setTimeout(() => {
              setState((state: any) => ({...state, mensaje: randNum, numerosAElegir}));
            });
          } else if (mensaje != '' && mensaje != 'Turno del ordenador') {
            rotationInterval = window.setTimeout(() => {
              setState((state: any) => ({...state, mensaje: '' }));
            }, 2000);
          } else if (numerosAElegir[round-1].length === round + 1) {
            setState((state: any) => ({...state, mensaje: 'Tu turno', turnoUsuario: true}));
          }
        }
      }
    } else {
      if (!showButtons) {
        console.log('mi turno');
        rotationInterval = window.setTimeout(() => {
            setState((state: any) => ({...state, showButtons: true }));
        }, 2000);
      } else if(numerosAElegir[round-1].length === numerosElegidos[round-1].length) {
        const mensaje = numerosAElegir[round-1].join('') === numerosElegidos[round-1].join('') ? 'Correcto' : 'Incorrecto';

        setState((state: any) => ({...state, mensaje, turnoUsuario: false, roundFinished: true, showButtons: false }));
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
  
    btns[number].color = 'alert';

    if(numerosElegidos[round-1].length < numerosAElegir[round-1].length) {
      numerosElegidos[round-1].push(number);

      setState((state: any) => ({...state, numerosElegidos, btns}));
    }
  };

  const { min, sec, btns, showButtons } = state;

  console.log(showButtons);
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
          <div className="grilla" style={{flexDirection: 'column'}}>
            <div className="number-board" style={{display: 'flex', justifyContent: 'center'}}>

              {showButtons &&
                <div className="number-column" style={{textAlign: 'center', display: 'flex', flexDirection: 'column'}}>
                  {btns.slice(0, 5).map((b: any) => {
                    return <IonButton
                      key={b.num}
                      expand="block"
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
              }

              {!showButtons &&
                <div className="display-container">
                  <div className="number-display">
                    <p>
                    { mensaje }
                    </p>
                  </div>
                </div>
              }

              {showButtons &&
              <div className="number-column" style={{textAlign: 'center', display: 'flex', flexDirection: 'column'}}>
                {btns.slice(5).map((b: any) => {
                  return <IonButton
                    key={b.num}
                    className="number-btn"
                    expand="block"
                    color={b.color}
                    onClick={() => pickNumber(b.num)}
                    disabled={mensaje !== 'Tu turno' ? true : false}
                  >
                      {b.num}
                    </IonButton>
                }
                )}
              </div>
            }
          </div>
          <div className="btn-container" style={{display: 'flex'}}>
                  {!round &&
                    <IonButton className="btn-empezar" color="favorite" onClick={empezar}>
                      empezar
                    </IonButton>
                  }
                </div>
        </div>

          {/* <IonItem lines="none">
            Tiempo restante: <Timer min={min} sec={sec}></Timer>
          </IonItem> */}

          
      </IonContent>
    </IonPage>
  );
};

export default withCookies(MemorizeNumbers);