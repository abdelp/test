import React from 'react';
import {
  IonItem,
  IonLabel,
  IonInput,
  IonList
} from '@ionic/react';

const DataList = ({
  user,
  onClick
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
    <IonItem>
      <input type="button" onClick={onClick} className="submit-btn confirm-btn" value="Confirmar" />
    </IonItem>
  </IonList>
  );
};

export default DataList;