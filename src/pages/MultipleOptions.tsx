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
import './MultipleOptions.css';

const MultipleOptionsPage: React.FC = (props: any) => {
  const [selected, setSelected] = useState<string>();
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

  const nextQuestion = () => {
    if(selected !== '' || continuar) {
      continuar = false;
      setSelected('');
      setState({min: 3, sec: 0});
      questions[questionIdx].selected = selected;
    
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
  
            history.replace('/page/test-finished', {state: 'prueba practica' });
          });

        }, 1000);
      }
    } else {
      setShowAlert(true)
    }
  }

  async function doSaveExamProgress(exam: any) {
    await set("exam", {exam});
  }

  useEffect(() => {
    const ticket = props.cookies.get('ticket');
    const usuarioTesteado = props.cookies.get('usuario_testeado');
    const { ci } = usuarioTesteado;

    updateUserTestDate(ci, 'multiple options')
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });

    getPreguntasSenhales()
    .then((result: any) => {
      setSelected('');
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
            history.replace('/page/time-out');
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
        <IonToolbar color="orange">
          <IonTitle className="ion-text-uppercase ion-text-center title">prueba practica</IonTitle>
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
                  nextQuestion();
                }
              }
            ]}
          />

        <IonList className="ms-list question-details">
          <IonRadioGroup
            value={selected}
            onIonChange={e => {
              setSelected(e.detail.value)
            }}>
            <IonListHeader className="list-header">
              <IonLabel className="ion-text-center question-text"><strong>{currentQuestion ? questions[questionIdx].pregunta : ''}:</strong></IonLabel>
            </IonListHeader>
            <IonItem key="img">
              <IonImg className="question-img" src={currentQuestion ? require(`../assets/${questions[questionIdx].img}`) : ''} />
            </IonItem>
            {questions[questionIdx] && questions[questionIdx].opciones.map((opt: any, idx: number) => {
              return (
                <IonItem key={opt}>
                  <IonLabel>{opt}</IonLabel>
                  <IonRadio slot="start" value={idx} color="light-blue" />
                </IonItem>
              )
              })
            }
          </IonRadioGroup>

          <IonItem lines="none">
            Tiempo restante: <Timer min={min} sec={sec}></Timer>
          </IonItem>

          <IonItem lines="none">
            <IonButton size="default" onClick={nextQuestion}>
            { loading ? <IonSpinner/> : 'Siguiente' }
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default withCookies(MultipleOptionsPage);