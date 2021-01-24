import React, { useState, useEffect, Fragment } from 'react';
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
  IonTextarea,
  IonAlert,
  IonPopover,
  IonSpinner
} from '@ionic/react';
import { getPracticalTestItems } from '../APIs';
import { useHistory } from 'react-router-dom';

import './PracticalTest.css';

const PracticalTestPage: React.FC = () => {
  const [questions, setQuestions] = useState<any>([]);
  const [state, setState] = useState<any>({showAlert: false, showAlertNotCompleted: false});
  const history = useHistory();

  useEffect(() => {
    getPracticalTestItems()
    .then((result) => {
      setQuestions(result);
    })
    .catch((error) => console.log(error));
  });

  const confirmar = () => {
    setState((state: any) => ({ ...state, showAlert: false }));

    console.log(questions);
    /*
     * poner webservice
     */

    // setState((state: any) => ({...state, loading: true}))

    // setTimeout(() => {
    //   setState((state: any) => ({...state, loading: false}))
    //   history.push('/page/test-types');
    // }, 2000);

  };

  const checkAnswers = () => {
    const noRespondido = questions.findIndex((q: any) => typeof q.respuesta === 'undefined');

    return noRespondido;
  };

  const { loading, showAlert, showAlertNotCompleted } = state;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="orange">
          <IonTitle className="ion-text-uppercase ion-text-center title">Test Práctico</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        { loading &&
          <IonPopover
            cssClass='loading-popover ion-text-center'
            isOpen={loading}
          >
            <IonSpinner style={{margin: '2em'}}></IonSpinner>
          </IonPopover>
        }

        <IonAlert
          isOpen={showAlert}
          cssClass='my-custom-class'
          header={'Confirmación'}
          message={'¿Estás seguro que deseas confirmar?'}
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary'
            },
            {
              text: 'Sí',
              handler: () => {
                confirmar();
              }
            }
          ]}
        />

        <IonAlert
          isOpen={showAlertNotCompleted}
          cssClass='my-custom-class'
          header={'Error'}
          message={'No se han completado todas las declaraciones. Favor, verificar que todas estén respondidas.'}
          buttons={[
            {
              text: 'Ok',
              role: 'cancel'
            }
          ]}
        />

        <IonList className="practical-test-list">
          { questions.map((q: any) =>
              <div key={q.id}>
                <div style={{width: '100%', minWidth: '300px'}}>
                  <IonTitle className="question-label ion-text-wrap"><strong>{q.titulo}</strong></IonTitle>
                </div>
                 {q.items.map((item: any, idx: any) => 
                  <IonRadioGroup
                    key={item.id}
                    value={(questions[q.id]?.items[item.id - 1]?.respuesta || null)}
                    onIonChange={e => setQuestions((state: any) => {
                      const idx: any = state.findIndex((obj: any) => obj.id === q.id);
                      const questionIdx: any = state[idx]["items"].findIndex((obj: any) => obj.id === item.id);
                      state[idx]["items"][questionIdx].respuesta = e.detail.value;
                      return state;
                    }
                    )}
                >
                     <div style={{width: '100%', minWidth: '300px'}}>
                       <IonItem lines="none">
                         <IonLabel className="question-label ion-text-wrap">{item.pregunta}</IonLabel>
                       </IonItem>
                     </div>
                     <div className="radio-row" style={{display: 'flex'}}>
                       <IonItem className="radio-label" lines="none">
                         <IonLabel>Sí</IonLabel>
                         <IonRadio slot="end" value="true" color="success" />
                       </IonItem>

                       <IonItem className="radio-label" lines="none">
                         <IonLabel>No</IonLabel>
                         <IonRadio slot="end" value="false" color="danger" />
                       </IonItem>
                     </div>
                  </IonRadioGroup>
                )}
              </div>
          ) }
          <IonItem lines="none">
            <IonTextarea
              placeholder="Enter more information here..."
              // disabled
              // value={text}
              // onIonChange={e => setText(e.detail.value!)}
            ></IonTextarea>
          </IonItem>
        </IonList>
          <IonButton style={{margin: '2em auto'}} className="confirmar-btn"  color="none" size="large" onClick={(state) => setState({...state, showAlert: true}) }>
          CONFIRMAR
          </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default PracticalTestPage;