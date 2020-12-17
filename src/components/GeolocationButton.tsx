import React, { useState } from 'react';
import { IonButton, IonLoading, IonToast } from '@ionic/react';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

interface LocationError {
  showError: boolean;
  message?: string;
}

const GeolocationButton: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<LocationError>({showError: false})
  const [position, setPosition] = useState<Geoposition>();

  const getLocation = async () => {
    setLoading(true);
    try {
      const position = await Geolocation.getCurrentPosition();
      setPosition(position);
      setLoading(false);
      setError({ showError: false, message: undefined });
    } catch(e) {
      const message = e.message.length > 0 ? e.message : "Cannot get user location. Check permissions.";
      setError({ showError: true, message})
      setLoading(false);
    }
  }

  return (
    <>
      <IonLoading
        isOpen={loading}
        message={"Obteniendo ubicación..."}
        onDidDismiss={() => setLoading(false)}
       />
       <IonToast
        isOpen={error.showError}
        message={error.message}
        onDidDismiss={() => setError({message: undefined, showError: false })}
        duration={3000}
        />
      <IonButton onClick={getLocation}>
        {
          position ? `${position.coords.latitude} ${position.coords.longitude}` : "Get Location"
        }
      </IonButton>
    </>
  )
};

export default GeolocationButton;