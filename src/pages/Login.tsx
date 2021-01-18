import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import SignInFormBase from '../components/SignInFormBase';
import './Login.css';

const LoginPage: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar color="favorite">
        <IonTitle className="title">Login</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding" color="light">
      <SignInFormBase />
    </IonContent>
  </IonPage>
);

export default LoginPage;
