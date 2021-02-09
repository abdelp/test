import React, { useState, useEffect, Fragment } from "react";
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
  IonSpinner,
} from "@ionic/react";
import { getPracticalTestItems } from "../APIs";
import { useHistory } from "react-router-dom";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import to from "await-to-js";
import { get } from "idb-keyval";
import {
  obtenerDatosUsuarioTesteadoPorNroDocumentoYAntecedente,
  actualizarDatosUsuarioTesteadoPorNroDocumentoYAntecedente,
} from "../utils/db";
import "./PracticalTest.css";

const PracticalTestPage: React.FC = (props: any) => {
  const [questions, setQuestions] = useState<any>([]);
  const [state, setState] = useState<any>({
    showAlert: false,
    showAlertNotCompleted: false,
  });
  const history = useHistory();

  const incompleteForm = () => {
    const incomplete = questions.some((q: any) => {
      return q.items.some((i: any) => typeof i.respuesta === "undefined");
    });

    return incomplete;
  };

  useEffect(() => {
    getPracticalTestItems()
      .then((result) => {
        setQuestions(result);
      })
      .catch((error) => console.log(error));
  });

  const confirmar = async () => {
    setState((state: any) => ({ ...state, showAlert: false }));

    /*
     * poner webservice
     */

    if (!incompleteForm()) {
      setState((state: any) => ({ ...state, loading: true }));
      let err: any, result: any;

      [err, result] = await to(get("usuarios_testeados"));

      if (err) {
        setState((state: any) => ({ ...state, loading: false }));
        return err;
      }

      const { cookies } = props;
      const { nroDocumento, idAntecedente } = cookies.get("usuario_testeado");
      const usuarioTesteado = await obtenerDatosUsuarioTesteadoPorNroDocumentoYAntecedente(
        nroDocumento,
        "cedula",
        idAntecedente
      );

      const categoria = cookies.get("categoria");

      const examen = {
        examenes: {
          [categoria]: {
            practico: { fecha: new Date(), declaracion: questions },
          },
        },
      };

      [err, result] = await to(
        actualizarDatosUsuarioTesteadoPorNroDocumentoYAntecedente(
          nroDocumento,
          "cedula",
          idAntecedente,
          examen
        )
      );

      setTimeout(() => {
        setState((state: any) => ({ ...state, loading: false }));
        history.replace({
          pathname: "/page/report",
          state: { nroDocumento },
        });
      }, 2000);
    } else {
      setState((state: any) => ({ ...state, showAlertNotCompleted: true }));
      return;
    }
  };

  const { loading, showAlert, showAlertNotCompleted } = state;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="orange">
          <IonTitle className="ion-text-center title">Prueba Práctica</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {loading && (
          <IonPopover
            cssClass="loading-popover ion-text-center"
            isOpen={loading}
          >
            <IonSpinner style={{ margin: "2em" }}></IonSpinner>
          </IonPopover>
        )}

        <IonAlert
          isOpen={showAlert}
          cssClass="my-custom-class"
          header={"Confirmación"}
          message={"¿Estás seguro que deseas confirmar?"}
          buttons={[
            {
              text: "Cancelar",
              role: "cancel",
              cssClass: "secondary",
            },
            {
              text: "Sí",
              handler: () => {
                confirmar();
              },
            },
          ]}
        />

        <IonAlert
          isOpen={showAlertNotCompleted}
          cssClass="my-custom-class"
          header={"Error"}
          message={
            "No se han completado todas las declaraciones. Favor, verificar que todas estén respondidas."
          }
          buttons={[
            {
              text: "Ok",
              role: "cancel",
            },
          ]}
        />

        <IonList className="practical-test-list">
          {questions.map((q: any) => (
            <div key={q.id}>
              <div style={{ width: "100%", minWidth: "300px" }}>
                <IonTitle className="question-label ion-text-wrap">
                  <strong>{q.titulo}</strong>
                </IonTitle>
              </div>
              {q.items.map((item: any, idx: any) => (
                <IonRadioGroup
                  className="one-question"
                  key={item.id}
                  value={
                    questions[q.id - 1]?.items[item.id - 1]?.respuesta || null
                  }
                  onIonChange={(e) =>
                    setQuestions((state: any) => {
                      const idx: any = state.findIndex(
                        (obj: any) => obj.id === q.id
                      );
                      const questionIdx: any = state[idx]["items"].findIndex(
                        (obj: any) => obj.id === item.id
                      );
                      state[idx]["items"][questionIdx].respuesta =
                        e.detail.value;

                      return state;
                    })
                  }
                >
                  <div className="radio-label-container">
                    <IonItem lines="none">
                      <IonLabel className="question-label ion-text-wrap">
                        {item.pregunta}
                      </IonLabel>
                    </IonItem>
                  </div>
                  <div className="radio-row" style={{ display: "flex" }}>
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
              ))}
            </div>
          ))}
          <IonItem lines="none">
            <IonTextarea
              placeholder="Otros datos..."
              value={questions[questions.length - 1]?.descripcion || ""}
              onIonChange={(e) =>
                setQuestions((state: any) => {
                  state[state.length - 1].descripcion = e.detail.value;

                  return state;
                })
              }
            ></IonTextarea>
          </IonItem>
        </IonList>
        <IonButton
          style={{ margin: "2em auto" }}
          className="confirmar-btn"
          color="none"
          size="large"
          onClick={(state) => setState({ ...state, showAlert: true })}
        >
          CONFIRMAR
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

PracticalTestPage.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(PracticalTestPage);
