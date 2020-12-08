import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonRadioGroup, IonListHeader, IonLabel, IonItem, IonRadio, IonItemDivider, IonButton, IonInput } from '@ionic/react';
import Timer from './Timer';

const MultipleOptionsPage: React.FC = () => {
  const [selected, setSelected] = useState<string>('biff');
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Test de Selección Múltiple</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList lines="none">
          <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)}>
            <IonListHeader>
              <IonLabel>Qué hacer cuando el semáforo está en rojo?</IonLabel>
            </IonListHeader>

            <IonItem>
              <IonLabel>Parar</IonLabel>
              <IonRadio slot="start" value="biff" />
            </IonItem>

            <IonItem>
              <IonLabel>Acelerar</IonLabel>
              <IonRadio slot="start" value="griff" />
            </IonItem>

            <IonItem>
              <IonLabel>Poner atención</IonLabel>
              <IonRadio slot="start" value="buford" />
            </IonItem>
          </IonRadioGroup>

          <IonItem>
            Tiempo restante: <Timer></Timer>
          </IonItem>

          <IonItem>
            <IonButton size="default">
              Siguiente
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default MultipleOptionsPage;