import { IonButtons, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonIcon, IonSpinner } from '@ionic/react';
import { logIn } from 'ionicons/icons';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import { useHistory } from 'react-router-dom';
import { getTestedUserData } from '../APIs';
import './RegistUser.css';

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
    setError({message: ''});
    setUser(null);
    event.preventDefault();
    getTestedUserData(rut)
    .then((result: any) => {
      setUser(result);
      setLoading(false);
    })
    .catch(err => {
      setError(err);
      setLoading(false);
    });
  }
  
  const confirmUserTested = () => {
    history.push('/page/test-types');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Indique el RUT del conductor</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <form className="ion-padding login-list" onSubmit={consultUserData}>
          <IonItem>
            <IonLabel position="floating">RUT</IonLabel>
            <IonInput value={rut} onIonChange={handleRutChange} autofocus />
          </IonItem>
          <input type="submit" className="submit-btn" value="Consultar" />
          {error && <p className="error-msg">{error.message}</p>}
        </form>

        <IonList>
        { loading && <IonItem><IonSpinner className="loading" /></IonItem> }
            { user &&
              <>
                <IonItem>
                  <IonLabel><strong>Nombre:</strong> {user.nombre}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel><strong>C.I.:</strong> {user.ci}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel><strong>Fecha de nacimiento:</strong> {user.fechaNac}</IonLabel>
                </IonItem>
                <IonItem>
                  <input type="button" onClick={confirmUserTested} className="submit-btn confirm-btn" value="Confirmar" />
                </IonItem>
              </>
          }
          </IonList>
      </IonContent>
    </IonPage>
  );
};

export default RegistUserPage;
