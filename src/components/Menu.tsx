import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonButton
} from '@ionic/react';

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Menu.css';
import { useCookies } from "react-cookie";
import { useHistory } from 'react-router-dom';

import { withCookies } from 'react-cookie';
interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
];

const capitalize = (string: string) =>
  string.replace(/^\w/, c => c.toUpperCase());

const Menu: React.FC = (props: any) => {
  const location = useLocation();
  const history = useHistory();
  const [username, setUsername] = useState<string>();
  const [cookies, setCookie, removeCookie] = useCookies(["usuario"]);

  useEffect(() => {
    const usuario = props.cookies.get('usuario');
    console.log(usuario);
    if (usuario) {
      setUsername(capitalize(props.cookies.get('usuario').username || ''));
    } else {
      setUsername('');
    }
  });

  const logoutAction = () => {
    removeCookie("usuario", {path: '/'});
    removeCookie("categoria", {path: '/'});
    removeCookie("usuario_testeado", {path: '/'});
    history.replace('/login');
  }

  return (
    <IonMenu contentId="main" type="overlay" swipeGesture={false}>
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>{username}</IonListHeader>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={location.pathname === appPage.url ? 'selected' : ''}
                  // routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}

          <IonMenuToggle key={'exit'} autoHide={false}>
            <IonItem
              lines="none"
              detail={false}
              onClick={logoutAction}
            >
            </IonItem>
          </IonMenuToggle>
            <section>
              <IonButton color="favorite" expand="block" onClick={logoutAction}>Salir</IonButton>
            </section>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withCookies(Menu);
