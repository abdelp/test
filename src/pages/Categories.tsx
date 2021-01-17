import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton
} from '@ionic/react';
import React, { useEffect } from 'react';
import './Categories.css';
import { useHistory } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import { useCookies } from "react-cookie";

const CategoriesPage: React.FC = (props: any) => {
  const history = useHistory();
  const [cookies, setCookie] = useCookies(["user"]);

  const goToCategory = (category: any) => {
    setCookie('categoria', category, { path: '/' });
    history.push(`/page/regist-user`);
  }

  useEffect(() => {
    const usuario = props.cookies.get('usuario');

    if (!usuario || usuario === 'null') {
      history.push('/login');
    }
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="favorite">
          <IonButtons slot="start">
            <IonMenuButton autoHide={false} />
          </IonButtons>
          <IonTitle className="ion-text-center">Categorías</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="page">
        <div className="flex" style={{display: 'flex', flexWrap: 'wrap'}}>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Motocicleta</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <br/>
              <IonButton onClick={() => goToCategory('motocicleta')} color="favorite">Seleccionar</IonButton>
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Particular</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>

              <br/>
              <IonButton onClick={goToCategory} color="favorite">Seleccionar</IonButton>
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Profesional a</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>

              <br/>
              <IonButton onClick={goToCategory} color="favorite">Seleccionar</IonButton>
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Profesional b</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>

              <br/>
              <IonButton onClick={goToCategory} color="favorite">Seleccionar</IonButton>
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Profesional c</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>

              <br/>
              <IonButton onClick={goToCategory} color="favorite">Seleccionar</IonButton>
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Profesional a superior</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>

              <br/>
              <IonButton onClick={goToCategory} color="favorite">Seleccionar</IonButton>
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Profesional b superior</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>

              <br/>
              <IonButton onClick={goToCategory} color="favorite">Seleccionar</IonButton>
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Extranjero</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <br/>
              <IonButton onClick={goToCategory} color="favorite">Seleccionar</IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default withCookies(CategoriesPage);
