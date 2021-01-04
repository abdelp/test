import {
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSlides,
  IonSlide,
  IonList,
  IonItemSliding,
  IonItem,
  IonLabel,
  IonItemOptions,
  IonItemOption,
  IonIcon,
  IonNote,
  IonBackButton
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import { heart, trash, star, archive, ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { get } from 'idb-keyval';

import './TestFinished.css';

const TestFinishedPage: React.FC = () => {
  const [total, setTotal] = useState(0);
  const [correctas, setCorrectas] = useState(0);
  const [incorrectas, setIncorrectas] = useState(0);
  const [noRespondidas, setNoRespondidas] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);
  const history = useHistory();

  const returnMenu = () => {
    history.push('/page/test-types');
  }

  async function getExam() {
    const exam = await get("exam");
    return exam;
  }

  useEffect(() => {
    getExam()
    .then((result: any) => {
      setTotal(result.exam.length);

      const cc = result.exam.filter((exam: any) =>
                    exam.respuesta == exam.selected
                  ).length;

      const ic = result.exam.length - cc;

      setIncorrectas(ic);

      const nac = result.exam.filter((exam: any) =>
                    typeof exam.selected === 'undefined'
                  ).length;

      setCorrectas(cc);
      setPorcentaje(cc * 100 / result.exam.length);
      setNoRespondidas(nac);
    });
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Test finalizado</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent id="test-finished-content" fullscreen>
        <h1>El test ha finalizado</h1>
        <br/>
        <IonList>
            <IonItem>
              <IonLabel><strong>Correctas:</strong> {correctas}/{total}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel><strong>Incorrectas:</strong> {incorrectas}/{total}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel><strong>No respondidas:</strong> {noRespondidas}/{total}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel><strong>Porcentaje:</strong> {porcentaje}%</IonLabel>
            </IonItem>
            <IonItem>
              <IonButton onClick={returnMenu} size="default" className="confirm-btn">Volver a los tests</IonButton>
            </IonItem>
          </IonList>
      </IonContent>
  </IonPage>
  );
};

export default TestFinishedPage;
