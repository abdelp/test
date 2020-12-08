import { IonButtons, IonButton, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonSlides, IonSlide, IonList, IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonIcon, IonNote } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import { heart, trash, star, archive, ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

import './Instructions.css';

const slideOpts = {
  initialSlide: 1,
  speed: 400
};

const InstructionsPage: React.FC = () => {
  const history = useHistory();

  const startTest = () => {
    history.push('/page/multiple-options');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Instrucciones</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonSlides pager={true} options={slideOpts}>
          <IonSlide>
            <h1>Instrucciones 1</h1>
          </IonSlide>
          <IonSlide>
            <h1>Instrucciones 2</h1>
          </IonSlide>
          <IonSlide>
            <h1>Instrucciones 3</h1>
            <br/>
            <div>
              <IonButton onClick={startTest}>
                Empezar
              </IonButton>
            </div>
          </IonSlide>
        </IonSlides>
    </IonContent>
  </IonPage>
  );
};

export default InstructionsPage;
