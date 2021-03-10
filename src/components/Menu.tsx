//@ts-nocheck

import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonPopover,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonImg,
} from "@ionic/react";

import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./Menu.css";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import SignInFormBase from "../components/SignInFormBase";
import iconoFinalizar from "../assets/menu-check.svg";
import iconoCerrar from "../assets/menu-power.svg";
import * as ROUTES from "../constants/routes";
import { compose } from "recompose";
interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [];

const capitalize = (string: string) =>
  string.replace(/^\w/, (c) => c.toUpperCase());

const Menu: React.FC = (props: any) => {
  const location = useLocation();
  const [showLogin, setShowLogin] = useState<any>();
  const [username, setUsername] = useState<string>();
  const menu = useRef(null);

  useEffect(() => {
    const usuario = props.cookies.get("usuario");
    if (usuario) {
      setUsername(capitalize(props.cookies.get("usuario").username || ""));
    } else {
      setUsername("");
    }
  });

  const logoutUser = () => {
    props.cookies.remove("usuario", { path: "/" });
    props.cookies.remove("categoria", { path: "/" });
    props.cookies.remove("usuario_testeado", { path: "/" });

    menu.current.toggle();
    props.history.replace("/");
  };

  const logoutAction = () => {
    const usuarioTesteado = props.cookies.get("usuario_testeado");
    if (usuarioTesteado) {
      setShowLogin(true);
    } else {
      logoutUser();
    }
  };

  return (
    <IonMenu ref={menu} contentId="main" type="overlay" swipeGesture={false}>
      <IonHeader>
        <IonToolbar color="favorite">
          <IonTitle className="titulo-de-menu">Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonPopover cssClass="login-popover ion-text-center" isOpen={showLogin} 
        onDidDismiss={() => setShowLogin(false)}
        >
          {/*
            //@ts-ignore */}
          <SignInFormBase setShowLogin={setShowLogin} />
        </IonPopover>

        <IonList id="inbox-list" lines="none">
          <IonListHeader>{username}</IonListHeader>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}

          <IonMenuToggle key={"exit"} autoHide={false}>
            <IonItem
              lines="none"
              detail={false}
              onClick={logoutAction}
            ></IonItem>
          </IonMenuToggle>

          <section>
            <IonItem className="botonmenu">Salir</IonItem>
            {props.cookies.get("usuario_testeado") && (
              <IonItem className="botonmenu" onClick={logoutAction}>
                <IonImg className="iconomenu" src={iconoFinalizar}></IonImg>{" "}
                Finalizar Prueba
              </IonItem>
            )}
            {!props.cookies.get("usuario_testeado") && (
              <IonItem className="botonmenu" onClick={logoutAction}>
                <IonImg className="iconomenu" src={iconoCerrar}></IonImg> Cerrar
                Sesión
              </IonItem>
            )}
          </section>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default compose(withCookies, withRouter)(Menu);
