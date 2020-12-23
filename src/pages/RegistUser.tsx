import { IonButtons, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonIcon, IonSpinner } from '@ionic/react';
import { logIn } from 'ionicons/icons';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import { useHistory } from 'react-router-dom';
import { getTestedUserData } from '../APIs';

const RegistUserPage: React.FC = () => {
  const history = useHistory();
  const [rut, setRut] = useState<string>();
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState({message: ''});

  const handleRutChange = (event: any) =>
    setRut(event.target.value);

  const consultUserData = (event: any) => {
    setLoading(true);
    event.preventDefault();
    getTestedUserData(rut)
    .then((result: any) => {
      console.log(result);
      setUser(result);
      setLoading(false);
    })
    .catch(err => console.log(err));
  }
  
  const confirmUserTested = () => {
    history.push('/page/test-types');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Indique el RUT del conductor</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <form className="ion-padding login-list" onSubmit={consultUserData}>
          <IonItem>
            <IonLabel position="floating">RUT</IonLabel>
            <IonInput value={rut} onIonChange={handleRutChange} autofocus={true} />
          </IonItem>
          <IonButton size="default" className="btn center" type="submit">
            { loading ? <IonSpinner/> : 'Consultar' }
          </IonButton>
          {error && <p className="error-msg">{error.message}</p>}
        </form>

        {user &&
          <div>
            <p>Nombre: {user.name}</p>
            <p>C.I: {user.ci}</p>
            <p>Fecha de nacimiento: {user.birthDate}</p>

            <IonButton onClick={confirmUserTested}>
              Confirmar
            </IonButton>
          </div>
        }
      </IonContent>
    </IonPage>
  );
};

export default RegistUserPage;
