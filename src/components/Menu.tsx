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

import React from 'react';
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

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Parámetros',
    url: '/page/Inbox',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  // {
  //   title: 'Salir',
  //   url: '/page/Spam',
  //   iosIcon: warningOutline,
  //   mdIcon: logOut
  // }
];

const Menu: React.FC = () => {
  const location = useLocation();
  const [cookies, setCookie] = useCookies(["user"]);
  const history = useHistory();

  const logoutAction = () => {
    // setCookie("ticket", null, {
    //   path: "/"
    // });
    debugger;
    logout();
    history.replace('/');
  }

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Inbox</IonListHeader>
          <IonNote>hi@ionicframework.com</IonNote>
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
            <IonItem
              lines="none"
              detail={false}
              onClick={logoutAction}
            >
              <IonButton>Salir</IonButton>
            </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
