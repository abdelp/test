import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import { Title } from "../../interfaces";

const Header: React.FC<Title> = ({ color, title }: Title) => (
  <IonHeader>
    <IonToolbar color={color}>
      <IonTitle className="title">{title}</IonTitle>
    </IonToolbar>
  </IonHeader>
);

export default Header;
