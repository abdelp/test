import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import { Title } from "../../interfaces";

const Header: React.FC<Title> = ({ color, children }: Title) => (
  <IonHeader>
    <IonToolbar color={color}>
      <IonTitle className="title">{children}</IonTitle>
    </IonToolbar>
  </IonHeader>
);

export default Header;
