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
  
    history.replace({
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

  const getHeaderColor = (test: any) => {
    let color;

    switch(test) {
      case 'teórica':
        color = 'light-blue';
        break;
      case 'psiquica':
        color = 'alert';
        break;
      default:
        color = 'success';
    }

    return color;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={
getHeaderColor(test)
          }>
          <IonTitle className="ion-text-center title ion-text-capitalize">Prueba {test}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonItem lines="none">
          <IonImg src={instruccionesPruebaTeorica} style={{maxWidth: '100%', width: '100%'}}/>
        </IonItem>
          <IonButton onClick={startTest} color="none" className="confirmar-btn" size="large">
          CONFIRMAR
          </IonButton>
    </IonContent>
  </IonPage>
  );
};

export default InstructionsPage;
