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
  return (<form className="ion-padding login-list" onSubmit={onSubmit}>
    <IonItem>
      <IonLabel position="floating">C.I.</IonLabel>
      <IonInput name="rut" value={rut} onIonChange={handleChange} autofocus />
    </IonItem>
    <input type="submit" className="submit-btn" value="Consultar" />
    {error && <p className="error-msg">{error.message}</p>}
  </form>);
};

export default SearchTestedUserFormBase;