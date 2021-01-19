import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonRadioGroup,
  IonButton,
  IonLabel,
  IonItem,
  IonRadio,
  IonTextarea
} from '@ionic/react';
import { getDeclaracionJurada } from '../APIs';
import { useHistory } from 'react-router-dom';

import './DeclaracionJurada.css';

const DeclaracionJuradaPage: React.FC = () => {
  const [questions, setQuestions] = useState<any>([]);
  const history = useHistory();

  useEffect(() => {
    getDeclaracionJurada()
    .then((result) => {
      setQuestions(result);
    })
    .catch((error) => console.log(error));
  });

  const confirmar = () => {
    console.log(questions);
    history.push('/page/test-types');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="yellow">
          <IonTitle className="ion-text-uppercase ion-text-center title">Declaración Jurada</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
        {/* <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)}>
              <div style={{display: 'flex'}}>
                <div style={{width: '100%'}}>
                  <IonItem>
                      <IonLabel>Descripcion del item</IonLabel>
                  </IonItem>
                </div>
                <div style={{display: 'flex'}}>
                  <IonItem>
                    <IonLabel>Sí</IonLabel>
                    <IonRadio slot="end" mode="ios" value="1" color="success" />
                  </IonItem>

                  <IonItem>
                    <IonLabel>No</IonLabel>
                    <IonRadio slot="end" mode="ios" value="2" color="danger" />
                  </IonItem>
                </div>
              </div>
            </IonRadioGroup> */}
          { questions.map((q: any) =>
            <IonRadioGroup
              key={q.id}
              // value={questions[q.id].respuesta || null}
              onIonChange={e => setQuestions((state: any) => {
                const idx: any = state.findIndex((obj: any) => obj.id === q.id);

                state[idx].respuesta = e.detail.value;

                return [...state ];
              }
              )}>
              <div style={{display: 'flex'}}>
                <div style={{width: '100%'}}>
                  <IonItem>
                    <IonLabel className="question-label">{q.pregunta}</IonLabel>
                  </IonItem>
                </div>
                <div style={{display: 'flex'}}>
                  <IonItem lines="none">
                    <IonLabel>Sí</IonLabel>
                    <IonRadio slot="end" mode="ios" value="true" color="success" />
                  </IonItem>

                  <IonItem lines="none">
                    <IonLabel>No</IonLabel>
                    <IonRadio slot="end" mode="ios" value="false" color="danger" />
                  </IonItem>
                </div>
              </div>
            </IonRadioGroup>
          ) }
          <IonItem>
            <IonTextarea
              placeholder="Enter more information here..."
              // disabled
              // value={text}
              // onIonChange={e => setText(e.detail.value!)}
            ></IonTextarea>
          </IonItem>
        </IonList>
        <IonItem className='ion-text-center'>
          <IonButton className="confirmar-btn"  color="none" size="large" onClick={confirmar}>
          &nbsp;
          </IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default DeclaracionJuradaPage;