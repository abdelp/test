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
import { saveDeclaracionJurada } from '../APIs';
import to from 'await-to-js';
import { set, get } from 'idb-keyval';
import { useCookies } from "react-cookie";

import './DeclaracionJurada.css';

const DeclaracionJuradaPage: React.FC = () => {
  const [questions, setQuestions] = useState<any>([]);
  const [state, setState] = useState<any>({showAlert: false, showAlertNotCompleted: false});
  const [cookies, setCookie] = useCookies(["user"]);
  const history = useHistory();

  useEffect(() => {
    getDeclaracionJurada()
    .then((result) => {
      setQuestions(result);
    })
    .catch((error) => console.log(error));
  });

  const confirmar = () => {
    setState((state: any) => ({ ...state, showAlert: false }));

    console.log(questions);
    if(checkAnswers() === -1 ) {
      setState((state: any) => ({...state, loading: true}));
  
      get('usuarios_testeados')
      .then((result: any) => {
        const { usuario_testeado: usuarioTesteado, categoria } = cookies;
        const usuarioIdx = result.findIndex((u: any) => u.ci === usuarioTesteado.ci);

        let examenes: any = usuarioTesteado["examenes"];

        let cat: any;

        if (!usuarioTesteado.examenes[categoria.toLowerCase()]) {
          cat = usuarioTesteado["examenes"][categoria.toLowerCase()] = {};
        } else {
          cat = usuarioTesteado.examenes[categoria.toLowerCase()];
        }

        cat["declaracionJurada"] = { date: new Date(), declaracion: questions };
        result[usuarioIdx] = usuarioTesteado;

        set('usuarios_testeados', result);

        saveDeclaracionJurada(questions)
        .then((result: any) => {
          setState((state: any) => ({...state, loading: false}));
          history.replace('/page/test-types');
        })
        .catch(error => {
          console.log(error);
          setState((state: any) => ({...state, loading: false}));
        });
      })
      .catch((error: any) => {
        console.log(error);
        setState((state: any) => ({...state, loading: false}));
      });
    } else {
      setState((state: any) => ({...state, showAlertNotCompleted: true }));
    }
  };

  const checkAnswers = () => {
    const noRespondido = questions.findIndex((q: any) => typeof q.respuesta === 'undefined');

    return noRespondido;
  };

  const { loading, showAlert, showAlertNotCompleted } = state;

  if(questions.length) {
    console.log(questions[questions.length - 1]["respuesta"]);
  }

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

        <IonList>
          { questions.map((q: any) =>
            <IonRadioGroup
              key={q.id}
              value={(questions[q.id]?.respuesta || null)}
              onIonChange={e => setQuestions((state: any) => {
                const idx: any = state.findIndex((obj: any) => obj.id === q.id);
                state[idx].respuesta = e.detail.value;

                return state;
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
              // disabled={questions.length ? questions[questions.length] : true}
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