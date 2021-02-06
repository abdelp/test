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
import { useHistory } from 'react-router-dom';
import to from 'await-to-js';
import { set, get } from 'idb-keyval';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from "react-cookie";
import _ from 'lodash';
import { getDeclaracionJurada, saveDeclaracionJurada } from '../APIs';
import { obtenerDatosUsuarioTesteadoPorNroDocumento, actualizarDatosUsuarioTesteadoPorNroDocumento } from '../utils/db';
import './DeclaracionJurada.css';


const DeclaracionJuradaPage: React.FC = (props: any) => {
  const [questions, setQuestions] = useState<any>([]);
  const [state, setState] = useState<any>({showAlert: false, showAlertNotCompleted: false});
  const [disableText, setDisableText] = useState<any>(true);
  const history = useHistory();
  
  const incompleteForm = () => {
    const incomplete = questions.some((q: any) => typeof q.respuesta === 'undefined');
  
    return incomplete;
  };

  useEffect(() => {
    getDeclaracionJurada()
    .then((result) => {
      setQuestions(result);
    })
    .catch((error) => console.log(error));
  }, []);

  const confirmar = async () => {
    setState((state: any) => ({ ...state, showAlert: false }));

    if(!incompleteForm()) {
      setState((state: any) => ({...state, loading: true}));
      let err: any, result: any;

      ([err, result] = await to(get('usuarios_testeados')));
  
      if (err) {
        setState((state: any) => ({...state, loading: false}));
        return err;
      };

      const { cookies } = props;
      const { nroDocumento } = cookies.get('usuario_testeado');
      const usuarioTesteado = await obtenerDatosUsuarioTesteadoPorNroDocumento(nroDocumento);
      const categoria = cookies.get('categoria');

      const examen = {
        examenes: {
          [categoria]: {
            "declaracionJurada": { fecha: new Date(), declaracion: questions }
          }
        }
      };

      // const usuarioActualizado = _.merge(usuarioTesteado, examen);

      // console.log(usuarioActualizado);
      // const usuarioIdx = result.findIndex((u: any) => u.cedula === usuarioTesteado.cedula);

      // let examenes: any = usuarioTesteado["examenes"];

      // let cat: any;

      // if (!usuarioTesteado.examenes[categoria.toLowerCase()]) {
      //   cat = usuarioTesteado["examenes"][categoria.toLowerCase()] = {};
      // } else {
      //   cat = usuarioTesteado.examenes[categoria.toLowerCase()];
      // }

      // cat["declaracionJurada"] = { date: new Date(), declaracion: questions };
      // result[usuarioIdx] = usuarioTesteado;

      // set('usuarios_testeados', result);

      ([err, result] = await to(actualizarDatosUsuarioTesteadoPorNroDocumento(nroDocumento, examen)));
      ([err, result] = await to(saveDeclaracionJurada(questions)));

      // if (err) {
      //   setState((state: any) => ({...state, loading: false}));

      //   return err;
      // }

      setState((state: any) => ({...state, loading: false}));
      history.replace('/page/test-types');
    } else {
      setState((state: any) => ({...state, showAlertNotCompleted: true }));
      return;
    }
  };

  const { loading, showAlert, showAlertNotCompleted } = state;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="yellow">
          <IonTitle className="ion-text-uppercase ion-text-center title">Declaración Jurada</IonTitle>
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
          header={'Aviso'}
          message={'Afirmo que la declaración jurada ha sido completada correctamente, sin omisión ni falsear dato alguno siendo fiel expresión de la verdad y de no cumplirse será pasible de las sanciones previstas en el artículo N° 243 del Código Penal Declaración falsa.'}
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                setState((state: any) => ({ ...state, showAlert: false }))
              }
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

        <h1 className="titulo-centrado">Declaración jurada sobre padecimiento de afecciones y/o adicciones</h1>
        <IonList>
          { questions.map((q: any) =>
            <IonRadioGroup
            className="one-question"
              key={q.id}
              value={(questions[q.id - 1]?.respuesta || null)}
              onIonChange={e => setQuestions((state: any) => {
                const idx: any = state.findIndex((obj: any) => obj.id === q.id);
                state[idx].respuesta = e.detail.value;

                if (state[state.length-1].respuesta == "false") {
                  state[state.length-1].descripcion = '';
                }

                let valor = false;
                if (state[state.length - 1]?.respuesta === "true") {
                  valor = false;
                } else {
                  valor = true;
                }

                setDisableText(valor);
                return state;
              }
              )}>
              <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%'}}>
                <div className="radio-label-container">
                  <IonItem lines="none">
                    <IonLabel className="question-label">{q.pregunta}</IonLabel>
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
              </div>
            </IonRadioGroup>
          ) }

            <IonItem  lines="none">
              <IonTextarea placeholder="Otros datos..."
                value={questions[questions.length-1]?.descripcion || ''}
                disabled={disableText}
                onIonChange={e => setQuestions((state: any) => {
                  state[state.length - 1].descripcion = e.detail.value;

                  return state;
                }
                )}
              >

              </IonTextarea>
            </IonItem>

        </IonList>
        <IonItem className='ion-text-center' lines="none">
          <IonButton  style={{margin: '2em auto'}} className="confirmar-btn"  color="none" size="large" onClick={(state) => setState({...state, showAlert: true}) }>
          CONFIRMAR
          </IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

DeclaracionJuradaPage.propTypes = {
  cookies: instanceOf(Cookies).isRequired
};

export default withCookies(DeclaracionJuradaPage);