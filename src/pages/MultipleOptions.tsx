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
  IonImg,
  IonSpinner,
  IonPopover
} from '@ionic/react';
import Timer from './Timer';
import { useHistory } from 'react-router-dom';
import { getPreguntasSenhales } from '../APIs';
import { set } from 'idb-keyval';
import { sendResult } from '../APIs';
import { updateUserTest } from '../utils/db';
import { withCookies } from 'react-cookie';
import './MultipleOptions.css';

const MultipleOptionsPage: React.FC = (props: any) => {
  const [questions, setQuestions] = useState<any>([]);
  const [currentQuestion, setCurrentQuestion] = useState<any>();
  const [questionIdx, setQuestionIdx] = useState<number>(0);
  const [time, setTime] = useState<any>({min: 3, sec: 0});
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [isActive, setIsActive] = useState(true);
  
  useEffect(() => {
    const { cookies } = props;

    const ticket = cookies.get('ticket');
    const categoria = cookies.get('ticket');
    const usuarioTesteado = cookies.get('usuario_testeado');
    const { cedula } = usuarioTesteado;

    const updateUserTest = async () => {

    };

    // updateUserTest(ci, categoria, 'multiple options')
    // .then(result => {
    //   console.log(result);
    // })
    // .catch(err => {
    //   console.log(err);
    // });

    getPreguntasSenhales()
    .then((result: any) => {
      setQuestions(result);
      setCurrentQuestion(result[questionIdx]);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  const nextQuestion = (opt: number) => {
      setTime({min: 3, sec: 0});
      questions[questionIdx].selected = opt;
      
      if (questionIdx + 1 < questions.length) {
        doSaveExamProgress(questions);
        setQuestionIdx(idx => idx + 1);
      } else {
        doSaveExamProgress(questions);
        setLoading(true);

        const resultado = questions.filter((r: any) => r.selected === r.respuesta).length;
        const ticket = props.cookies.get('ticket');
        const usuarioTesteado = props.cookies.get('usuario_testeado');
        const categoria = props.cookies.get('categoria');
        const { cedula } = usuarioTesteado;

        updateUserTest(cedula, categoria, "teorica", questions)
        .then(result => {
          sendResult(ticket, cedula, resultado)
          .then(result => {
            setLoading(false);
  
            history.replace('/page/test-finished', { state: 'prueba practica' });
          });
        })
        .catch((error: any) => {
          setLoading(false);
        });
      }
  };

  const doSaveExamProgress = async (exam: any) =>
    await set("exam", {exam});


  useEffect(() => {
    let interval: any = null;

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
            history.replace('/page/time-out');
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

  const { min, sec } = time;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light-blue">
          <IonTitle className="ion-text-uppercase ion-text-center title ion-text-capitalize">prueba teórica</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList className="ms-list question-details" lines="none">
          { loading &&
            <IonPopover
              cssClass='loading-popover ion-text-center'
              isOpen={loading}
            >
              <IonSpinner style={{margin: '2em'}}></IonSpinner>
            </IonPopover>
          }

          <div style={{minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <IonItem>
              <IonLabel className="ion-text-center question-text texto" style={{fontSize: '3em', witheSpace: 'normal'}}><strong className='texto'>{currentQuestion ? questions[questionIdx].pregunta : ''}:</strong></IonLabel>
            </IonItem>
            {currentQuestion && questions[questionIdx].img &&
            <div className="question-img-container" key="img">
              <IonImg className="question-img" src={currentQuestion ? require(`../assets/${questions[questionIdx].img}`) : ''} />
            </div>
            }
          </div>

          <div className="answers-container">
            {questions[questionIdx] && questions[questionIdx].opciones.map((opt: any, idx: number) => {
              return (
                <p
                  key={opt}
                  className="opt-btn"
                  onClick={() => nextQuestion(idx)}
                  >
                  {opt}
                </p>
              )
              })
            }
          </div>

          <IonItem lines="none" className="counter">
            Tiempo restante: <Timer min={min} sec={sec}></Timer>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default withCookies(MultipleOptionsPage);