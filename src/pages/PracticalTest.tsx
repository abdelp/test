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
  const [state, setState] = useState<any>({showAlert: false});
  const history = useHistory();

  useEffect(() => {
    getPracticalTestItems()
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
      history.push('/page/test-types');
    }, 2000);

  };

  const { loading, showAlert } = state;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="orange">
          <IonTitle className="ion-text-uppercase ion-text-center title">Test Práctico</IonTitle>
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
              <div key={q.id}
                // style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}
                >
                <div style={{width: '100%', minWidth: '300px'}}>
                    {/* <IonLabel className="question-label">{q.titulo}</IonLabel> */}
                    <IonTitle className="question-label ion-text-wrap"><strong>{q.titulo}</strong></IonTitle>
                </div>
                {q.items.map((item: any, idx: any) => 
                  <IonRadioGroup
                    key={idx}
                    // value={questions[q.id].respuesta || null}
                    onIonChange={e => setQuestions((state: any) => {
                      const idx: any = state.findIndex((obj: any) => obj.id === q.id);
      
                      state[idx].respuesta = e.detail.value;
      
                      return [...state ];
                    }
                    )}>
                    <div style={{width: '100%', minWidth: '300px'}}>
                      <IonItem>
                        <IonLabel className="question-label ion-text-wrap">{item}</IonLabel>
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
                </IonRadioGroup>
                )}
              </div>
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

export default PracticalTestPage;