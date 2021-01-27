import React from 'react';
import {
  IonItem,
  IonLabel,
  IonInput
} from '@ionic/react';

const SearchTestedUserFormBase = ({
  onSubmit,
  handleChange,
  rut,
  error
}: any) => {
  return (
    <form className="ion-padding login-list" onSubmit={onSubmit}>
      <IonItem lines="none">
        <IonInput name="rut" value={rut} onIonChange={handleChange} autofocus placeholder="C.I. N°" />
      </IonItem>
      <input type="submit" className="submit-btn" value="Aceptar" />
      {error && <p className="error-msg">{error.message}</p>}
    </form>
  );
};

export default SearchTestedUserFormBase;