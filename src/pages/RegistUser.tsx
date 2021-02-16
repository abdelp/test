import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonMenuButton,
  IonSpinner,
  IonAlert
} from "@ionic/react";
import React, { useState } from "react";
import to from "await-to-js";

import { withRouter } from "react-router-dom";
import { obtenerDatosUsuarioTesteado } from "../APIs";
import "./RegistUser.css";
import SearchTestedUserFormBase from "../components/SearchTestedUserFormBase";
import DataList from "../components/DataList";

import { useCookies } from "react-cookie";

import {
  obtenerDatosUsuarioTesteadoPorNroDocumentoYAntecedente,
  agregarUsuarioTesteado,
} from "../utils/db";

import { UserProps } from "../interfaces";

const RegistUserPage: React.FC<UserProps> = ({ history }) => {
  const [state, setState]: any = useState<any>({
    nroDocumento: "",
    user: null,
    loading: false,
    error: null,
  });
  const [showAlert, setShowAlert]: any = useState<any>({show: false, message: ''});
  const [cookies, setCookie] = useCookies(["usuario_testeado"]);

  const handleChange = (event: any) =>
    setState((state: any) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));

  const consultUserData = async (event: any) => {
    setState((state: any) => ({
      ...state,
      user: null,
      loading: true,
      error: { message: "" },
    }));
    event.preventDefault();

    const [err, result] = await to(
      obtenerDatosUsuarioTesteado(
        cookies.usuario.ticket.text,
        state.nroDocumento,
        "cedula"
      )
    );

    if (err) {
      setState((state: any) => ({ ...state, error: err, loading: false }));
    } else {
      if (result?.cantidad === "0") {
        setState((state: any) => ({
          ...state,
          error: {
            message:
              "Nro. de antecedente no encontrado, favor verifique que el número de documento esté correcto.",
          },
          loading: false,
        }));
      } else {
        setState((state: any) => ({ ...state, user: result, loading: false }));
      }
    }
  };

  const confirmarUsuarioATestear = async () => {
    const [error, result] = await to(
      obtenerDatosUsuarioTesteadoPorNroDocumentoYAntecedente(
        state.user.nroDocumento,
        "cedula",
        state.user.idAntecedente
      )
    );

    if(error) {
      setShowAlert({show: true, message: error.message });
    } else {
      if (!result) agregarUsuarioTesteado(state.user);

      setCookie(
        "usuario_testeado",
        {
          nombres: state.user.nombres,
          apellidos: state.user.apellidos,
          nroDocumento: state.user.nroDocumento,
          idAntecedente: state.user.idAntecedente,
          categoria: state.user.categoria,
          tramite: state.user.tramite,
        },
        { path: "/" }
      );

      setCookie("categoria", state.user.categoria, { path: "/" });

      history.replace({
        pathname: "/page/test-types",
        state: state.user,
      });
    }

    return;
  };

  const { nroDocumento, user, error, loading } = state;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="favorite">
          <IonButtons slot="start">
            <IonMenuButton autoHide={false} />
          </IonButtons>
          <IonTitle className="ion-text-center title">
            Ingresar C.I.N&deg; / Pasaporte
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonAlert
          isOpen={showAlert.show}
          cssClass="my-custom-class"
          header={"Error"}
          message={showAlert.message}
          buttons={[
            {
              text: "Aceptar",
              role: "cancel",
              cssClass: "secondary",
              handler: () => {
                setState((state: any) => ({ ...state, showAlert: false }));
              },
            }
          ]}
          />
        <div className="grilla">
          <SearchTestedUserFormBase
            onSubmit={consultUserData}
            handleChange={handleChange}
            nroDocumento={nroDocumento}
            error={error}
          />

          {loading && (
            <IonItem>
              <IonSpinner className="loading" />
            </IonItem>
          )}

          {user?.nombres && (
            <>
              <DataList user={user} />
              <input
                type="button"
                onClick={confirmarUsuarioATestear}
                className="submit-btn confirm-btn"
                value="Confirmar"
              />
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default withRouter(RegistUserPage);
