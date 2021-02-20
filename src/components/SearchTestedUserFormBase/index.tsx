import React, { useEffect } from "react";
import { IonItem, IonInput } from "@ionic/react";

const SearchTestedUserFormBase = ({
  onSubmit,
  handleChange,
  nroDocumento,
  error,
}: any) => {

  useEffect(() => {
    console.log('mounted child: []');
    return () => {
      console.log('unmounted child: []');
    }
  }, []);

  return (
    <form className="ion-padding login-list" onSubmit={onSubmit}>
      <IonItem lines="none">
        <IonInput
          name="nroDocumento"
          value={nroDocumento}
          onIonChange={handleChange}
          autofocus
          placeholder="C.I. N°"
        />
      </IonItem>
      <input
        type="submit"
        className="submit-btn"
        value="Aceptar"
        disabled={!nroDocumento}
      />
      {error && <p className="error-msg">{error.message}</p>}
    </form>
  );
};

export default SearchTestedUserFormBase;
