import React from 'react';
import {
  IonItem,
  IonLabel,
  IonInput
} from '@ionic/react';

const SearchTestedUserFormBase = ({
  onSubmit,
  handleChange,
  nroDocumento,
  error
}: any) => {
  return (
    <form className="ion-padding login-list" onSubmit={onSubmit}>
      <IonItem lines="none">
        <IonInput name="nroDocumento" value={nroDocumento} onIonChange={handleChange} autofocus placeholder="C.I. N°" />
      </IonItem>
      <input type="submit" className="submit-btn" value="Aceptar" />
      {error && <p className="error-msg">{error.message}</p>}
    </form>
  );
};

export default SearchTestedUserFormBase;