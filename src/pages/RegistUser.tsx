import { IonButtons, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonIcon } from '@ionic/react';
import { logIn } from 'ionicons/icons';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import { useHistory } from 'react-router-dom';

const RegistUserPage: React.FC = () => {
  const history = useHistory();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleUserChange = (event: any) =>
    setUsername(event.target.value);

  const handlePasswordChange = (event: any) =>
    setPassword(event.target.value);

  const registUser = () => {
    console.log(username);
    console.log(password);
    history.push('/page/test-types');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Indique el RUT del conductor</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonList lines="none">
          <IonItem>
            <IonLabel position="stacked">RUT</IonLabel>
            <IonInput value={username} onIonChange={handleUserChange}> </IonInput>
          </IonItem>
        </IonList>

        <IonButton onClick={registUser}>
          Aceptar
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default RegistUserPage;
