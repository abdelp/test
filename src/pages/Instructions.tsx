import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonIcon,
  IonImg,
  IonText
} from '@ionic/react';
import React, {
  useState,
  useRef,
  useEffect
} from 'react';
import { useHistory } from 'react-router-dom';

import './Instructions.css';
import { cog } from 'ionicons/icons';
import multipleSelectionImg from '../assets/multiple-selection.png';

const InstructionsPage: React.FC = (props: any) => {
  const { categoria, test } = props.location.state || '';
  let [showSkip, setSkip] = useState(true);
  let [state, setState] = useState({color: 'success'});

  const slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  const slider = useRef<HTMLIonSlidesElement>(null);

  useEffect(() => {
    slider.current?.slideTo(0);
  }, []);

  const history = useHistory();
  // const slider = useCallback((slidesRef) => {
  //   if (slidesRef) {
  //     // Can safely access the reference in here,
  //     // and call any methods on this ref, like slidesRef.getSwiper()
  //   }
  // }, [])


  const startTest = () => {
    let page = '';

    if(test === 'teórica') {
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

  const handleNext = () => slider.current?.slideNext();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={
          test === 'teórica' ?
          'light-blue' :
          'favorite'
          }>
          <IonTitle className="ion-text-center title ion-text-capitalize">Prueba {test}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* <IonSlides
          pager={false}
          scrollbar={true}
          options={slideOpts}
          ref={slider}
          >
          <IonSlide>
            <h1>{test}</h1>

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
        </IonSlides> */}

        <IonItem lines="none">
          <div className="icon-container" color="light-gray" style={{
            margin: '0 auto',
            padding: '3.5em',
            borderRadius: '10px',
            marginTop: '4em'
          }}>
            <div className="icon-background ion-text-center" style={{
              padding: '2em',
              borderRadius: '10px',
              margin: '0 auto'}}>
            <IonIcon style={{fontSize: '7em', color: 'white'}} icon={cog} />
            </div>
            <IonTitle
              className="ion-text-uppercase"
              style={{marginTop: '2em', fontWeight: 'bold'}}
              color={
                test === 'teórica' ?
                'light-blue' :
                'favorite'
              }
              >prueba {test}</IonTitle>
          </div>
        </IonItem>

        <IonItem lines="none">
          <div className="ion-text-center">
            <IonTitle
              color={
                test === 'teórica' ?
                'light-blue' :
                'favorite'
              } size="large"
              style={{fontSize: '3em', marginTop: '1.7em', fontWeight: 'bold'}}>¿Cómo funciona?</IonTitle>
          </div>
        </IonItem>

        <IonItem lines="none" style={{margin: '3em 0'}}>
          <div className="ion-text-center">
            <IonText style={{fontSize: '2em', fontWeight: 'bold'}}>En la pantalla aparecerá una pregunta
              y 3 opciones de respuesta; usted debe
              seleccionar la que esté correcta pulsando
              encima de ella</IonText>
          </div>
        </IonItem>

        <IonItem lines="none" style={{marginTop: '3em'}}>
          <IonImg style={{margin: '0 auto'}} src={multipleSelectionImg} />
        </IonItem>

        <IonItem lines="none">
          <IonButton onClick={startTest} color="favorite" className="comenzar-btn">
                          Comenzar
                        </IonButton>
        </IonItem>
        {/* <IonButtons slot="end">
          {showSkip && <IonButton
            routerDirection="forward"
            onClick={handleNext}
            color="light">Skip </IonButton>}
        </IonButtons> */}

    </IonContent>
  </IonPage>
  );
};

export default InstructionsPage;
