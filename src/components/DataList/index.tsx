import React from 'react';
import {
  IonItem,
  IonLabel,
  IonList
} from '@ionic/react';

const DataList = ({
  user
}: any) => {
  return (
  <IonList>
    <IonItem>
      <IonLabel><strong>Nombre:</strong> {user.nombre}</IonLabel>
    </IonItem>
    <IonItem>
      <IonLabel><strong>C.I.:</strong> {user.ci}</IonLabel>
    </IonItem>
    <IonItem>
      <IonLabel><strong>Fecha de nacimiento:</strong> {user.fechaNac}</IonLabel>
    </IonItem>
    <IonItem>
      <IonLabel><strong>Domicilio:</strong> {user.domicilio}</IonLabel>
    </IonItem>
    <IonItem>
      <IonLabel><strong>Nacionalidad:</strong> {user.nacionalidad}</IonLabel>
    </IonItem>
  </IonList>
  );
};

export default DataList;