import React from 'react';
import {
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonTitle
} from '@ionic/react';

const DataList = ({
  user
}: any) => {
  return (
  <IonList className="datosdeinteresado">
    <IonListHeader>
      <IonTitle className="ion-text-center"><strong>Datos del interesado</strong></IonTitle>
    </IonListHeader>
    <IonItem>
      <IonLabel><strong>Nombres:</strong> {user.nombres}</IonLabel>
    </IonItem>
    <IonItem>
      <IonLabel><strong>Apellidos:</strong> {user.apellidos}</IonLabel>
    </IonItem>
    <IonItem>
      <IonLabel><strong>C.I.:</strong> {user.ci}</IonLabel>
    </IonItem>
    <IonItem>
      <IonLabel><strong>Nro. Antecedente:</strong> {user.nroAntecedente}</IonLabel>
    </IonItem>
    <IonItem lines="none">
      <IonLabel><strong>Categoria:</strong> {user.categoria}</IonLabel>
    </IonItem>
  </IonList>
  );
};

export default DataList;