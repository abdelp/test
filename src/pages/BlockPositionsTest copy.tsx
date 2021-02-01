import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonImg
} from '@ionic/react';
import { useHistory, withRouter } from 'react-router-dom';
import { set } from 'idb-keyval';
import { sendResult } from '../APIs';
import { withCookies, Cookies } from 'react-cookie';
import { updateUserTest, actualizarDatosUsuarioTesteadoPorCedula } from '../utils/db';
import './BlockPositionsTest.css';
import { debug } from 'console';
import { compose } from 'recompose';
import correctSymbol from '../assets/correcto.svg';
import incorrectSymbol from '../assets/incorrecto.svg';
// import { setMaxListeners } from 'process';
import _ from 'lodash';

const defaultTime = {
  min: 2,
  sec: 0
};

const defaultQuestionTime = {
  min: 0,
  sec: 5
};

const defaultPositions = [
  {justify: '', align: ''},
  {justify: '', align: ''},
  {justify: '', align: ''},
  {justify: '', align: ''},
  {justify: '', align: ''},
  {justify: '', align: ''},
  {justify: '', align: ''},
  {justify: '', align: ''}
];

const BlockPositions: React.FC = (props: any) => {
  const [time, setTime] = useState<any>({...defaultTime});
  const [questionTime, setQuestionTime] = useState<any>({...defaultQuestionTime});
  const [results, setResults] = useState<any>([]);
  const [round, setRound] = useState<any>(0);
  const [isActive, setIsActive] = useState(true);
  const [numbersToDisplay, setNumbersToDisplay] = useState<any>([]);
  const [showCorrectSymbol, setShowCorrectSymbol] = useState<any>(false);
  const [showIncorrectSymbol, setShowIncorrectSymbol] = useState<any>(false);
  const [bloques, setBloques] = useState<any>({..._.cloneDeep(defaultPositions)});

  useEffect(() => {
    console.log(round);
    if(round === 0) {
      setRound((state: any) => state + 1);
    } else if (round === 1) {
      alignBlocks();
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
                    "posiciones-bloques": results,
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
            // checkAnswer(-1);
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

  const randomNumber = (length: any) =>  
    Math.floor(Math.random() * (length - 0) + 0);

  const checkAnswer = (userSelection: any) => {
    results[results.length - 1].respuestaUsuario = userSelection;
    setResults([...results]);

    const resultado = results[results.length - 1].numeroAElegir === userSelection;

    setShowCorrectSymbol(resultado);
    setShowIncorrectSymbol(!resultado);
    setQuestionTime({...defaultQuestionTime});

    setRound((state: any) => state + 1);

    setTimeout(() => {
      // alignBlocks();
    }, 1000);
  };

  const alignBlocks = () => {
    let nuevasPosiciones = [];
    const alignments = ['flex-start', 'flex-end', 'center'];

    for(let i = 0; i < 8; i++) {
      const justification = alignments[randomNumber(2)];
      const alignment = alignments[randomNumber(2)];

      nuevasPosiciones.push({justify: justification, align: alignment});
    }

    setBloques(nuevasPosiciones);

    const interval = setTimeout(() => {
      colorizeBlocks();
    }, 300);
  };

  const colorizeBlocks = () => {
    let i = 0;

    console.log(`round: ${round}`);

    while(i < round) {
      console.log('bloque coloreado');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="alert">
          <IonTitle className="ion-text-uppercase ion-text-center title">prueba psiquica</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="grid">
          <div className="row">
            <div className="col"></div>
            <div className="col" style={{justifyContent: bloques[0].justify, alignItems: bloques[0].align}}><div className="block"></div></div>
            <div className="col" style={{justifyContent: bloques[1].justify, alignItems: bloques[1].align}}><div className="block"></div></div>
          </div>
          <div className="row">
            <div className="col" style={{justifyContent: bloques[2].justify, alignItems: bloques[2].align}}><div className="block"></div></div>
            <div className="col" style={{justifyContent: bloques[3].justify, alignItems: bloques[3].align}}><div className="block"></div></div>
            <div className="col" style={{justifyContent: bloques[4].justify, alignItems: bloques[4].align}}><div className="block"></div></div>
          </div>
          <div className="row">
            <div className="col" style={{justifyContent: bloques[5].justify, alignItems: bloques[5].align}}><div className="block"></div></div>
            <div className="col"></div>
            <div className="col" style={{justifyContent: bloques[6].justify, alignItems: bloques[6].align}}><div className="block"></div></div>
          </div>
          <div className="row">
            <div className="col"></div>
            <div className="col" style={{justifyContent: bloques[7].justify, alignItems: bloques[7].align}}><div className="block"></div></div>
            <div className="col"></div>
          </div>
       </div>
      </IonContent>
    </IonPage>
  );
};

export default compose(
  withRouter,
  withCookies
)(BlockPositions);