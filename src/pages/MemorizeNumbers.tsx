import React, { useState, useEffect, useRef } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonRadioGroup,
  IonListHeader,
  IonLabel,
  IonItem,
  IonRadio,
  IonButton,
  IonImg,
  IonSpinner,
  IonAlert
} from '@ionic/react';
import Timer from './Timer';
import { useHistory } from 'react-router-dom';
import { getPreguntasSenhales } from '../APIs';
import { set } from 'idb-keyval';
import { sendResult } from '../APIs';
import { updateUserTestDate } from '../utils/db';
import { withCookies, Cookies } from 'react-cookie';
import './MemorizeNumbers.css';
import { setMaxListeners } from 'process';

const defaultState = {
  round: 0,
  mensaje: '',
  numerosAElegir: [],
  turnoUsuario: false,
  numerosElegidos: [],
  min: 3,
  sec: 0,
  roundFinished: false
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

  async function doSaveExamProgress(exam: any) {
    await set("exam", {exam});
  }

  // useEffect(() => {
  //   const ticket = props.cookies.get('ticket');
  //   const categoria = props.cookies.get('ticket');
  //   const usuarioTesteado = props.cookies.get('usuario_testeado');
  //   const { ci } = usuarioTesteado;

  //   updateUserTestDate(ci, categoria, 'multiple options')
  //   .then(result => {
  //     console.log(result);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });

  //   getPreguntasSenhales()
  //   .then((result: any) => {
  //     setSelected('');
  //     setQuestions(result);
  //     setCurrentQuestion(result[questionIdx]);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  // }, []);

  // useEffect(() => {
  //   let interval: any = null;

  //   if (isActive) {
  //     interval = setInterval(() => {
  //       const { sec, min } = statex;

  //       if (sec > 0) {
  //         setState(state => ({...state,
  //           sec: state.sec - 1
  //           }));
  //       }

  //       if (sec === 0) {
  //         if (min === 0) {
  //           history.replace('/page/time-out');
  //         } else {
  //           setState(state => ({
  //             min: state.min - 1,
  //             sec: 59
  //           }))
  //         }
  //       } 

  //     }, 1000);
  //   }

  //   return () => {
  //     clearInterval(interval);
  //   }
  // }, [isActive, statex]);

  // const { min, sec } = statex;
  function randomNumber() {  
    return Math.floor(Math.random() * (9 - 0) + 0); 
  }
  
  useEffect(() => {
    const {mensaje, numerosAElegir, turnoUsuario, numerosElegidos, roundFinished} = state;
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
              numerosElegidos: []
            }));
          }, 2000);
        }
      } else {
        if(round === 1) {
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
        else if(round === 2) {
          if(mensaje === 'Turno del ordenador') {        
            rotationInterval = window.setTimeout(() => {
              setState((state: any) => ({...state, mensaje: '' }))
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
            console.log(numerosAElegir);
            console.log(state);
            setState((state: any) => ({...state, mensaje: 'Tu turno', turnoUsuario: true}));
          }
        }
        else if(round === 3) {
          if(mensaje === 'Turno del ordenador') {        
            rotationInterval = window.setTimeout(() => {
              setState((state: any) => ({...state, mensaje: '' }))
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
            console.log(numerosAElegir);
            console.log(state);
            setState((state: any) => ({...state, mensaje: 'Tu turno', turnoUsuario: true}));
          }
        }
        else if(round === 4) {
          if(mensaje === 'Turno del ordenador') {        
            rotationInterval = window.setTimeout(() => {
              setState((state: any) => ({...state, mensaje: '' }))
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
            console.log(numerosAElegir);
            console.log(state);
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
    //Cleanup can be done like this
    return () => {
      clearTimeout(rotationInterval)
    }
  }, [state]);

  const empezar = () => {
    setState((state: any) => ({...state, mensaje: 'Turno del ordenador', round: 1}));
  }

  const { round, mensaje } = state;

  const pickNumber = (number: any) => {
    let { numerosElegidos, numerosAElegir } = state;

    if(numerosElegidos.length < numerosAElegir.length) {
      numerosElegidos.push(number);
  
      setState((state: any) => ({...state, numerosElegidos}));
    }
  };

  const { min, sec } = state;

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
            <div style={{textAlign: 'center'}}>
            <IonButton className="number-btn" onClick={() => pickNumber("0")}>
              0
            </IonButton>
            <IonButton className="number-btn" onClick={() => pickNumber("1")}>
              1
            </IonButton>
            <IonButton className="number-btn" onClick={() => pickNumber("2")}>
              2
            </IonButton>
            <IonButton className="number-btn" onClick={() => pickNumber("3")}>
              3
            </IonButton>
            <IonButton className="number-btn" onClick={() => pickNumber("4")}>
              4
            </IonButton>
            <IonButton className="number-btn" onClick={() => pickNumber("5")}>
              5
            </IonButton>
            <IonButton className="number-btn" onClick={() => pickNumber("6")}>
              6
            </IonButton>
            <IonButton className="number-btn" onClick={() => pickNumber("7")}>
              7
            </IonButton>
            <IonButton className="number-btn" onClick={() => pickNumber("8")}>
              8
            </IonButton>
            <IonButton className="number-btn" onClick={() => pickNumber("9")}>
              9
            </IonButton>
          </div>

          <div className="display-container">
            <div className="number-display">
              <p>
              { mensaje }
              </p>
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