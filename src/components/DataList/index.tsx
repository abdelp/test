import React from "react";
import {
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";

const DataList = ({ user }: any) => {
  return (
    <IonList className="datosdeinteresado">
      <IonItem>
        <IonLabel>
          <strong>Nombres:</strong> {user.nombres}
        </IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>
          <strong>Apellidos:</strong> {user.apellidos}
        </IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>
          <strong>Nro. Antecedente:</strong> {user.idAntecedente}
        </IonLabel>
      </IonItem>
      <IonItem lines="none">
        <IonLabel>
          <strong>Categoría:</strong> {user.categoria}
        </IonLabel>
      </IonItem>
    </IonList>
  );
};

export default DataList;
