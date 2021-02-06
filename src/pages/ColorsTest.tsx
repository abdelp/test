import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg
} from '@ionic/react';
import { withRouter } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { actualizarDatosUsuarioTesteadoPorNroDocumento } from '../utils/db';
import './ColorsTest.css';
import { compose } from 'recompose';
import correctSymbol from '../assets/correcto.svg';
import incorrectSymbol from '../assets/incorrecto.svg';

const colors = [
{
  name: 'rojo',
  code: 'red'
},
{
  name: 'azul',
  code: 'blue'
},
{
  name: 'amarillo',
  code: 'yellow'
},
{
  name: 'naranja',
  code: 'orange'
},
{
  name: 'verde',
  code: 'green'
},
{
  name: 'negro',
  code: 'black'
},
{
  name: 'morado',
  code: 'purple'
}
];

const defaultTime = {
  min: 0,
  sec: 30
};

const defaultQuestionTime = {
  min: 0,
  sec: 3
};

const ColorsTest: React.FC = (props: any) => {
  const [time, setTime] = useState<any>({...defaultTime});
  const [questionTime, setQuestionTime] = useState<any>({...defaultQuestionTime});
  const [results, setResults] = useState<any>([]);
  const [round, setRound] = useState<any>(0); // or probably one
  const [isActive, setIsActive] = useState(true);
  const [nameToDisplay, setNameToDisplay] = useState<any>();
  const [codeToDisplay, setCodeToDisplay] = useState<any>();
  const [showCorrectSymbol, setShowCorrectSymbol] = useState<any>(false);
  const [showIncorrectSymbol, setShowIncorrectSymbol] = useState<any>(false);
  
  useEffect(() => {
    if(round === 0) {
      setRound((state: any) => state + 1);
      nextColor();
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
            const { nroDocumento } = usuarioTesteado;
  
            const examen = {
              examenes: {
                [categoria]: {
                  "psiquica": {
                    "test-colores": results,
                    fecha: new Date()
                  }
                }
              }
            };
  
            actualizarDatosUsuarioTesteadoPorNroDocumento(nroDocumento, examen)
            .then(() => { 
              history.replace('/page/instrucciones', {type: 'psiquica', test: 'test-direcciones'});
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
            checkAnswer(false);
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
    Math.floor(Math.random() * (colors.length - 1 - 0) + 0);

  const nextColor = () =>{
    const nameIdx = randomNumber();
    let colorIdx: any;

    setNameToDisplay(colors[nameIdx].name);
    
    if(Math.random() < 0.5) {
      colorIdx = nameIdx;
    } else {
      colorIdx = randomNumber();
    }
    setCodeToDisplay(colors[colorIdx].code);
    setResults((state: any) => ([...state,
      {
        colorAelegir: colors[nameIdx].name,
        indiceAElegir: nameIdx,
        colorMostrado: colors[nameIdx].code,
        indiceCodigo: colorIdx
      }]));
  }

  const checkAnswer = (confirmed: any) => {
    results[results.length - 1].respuestaUsuario = confirmed;
    setResults([...results]);
    
    const resultado = 
    ((results[results.length - 1].indiceAElegir === results[results.length - 1].indiceCodigo) && confirmed) ||
    ((results[results.length - 1].indiceAElegir !== results[results.length - 1].indiceCodigo) && !confirmed);
    
    setShowCorrectSymbol(resultado);
    setShowIncorrectSymbol(!resultado);
    setQuestionTime({...defaultQuestionTime});

    setRound((state: any) => state + 1);

    setTimeout(() => {
      nextColor();
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
        <div className="grilla">
          <div className="nombre-color" style={{position: 'relative'}}>
            <div
              style={{color: codeToDisplay}}
              className="ion-text-center"
              onClick={() => checkAnswer(true)}
            >
              <p className="ion-text-center">{nameToDisplay}</p>
            </div>
            <div style={{
              position: 'absolute', 
              right: 0, left: 0, width: '30vw', top: 0, margin: '0 auto'}}>
              { showCorrectSymbol && <IonImg src={correctSymbol} /> }
              { showIncorrectSymbol && <IonImg src={incorrectSymbol} /> }
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default compose(
  withRouter,
  withCookies
)(ColorsTest);