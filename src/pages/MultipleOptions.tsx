import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonLabel,
  IonItem,
  IonButton,
  IonImg
} from '@ionic/react';
import Timer from './Timer';
import { useHistory } from 'react-router-dom';
import { getPreguntasSenhales } from '../APIs';
import { set } from 'idb-keyval';
import { sendResult } from '../APIs';
import { updateUserTestDate } from '../utils/db';
import { withCookies, Cookies } from 'react-cookie';
import './MultipleOptions.css';

const MultipleOptionsPage: React.FC = (props: any) => {
  const [questions, setQuestions] = useState<any>([]);
  const [currentQuestion, setCurrentQuestion] = useState<any>();
  const [questionIdx, setQuestionIdx] = useState<number>(0);
  const [minutes, setMinutes] = useState<any>({val: 3});
  const [showTimer, setShowTimer] = useState<any>(true);
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  let continuar: boolean = false;
  const [showAlert, setShowAlert] = useState(false);

  const [statex, setState] = useState({min: 3, sec: 0});
  const [isActive, setIsActive] = useState(true);

  const nextQuestion = (opt: number) => {
      setState({min: 3, sec: 0});
      questions[questionIdx].selected = opt;
    
      if (questionIdx + 1 < questions.length) {
        doSaveExamProgress(questions);
        setQuestionIdx(idx => idx + 1);
      } else {
        doSaveExamProgress(questions);
        setLoading(true);
        setTimeout(() => {
          const resultado = questions.filter((r: any) => r.selected === r.respuesta).length;
          const ticket = props.cookies.get('ticket');
          const usuarioTesteado = props.cookies.get('usuario_testeado');
          const { ci, rut } = usuarioTesteado;

          sendResult(ticket, ci, resultado)
          .then(result => {
            setLoading(false);
  
            history.replace('/page/test-finished', { state: 'prueba practica' });
          });

        }, 1000);
      }
  };

  async function doSaveExamProgress(exam: any) {
    await set("exam", {exam});
  }

  useEffect(() => {
    const ticket = props.cookies.get('ticket');
    const categoria = props.cookies.get('ticket');
    const usuarioTesteado = props.cookies.get('usuario_testeado');
    const { ci } = usuarioTesteado;

    updateUserTestDate(ci, categoria, 'multiple options')
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });

    getPreguntasSenhales()
    .then((result: any) => {
      setQuestions(result);
      setCurrentQuestion(result[questionIdx]);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  useEffect(() => {
    let interval: any = null;

    if (isActive) {
      interval = setInterval(() => {
        const { sec, min } = statex;

        if (sec > 0) {
          setState(state => ({...state,
            sec: state.sec - 1
            }));
        }

        if (sec === 0) {
          if (min === 0) {
            // history.replace('/page/time-out');
          } else {
            setState(state => ({
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
  }, [isActive, statex]);

  const { min, sec } = statex;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light-blue">
          <IonTitle className="ion-text-uppercase ion-text-center title ion-text-capitalize">prueba teórica</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList className="ms-list question-details" lines="none">
            {/* <IonListHeader className="list-header">
              <IonLabel className="ion-text-center question-text"><strong>{currentQuestion ? questions[questionIdx].pregunta : ''}:</strong></IonLabel>
            </IonListHeader> */}

            <div style={{minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <IonItem>
                <IonLabel className="ion-text-center question-text texto" style={{fontSize: '3em', witheSpace: 'normal'}}><strong className='texto'>{currentQuestion ? questions[questionIdx].pregunta : ''}:</strong></IonLabel>
              </IonItem>
              {currentQuestion && questions[questionIdx].img &&
              <IonItem key="img">
                <IonImg className="question-img" src={currentQuestion ? require(`../assets/${questions[questionIdx].img}`) : ''} />
              </IonItem>
              }
            </div>

            {questions[questionIdx] && questions[questionIdx].opciones.map((opt: any, idx: number) => {
              return (
                <IonButton
                  key={opt}
                  size="default"
                  expand="block"
                  className="opt-btn ion-text-capitalize"
                  color="light-blue"
                  onClick={() => nextQuestion(idx)}
                  style={{color: 'black'}}
                  >
                    {opt}
                </IonButton>
              )
              })
            }

          <IonItem lines="none" className="counter">
            Tiempo restante: <Timer min={min} sec={sec}></Timer>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default withCookies(MultipleOptionsPage);