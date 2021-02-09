import { IonPage, IonContent } from "@ionic/react";
import React from "react";
import SignInFormBase from "../components/SignInFormBase";
import Header from "../components/Header";
import "./Login.css";

const LoginPage: React.FC = () => (
  <IonPage>
    <Header color="favorite" title="Login" />
    <IonContent id="login-content" className="ion-padding">
      <div className="grilla">
        <SignInFormBase />
      </div>
      <p>v1.0.1</p>
    </IonContent>
  </IonPage>
);

export default LoginPage;
