import { IonButtons, IonButton, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonSlides, IonSlide, IonList, IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonIcon, IonNote } from '@ionic/react';
import React, {useState, useRef, useCallback} from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import { heart, trash, star, archive, ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

import './Instructions.css';

const InstructionsPage: React.FC = (props: any) => {
  const { categoria, test } = props.location.state || '';
  
  const slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  const history = useHistory();
  // const slider = useCallback((slidesRef) => {
  //   if (slidesRef) {
  //     // Can safely access the reference in here,
  //     // and call any methods on this ref, like slidesRef.getSwiper()
  //   }
  // }, [])

  const slider = useRef<HTMLIonSlidesElement>(null);

  const startTest = () => {
    let page = '';

    if(test === 'teorica') {
      page = 'multiple-options';
    } else if (test === 'psiquica') {
      page = 'memorize-numbers'
    }
  
    history.push({
      pathname: `/page/${page}`,
      state: ''
    });
  };

  const skipButton = () => {
    if (showSkip) {
      return (
        <IonButton routerDirection="forward" 
                   routerLink="/game" 
                   color="light">Skip
        </IonButton>
        );
    } else {
      return (<span></span>);
    }
  }
  
  let [showSkip, setSkip] = useState(true);

  const handleNext = () => slider.current?.slideNext();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="favorite">
          <IonTitle className="ion-text-center">Instrucciones</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonSlides
          pager={false}
          scrollbar={true}
          options={slideOpts}
          ref={slider}
          >
          <IonSlide>
            <h1>Instrucciones 1</h1>

            <IonToolbar>
              <IonButtons slot="end">
                <IonButton routerDirection="root" onClick={handleNext}>
                  Siguiente
                <IonIcon name="arrow-forward"></IonIcon>
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonSlide>
          <IonSlide>
            <h1>Instrucciones 2</h1>
            <IonToolbar>
              <IonButtons slot="end">
                <IonButton routerDirection="root" onClick={handleNext}>
                  Siguiente
                <IonIcon name="arrow-forward"></IonIcon>
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonSlide>
          <IonSlide>
            <h1>Instrucciones 3</h1>
            <br/>
            <div>
              <IonButton onClick={startTest} color="favorite">
                Empezar
              </IonButton>
            </div>

            
          </IonSlide>
        </IonSlides>

        <IonButtons slot="end">
          {showSkip && <IonButton
            routerDirection="forward"
            onClick={handleNext}
            color="light">Skip </IonButton>}
        </IonButtons>

    </IonContent>
  </IonPage>
  );
};

export default InstructionsPage;
