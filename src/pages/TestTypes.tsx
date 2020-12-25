import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import { useHistory } from 'react-router-dom';

const TestTypesPage: React.FC = () => {
  const history = useHistory();

  const goToTest = (test: any) =>
    history.push(`/page/tutorial`);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Tests</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="flex" style={{display: 'flex', flexWrap: 'wrap'}}>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Teórico</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <br/>
              <IonButton onClick={goToTest}>Empezar</IonButton>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Psicotécnico</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <br/>
              <IonButton onClick={goToTest}>Empezar</IonButton>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Prueba de manejo</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <br/>
              <IonButton onClick={goToTest}>Empezar</IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TestTypesPage;
