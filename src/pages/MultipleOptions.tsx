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
  IonItemDivider,
  IonButton,
  IonInput,
  IonImg
} from '@ionic/react';
import Timer from './Timer';
import { useHistory } from 'react-router-dom';
import { getPreguntasSenhales } from '../APIs';

const MultipleOptionsPage: React.FC = () => {
  const [selected, setSelected] = useState<string>();
  const [questions, setQuestions] = useState<any>([]);
  const [currentQuestion, setCurrentQuestion] = useState<any>();
  const [questionIdx, setQuestionIdx] = useState<number>(0);
  const [minutes, setMinutes] = useState<any>({val: 3});
  const [showTimer, setShowTimer] = useState<any>(true);
  const history = useHistory();

  const [statex, setState] = useState({min: 1, sec: 0});
  const [isActive, setIsActive] = useState(true);

  const radioGroup = useRef<HTMLIonRadioGroupElement>(null);

  const nextQuestion = () => {
    setSelected('');
    setQuestionIdx(idx => idx + 1);
    setState({min: 1, sec: 0});
    // history.push('/page/test-finished');
  }

  useEffect(() => {
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
            console.log(
              'terminado'
            )
            // history.push('/page/time-out');
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
      console.log(`component closed`);
      clearInterval(interval);
      // setIsActive(false);
    }
  }, [isActive, statex]);

  const { min, sec } = statex;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Test de Selección Múltiple</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList lines="none">
          <IonRadioGroup ref={radioGroup} value={selected} onIonChange={e => setSelected(e.detail.value)}>
            <IonListHeader className="list-header">
              <IonImg src={currentQuestion ? require(`../assets/${questions[questionIdx].img}`) : ''} />
              <IonLabel><strong>{currentQuestion ? questions[questionIdx].pregunta : ''}:</strong></IonLabel>
            </IonListHeader>
            {questions[questionIdx] && questions[questionIdx].opciones.map((opt: any, idx: number) => {
              return (
                <IonItem key={opt}>
                  <IonLabel>{opt}</IonLabel>
                  <IonRadio slot="start" value={idx} />
                </IonItem>
              )
              })
            }
          </IonRadioGroup>

          <IonItem>
            Tiempo restante: <Timer min={min} sec={sec}></Timer>
          </IonItem>

          <IonItem>
            <IonButton size="default" onClick={nextQuestion}>
              Siguiente
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default MultipleOptionsPage;