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
import { updateUserTest, actualizarDatosUsuarioTesteadoPorNroDocumento } from '../utils/db';
import './MemorizeNumbers.css';
import { debug } from 'console';
import _ from 'lodash';
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
  // min: 0,
  // sec: 5,
  roundFinished: false,
  showButtons: false,
  btns: btnsInitialState.map(v => ({...v}))
};

const MemorizeNumbers: React.FC = (props: any) => {
  const [state, setState] = useState<any>({..._.cloneDeep(defaultState)});
  const [showTimer, setShowTimer] = useState<any>(true);
  const history = useHistory();
  let continuar: boolean = false;
  const [showAlert, setShowAlert] = useState(false);

  const doSaveExamProgress = async (exam: any) =>
    await set("exam", {exam});

  const randomNumber = () =>  
    Math.floor(Math.random() * (9 - 0) + 0);
    
  useEffect(() => {
    setState((state: any) => ({...state, ..._.cloneDeep(defaultState)}));
  }, []);

  useEffect(() => {
    const {mensaje, numerosAElegir, turnoUsuario, numerosElegidos, roundFinished, btns } = state;
    let { round } = state;
    let rotationInterval: any;

    if(!turnoUsuario) {
      if(roundFinished) {
        if(round === 3) {
          rotationInterval = window.setTimeout(() => {
            const { cookies } = props;
            const ticket = cookies.get('ticket');
            const categoria = cookies.get('categoria');
            const usuarioTesteado = cookies.get('usuario_testeado');
            const { nroDocumento } = usuarioTesteado;
            const { numerosAElegir, numerosElegidos } = state;

            const examen = {
              examenes: {
                [categoria]: {
                  "psiquica": {
                    "memorizar numeros": {numerosAElegir, numerosElegidos},
                    fecha: new Date()
                  }
                }
              }
            };

            actualizarDatosUsuarioTesteadoPorNroDocumento(nroDocumento, examen)
            .then(result => {
              sendResult('x', 'firma', 1, true)
              .then(result => {
                setState((state: any) => ({...state, ..._.cloneDeep(defaultState)}));

                history.replace('/page/instrucciones', {type: 'psiquica', test: 'test-colores'});
              })
              .catch((error: any) => console.log(error));
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
              mensaje: 'Atención',
              round,
              numerosAElegir: [...state.numerosAElegir],
              turnoUsuario: false,
              numerosElegidos: [...state.numerosElegidos],
              btns: btnsInitialState.map(v => ({...v}))
            }));
          }, 2000);
        }
      } else {
        if(round >= 1 && round <= 3) {
          if(mensaje === 'Atención') {        
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
          } else if (mensaje != '' && mensaje != 'Atención') {
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
        rotationInterval = window.setTimeout(() => {
            setState((state: any) => ({...state, showButtons: true }));
        }, 2000);
      } else if(numerosAElegir[round-1].length === numerosElegidos[round-1].length) {
        const mensaje = numerosAElegir[round-1].join('') === numerosElegidos[round-1].join('') ? 'Correcto' : 'Incorrecto';

        rotationInterval = window.setTimeout(() => {
          setState((state: any) => ({...state, mensaje, turnoUsuario: false, roundFinished: true, showButtons: false }));
        }, 300);
      }
    }
    return () => {
      clearTimeout(rotationInterval)
    }
  }, [state]);

  const empezar = () =>
    setState((state: any) => ({...state, mensaje: 'Atención', round: 1}));

  const { round, mensaje } = state;

  const pickNumber = (number: any) => {
    let { numerosElegidos, numerosAElegir, btns } = state;
  
    btns[number].color = 'alert';

    if(numerosElegidos[round-1].length < numerosAElegir[round-1].length) {
      numerosElegidos[round-1].push(number);

      setState((state: any) => ({...state, numerosElegidos, btns}));
    }
  };

  const claseDeMensaje = (mensaje: any) => {
    let result;
  
    if (parseInt(mensaje, 10) || parseInt(mensaje, 10) === 0) {
      result = 'elemento-grande ';
    } else {
      result = 'elemento-chico';

      if (mensaje === 'Atención') {
        result += ' atencion';
      }
    }

    return result;
  };

  const { min, sec, btns, showButtons } = state;

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
            <div className="number-board" style={{display: 'flex', justifyContent: 'center', margin: 'auto'}}>

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
                    <p
                      className={claseDeMensaje(mensaje)}>
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
              <IonButton className="btn-empezar" color="favorite" onClick={empezar} style={{margin: '-40vh auto auto auto'}}>
                empezar
              </IonButton>
            }
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default withCookies(MemorizeNumbers);