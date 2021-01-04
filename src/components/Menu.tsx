import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonButton
} from '@ionic/react';

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  heartOutline,
  heartSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
  logOut
} from 'ionicons/icons';
import './Menu.css';
import { useCookies } from "react-cookie";
import { useHistory } from 'react-router-dom';
import { logout } from './../utils/db';

import { withCookies, Cookies } from 'react-cookie';
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
    setUsername(capitalize(props.cookies.get('usuario') || ''));
  });

  const logoutAction = () => {
    console.log('x')
    removeCookie("usuario", {path: '/'});
    removeCookie("ticket", {path: '/'});
    logout();
    history.push('/login');
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
                  onClick={logout}
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
              <IonButton>Salir</IonButton>
            </IonItem>
            </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withCookies(Menu);
