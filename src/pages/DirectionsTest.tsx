import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonImg,
  IonButton
} from '@ionic/react';
import { useHistory, withRouter } from 'react-router-dom';
import { set } from 'idb-keyval';
import { sendResult } from '../APIs';
import { withCookies, Cookies } from 'react-cookie';
import { updateUserTest, actualizarDatosUsuarioTesteadoPorCedula } from '../utils/db';
import './DirectionsTest.css';
import { debug } from 'console';
import { compose } from 'recompose';
import correctSymbol from '../assets/correcto.svg';
import incorrectSymbol from '../assets/incorrecto.svg';
// import { setMaxListeners } from 'process';

const directions = [ 'arriba', 'izquierda', 'derecha', 'abajo' ];

const defaultTime = {
  min: 0,
  sec: 10
};

const defaultQuestionTime = {
  min: 0,
  sec: 3
};

const DirectionsTest: React.FC = (props: any) => {
  const [time, setTime] = useState<any>({...defaultTime});
  const [questionTime, setQuestionTime] = useState<any>({...defaultQuestionTime});
  const [results, setResults] = useState<any>([]);
  const [round, setRound] = useState<any>(0); // or probably one
  const [isActive, setIsActive] = useState(true);
  const [message, setMessage] = useState<any>();
  const [showCorrectSymbol, setShowCorrectSymbol] = useState<any>(false);
  const [showIncorrectSymbol, setShowIncorrectSymbol] = useState<any>(false);
  
  useEffect(() => {
    if(round === 0) {
      setRound((state: any) => state + 1);
      nextDirection();
    }
  });

  useEffect(() => {
    let interval: any = null;
    const { history } = props;

    if (isActive) {
      interval = setInterval(() => {
        const { sec, min } = time;

        if (sec > 0) {
          setTime((state: any) => ({...state,
            sec: state.sec - 1
          }));
        }

        if (sec === 0) {
          if (min === 0) {
            const { cookies } = props;

            const ticket = cookies.get('ticket');
            const categoria = cookies.get('categoria');
            const usuarioTesteado = cookies.get('usuario_testeado');
            const { cedula } = usuarioTesteado;
  
            const examen = {
              examenes: {
                [categoria]: {
                  "psiquica": {
                    "test-direcciones": results,
                    fecha: new Date()
                  }
                }
              }
            };
  
            actualizarDatosUsuarioTesteadoPorCedula(cedula, examen)
            .then(result => {
              sendResult(ticket, cedula, 100)
              .then(result => {    
                history.replace('/page/test-finished', { state: 'prueba psiquica' });
              })
              .catch((error: any) => console.log(error));
            })
            .catch((error: any) => {
              console.log(error);
            });
          } else {
            setTime((state: any) => ({
              min: state.min - 1,
              sec: 59
            }))
          }
        } 
        
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    }
  }, [isActive, time]);

  useEffect(() => {
    let questionInterval: any = null;

    if (isActive) {      
      questionInterval = setInterval(() => {
        setShowCorrectSymbol(false);
        setShowIncorrectSymbol(false);
        const { sec, min } = questionTime;

        if (sec > 0) {
          setQuestionTime((state: any) => ({...state,
            sec: state.sec - 1
            }));
        }

        if (sec <= 0) {
          if (min === 0) {
            checkAnswer(-1);
          } else {
            setTime((state: any) => ({
              min: state.min - 1,
              sec: 59
            }))
          }
        } 

      }, 1000);
    }

    return () => {
      clearInterval(questionInterval);
    }
  }, [isActive, questionTime]);

  const randomNumber = () =>  
    Math.floor(Math.random() * (directions.length - 1 - 0) + 0);

  const nextDirection = () =>{
    const directionIdx = randomNumber();

    setMessage(directions[directionIdx]);

    setResults((state: any) => ([...state,
      {
        direccionAelegir: directions[directionIdx],
        indiceAElegir: directionIdx
      }]));
  }

  const checkAnswer = (answer: any) => {
    results[results.length - 1].respuestaUsuario = answer;
    setResults([...results]);

    const resultado = 
    ((results[results.length - 1].indiceAElegir === results[results.length - 1].respuestaUsuario));
    
    setShowCorrectSymbol(resultado);
    setShowIncorrectSymbol(!resultado);
    setQuestionTime({...defaultQuestionTime});

    setRound((state: any) => state + 1);

    setTimeout(() => {
      nextDirection();
    }, 1000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="alert">
          <IonTitle className="ion-text-uppercase ion-text-center title">prueba psiquica</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="container">
          <div className="row">
            <IonButton onClick={() => checkAnswer(0)} >Arriba</IonButton>
          </div>
          <div className="row">
            <div className="col">
            <IonButton onClick={() => checkAnswer(1)}>Izquierda</IonButton>
            </div>
            <div className="col">
              {message}
            </div>
            <div className="col">
              <IonButton onClick={() => checkAnswer(2)}>Derecha</IonButton>
            </div>
          </div>
          <div className="row">
            <IonButton onClick={() => checkAnswer(3)}>Abajo</IonButton>
          </div>

          <div style={{
              position: 'absolute', 
              right: 0, left: 0, width: '30vw', top: 0, margin: '0 auto'}}>
              { showCorrectSymbol && <IonImg src={correctSymbol} /> }
              { showIncorrectSymbol && <IonImg src={incorrectSymbol} /> }
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default compose(
  withRouter,
  withCookies
)(DirectionsTest);