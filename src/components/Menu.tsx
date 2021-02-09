import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonButton,
  IonPopover,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonImg,
} from "@ionic/react";

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Menu.css";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import SignInFormBase from "../components/SignInFormBase";
import { withCookies } from "react-cookie";
import iconoFinalizar from "../assets/menu-check.svg";
import iconoCerrar from "../assets/menu-power.svg";

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
  const history = useHistory();
  const [showLogin, setShowLogin] = useState<any>();
  const [username, setUsername] = useState<string>();
  const [cookies, setCookie, removeCookie] = useCookies(["usuario"]);

  useEffect(() => {
    const usuario = props.cookies.get("usuario");
    if (usuario) {
      setUsername(capitalize(props.cookies.get("usuario").username || ""));
    } else {
      setUsername("");
    }
  });

  const logoutUser = () => {
    removeCookie("usuario", { path: "/" });
    removeCookie("categoria", { path: "/" });
    removeCookie("usuario_testeado", { path: "/" });
    history.replace("/login");
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
    <IonMenu contentId="main" type="overlay" swipeGesture={false}>
      <IonHeader>
        <IonToolbar color="favorite">
          <IonTitle className="titulo-de-menu">Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonPopover cssClass="login-popover ion-text-center" isOpen={showLogin}>
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
                  // routerLink={appPage.url}
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
            {/* {props.cookies.get('usuario_testeado') && */}
            <IonItem className="botonmenu" onClick={logoutAction}>
              Salir
            </IonItem>
            {/* } */}
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

export default withCookies(Menu);
