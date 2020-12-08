import { IonButtons, IonButton, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonSlides, IonSlide, IonList, IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonIcon, IonNote } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import { heart, trash, star, archive, ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

import './Tutorial.css';

const slideOpts = {
  initialSlide: 1,
  speed: 400
};

const TutorialPage: React.FC = () => {
  const history = useHistory();

  const startTest = () => {
    history.push('/page/multiple-options');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Tutorial</IonTitle>
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

export default TutorialPage;
