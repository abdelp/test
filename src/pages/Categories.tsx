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
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonMenuToggle
} from '@ionic/react';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Categories.css';
import { useHistory } from 'react-router-dom';
import { getCategories } from '../APIs';
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
    console.log(usuario);

    if (!usuario || usuario === 'null') {
      history.push('/login');
    }
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton autoHide={false} />
          </IonButtons>
          <IonTitle>Categorías</IonTitle>
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
              <IonButton onClick={() => goToCategory('motocycleta')}>Seleccionar</IonButton>
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Particular</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>

              <br/>
              <IonButton onClick={goToCategory}>Seleccionar</IonButton>
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Profesional a</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>

              <br/>
              <IonButton onClick={goToCategory}>Seleccionar</IonButton>
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Profesional b</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>

              <br/>
              <IonButton onClick={goToCategory}>Seleccionar</IonButton>
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Profesional c</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>

              <br/>
              <IonButton onClick={goToCategory}>Seleccionar</IonButton>
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Profesional a superior</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>

              <br/>
              <IonButton onClick={goToCategory}>Seleccionar</IonButton>
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Profesional b superior</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>

              <br/>
              <IonButton onClick={goToCategory}>Seleccionar</IonButton>
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Extranjero</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <br/>
              <IonButton onClick={goToCategory}>Seleccionar</IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default withCookies(CategoriesPage);
