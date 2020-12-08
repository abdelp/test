import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import { useHistory } from 'react-router-dom';

const CategoriesPage: React.FC = () => {
  const history = useHistory();

  const goToCategory = (category: any) =>
    history.push(`/page/regist-user`);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Categorías</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="flex" style={{display: 'flex', flexWrap: 'wrap'}}>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Conductor B2</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              Keep close to Nature's heart... and break clear away, once in awhile,
              and climb a mountain or spend a week in the woods. Wash your spirit clean.
              <br/>
              <IonButton onClick={goToCategory}>Seleccionar</IonButton>
            </IonCardContent>
          </IonCard>

          <IonCard onClick={goToCategory}>
            <IonCardHeader>
              <IonCardTitle>Profesional</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              Keep close to Nature's heart... and break clear away, once in awhile,
              and climb a mountain or spend a week in the woods. Wash your spirit clean.
              <br/>
              <IonButton>Seleccionar</IonButton>
            </IonCardContent>
          </IonCard>

          <IonCard onClick={goToCategory}>
            <IonCardHeader>
              <IonCardTitle>Card Title</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              Keep close to Nature's heart... and break clear away, once in awhile,
              and climb a mountain or spend a week in the woods. Wash your spirit clean.
              <br/>
              <IonButton>Seleccionar</IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CategoriesPage;
