import { IonPage, IonContent } from "@ionic/react";
import React from "react";
import Header from "../components/Header";
import SignInFormBase from "../components/SignInFormBase";
import "./Login.css";

const LoginPage: React.FC = () => (
  <IonPage id="login-page">
    <Header color="favorite" title="Login" />
    <IonContent className="ion-padding">
      <div className="grilla">
        <SignInFormBase />
        <p>v1.0.1</p>
      </div>
    </IonContent>
  </IonPage>
);

export default LoginPage;
