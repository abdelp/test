import React, { useState, useEffect, useRef } from "react";
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
  IonAlert,
} from "@ionic/react";
import Timer from "./Timer";
import { useHistory } from "react-router-dom";

import { set } from "idb-keyval";
import { sendResult } from "../APIs";
import { updateUserTest } from "../utils/db";
import { withCookies, Cookies } from "react-cookie";

const DrivingTestPage: React.FC = (props: any) => {
  const [minutes, setMinutes] = useState<any>({ val: 3 });
  const [showTimer, setShowTimer] = useState<any>(true);
  const history = useHistory();

  const [statex, setState] = useState({ min: 3, sec: 0 });
  const [isActive, setIsActive] = useState(true);

  async function doSaveExamProgress(exam: any) {
    await set("exam", { exam });
  }

  // useEffect(() => {
  //   // updateUserTestDate('123', 'x', 'multiple options')
  //   // .then(result => {
  //   //   console.log(result);
  //   // })
  //   // .catch(err => {
  //   //   console.log(err);
  //   // });
  // }, []);

  useEffect(() => {
    let interval: any = null;

    if (isActive) {
      interval = setInterval(() => {
        const { sec, min } = statex;

        if (sec > 0) {
          setState((state) => ({ ...state, sec: state.sec - 1 }));
        }

        if (sec === 0) {
          if (min === 0) {
            history.replace("/page/time-out");
          } else {
            setState((state) => ({
              min: state.min - 1,
              sec: 59,
            }));
          }
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
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
        {/* <IonAlert
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
          /> */}

        <IonList lines="none">
          <IonItem>
            Tiempo restante: <Timer min={min} sec={sec}></Timer>
          </IonItem>

          {/* <IonItem>
            <IonButton size="default" onClick={nextQuestion}>
            { loading ? <IonSpinner/> : 'Siguiente' }
            </IonButton>
          </IonItem> */}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default withCookies(DrivingTestPage);
