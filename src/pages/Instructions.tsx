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
// import logoPruebaTeorica from '../assets/logo_prueba_teorica.svg';
import instruccionesPruebaTeorica from '../assets/instrucciones_prueba_teorica.svg';
import confirmarBtn from '../assets/confirmar_btn.svg';

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
        <IonItem lines="none">
          <IonImg src={instruccionesPruebaTeorica} style={{maxWidth: '100%', width: '100%'}}/>
        </IonItem>
        <IonItem lines="none">
          <IonButton onClick={startTest} color="none" className="confirmar-btn" size="large">
          &nbsp;
          </IonButton>
        </IonItem>
    </IonContent>
  </IonPage>
  );
};

export default InstructionsPage;
