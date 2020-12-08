import { IonButtons, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonIcon } from '@ionic/react';
import { logIn } from 'ionicons/icons';
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Login.css';
import { useHistory } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const history = useHistory();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleUserChange = (event: any) =>
    setUsername(event.target.value);

  const handlePasswordChange = (event: any) =>
    setPassword(event.target.value);

  const login = () => {
    history.push('/page/categories');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="title">Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding" color="light">
        <IonList lines="none" className="login-list">
          <IonItem>
            <IonLabel position="stacked">Usuario</IonLabel>
            <IonInput value={username} onIonChange={handleUserChange} autofocus={true}> </IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Contraseña</IonLabel>
            <IonInput value={password} type="password" onIonChange={handlePasswordChange}> </IonInput>
          </IonItem>
          <IonItem>
            <IonButton onClick={login} size="default" className="btn center">
              Login
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
