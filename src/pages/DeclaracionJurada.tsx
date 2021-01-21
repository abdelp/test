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
  IonTextarea,
  IonAlert,
  IonPopover,
  IonSpinner
} from '@ionic/react';
import { getDeclaracionJurada } from '../APIs';
import { useHistory } from 'react-router-dom';

import './DeclaracionJurada.css';

const DeclaracionJuradaPage: React.FC = () => {
  const [questions, setQuestions] = useState<any>([]);
  const [state, setState] = useState<any>({showAlert: false});
  const history = useHistory();

  useEffect(() => {
    getDeclaracionJurada()
    .then((result) => {
      setQuestions(result);
    })
    .catch((error) => console.log(error));
  });

  const confirmar = () => {

    /*
     * poner webservice
     */

    setState((state: any) => ({...state, loading: true}))

    setTimeout(() => {
      setState((state: any) => ({...state, loading: false}))
      history.replace('/page/test-types');
    }, 2000);

  };

  const { loading, showAlert } = state;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="yellow">
          <IonTitle className="ion-text-uppercase ion-text-center title">Declaración Jurada</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
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

        <IonList>
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
              <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                <div style={{width: '100%', minWidth: '300px'}}>
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
          <IonButton className="confirmar-btn"  color="none" size="large" onClick={(state) => setState({...state, showAlert: true}) }>
          &nbsp;
          </IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default DeclaracionJuradaPage;