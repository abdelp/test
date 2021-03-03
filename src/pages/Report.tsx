import {
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonAlert,
  IonLabel,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import {
  obtenerDatosUsuarioTesteadoPorNroDocumentoYAntecedente,
  actualizarDatosUsuarioTesteadoPorNroDocumentoYAntecedente,
} from "../utils/db";
import DataList from "../components/DataList";
import "./Report.css";
import { withCookies } from "react-cookie";
import { enviarResultado } from "../APIs";
import to from "await-to-js";

const round = (value: any) => value.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];

const ReportPage: React.FC = ({ cookies }: any) => {
  const history = useHistory();
  const [state, setState]: any = useState<any>({
    nroDocumento: "",
    user: null,
    aprobado: false,
    porcentajes: {
      declaracionJurada: 0,
      practico: 0,
      teorico: 0,
      testMemorizarNumeros: 0,
      testColores: 0,
      testDirecciones: 0,
      testNumerosGrandes: 0,
      testPosicionesBloques: 0,
    },
    loading: false,
    error: null,
  });

  const [showAlert, setShowAlert] = useState<any>({
    show: false,
    message: "",
    title: "",
  });

  useEffect(() => {
    const { nroDocumento, idAntecedente } = cookies.get("usuario_testeado");
    obtenerDatosUsuarioTesteadoPorNroDocumentoYAntecedente(
      nroDocumento,
      "cedula",
      idAntecedente
    )
      .then((result: any) => {
        setState((state: any) => ({ ...state, user: result }));
        calculateResults(result);
      })
      .catch((error: any) => console.log(error));

    return () => {
      console.log("componente desmontado");
    };
  }, []);

  const returnMenu = () => {
    history.replace("/page/test-types");
  };

  const examPassed = (examPercentage: any) => examPercentage >= 70;

  const calculateResults = async (usuario: any) => {
    const categoria = cookies.get("categoria");
    const declaracionJurada = usuario.examenes[categoria].declaracionJurada
      ? 100
      : 0;

    let respuestasPractico,
      respuestasCorrectasPractico,
      porcentajePractico = 0,
      respuestasTeorico,
      respuestasCorrectasTeorico,
      porcentajeTeorico = 0;

    if (categoria !== "EXTRANJERO" && usuario.tramite !== "RENOVACIÓN") {
      respuestasPractico = usuario.examenes[categoria].practico.declaracion
        .map((i: any) => i.items.map((si: any) => si.respuesta))
        .flat();

      respuestasCorrectasPractico = respuestasPractico.filter(
        (correcta: any) => correcta
      );
      porcentajePractico =
        (respuestasCorrectasPractico.length * 100) / respuestasPractico.length;
      respuestasTeorico = usuario.examenes[categoria].teorica.result;
      respuestasCorrectasTeorico = respuestasTeorico.filter(
        (q: any) => q.respuesta === q.selected
      );
      porcentajeTeorico = round(
        (respuestasCorrectasTeorico.length * 100) / respuestasTeorico.length
      );
    }

    const respuestasMemorizarNumeros =
      usuario.examenes[categoria].psiquica["memorizar numeros"];

    let respuestasCorrectasMemorizarNumeros = 0;

    for (let i = 0; i < respuestasMemorizarNumeros.numerosAElegir.length; i++) {
      const numerosAElegir = JSON.stringify(
        respuestasMemorizarNumeros.numerosAElegir[i]
      );
      const numerosElegidos = JSON.stringify(
        respuestasMemorizarNumeros.numerosElegidos[i].map((n: any) =>
          n.toString()
        )
      );

      if (numerosAElegir === numerosElegidos) {
        respuestasCorrectasMemorizarNumeros++;
      }
    }

    const porcentajeMemorizarNumeros = round(
      (respuestasCorrectasMemorizarNumeros * 100) /
        respuestasMemorizarNumeros.numerosAElegir.length
    );

    const respuestasColores =
      usuario.examenes[categoria].psiquica["test-colores"];

    const respuestasCorrectasColores = respuestasColores.filter((r: any) => {
      return (
        (r.indiceAElegir === r.indiceCodigo && r.respuestaUsuario) ||
        (r.indiceAElegir !== r.indiceCodigo && !r.respuestaUsuario)
      );
    });

    const porcentajeTestColores = round(
      (respuestasCorrectasColores.length * 100) / respuestasColores.length
    );

    const respuestasDirecciones =
      usuario.examenes[categoria].psiquica["test-direcciones"];

    const respuestasCorrectasDirecciones = respuestasDirecciones.filter(
      (r: any) => r.indiceAElegir === r.respuestaUsuario
    );

    const porcentajeTestDirecciones = round(
      (respuestasCorrectasDirecciones.length * 100) /
        respuestasDirecciones.length
    );

    const respuestasNumerosGrandes =
      usuario.examenes[categoria].psiquica["numero-grande"];

    const respuestasCorrectasNumerosGrandes = respuestasNumerosGrandes.filter(
      (r: any) => r.numeroAElegir === r.respuestaUsuario
    );

    const porcentajeTestNumerosGrandes = round(
      (respuestasCorrectasNumerosGrandes.length * 100) /
        respuestasNumerosGrandes.length
    );

    const respuestasPosicionesBloques =
      usuario.examenes[categoria].psiquica["posiciones bloques"];

    let respuestasCorrectasPosicionesBloques = 0;

    for (
      let i = 0;
      i < respuestasPosicionesBloques.bloquesAElegir.length;
      i++
    ) {
      const bloquesAElegir = JSON.stringify(
        respuestasPosicionesBloques.bloquesAElegir[i]
      );
      const bloquesElegidos = JSON.stringify(
        respuestasPosicionesBloques.bloquesElegidos[i]
      );

      if (bloquesAElegir === bloquesElegidos) {
        respuestasCorrectasPosicionesBloques++;
      }
    }

    const porcentajePosicionesBloques = round(
      (respuestasCorrectasPosicionesBloques * 100) /
        respuestasPosicionesBloques.bloquesAElegir.length
    );

    const testsArray = [
      declaracionJurada,
      porcentajeMemorizarNumeros,
      porcentajeTestColores,
      porcentajeTestDirecciones,
      porcentajeTestNumerosGrandes,
      porcentajePosicionesBloques,
    ];

    if (categoria !== "EXTRANJERO" && usuario.tramite !== "RENOVACIÓN") {
      testsArray.push(porcentajePractico);
      testsArray.push(porcentajeTeorico);
    }

    let aprobado = false;

    if (testsArray.every(examPassed)) {
      aprobado = true;
      let [error] = await to(
        actualizarDatosUsuarioTesteadoPorNroDocumentoYAntecedente(
          usuario.nroDocumento,
          "cedula",
          usuario.idAntecedente,
          { aprobado: true }
        )
      );

      const { ticket } = cookies.get("usuario");
      const { idAntecedente } = cookies.get("usuario_testeado");

      let [err, enviado] = await to(
        enviarResultado(ticket.text, "", idAntecedente, true)
      );

      if (err) {
        const mensaje = "No se pudo enviar el resultado";
        setShowAlert({ show: true, message: mensaje, title: "Error" });
      } else {
        if (enviado?.codError === "0") {
          await actualizarDatosUsuarioTesteadoPorNroDocumentoYAntecedente(
            usuario.nroDocumento,
            "cedula",
            usuario.idAntecedente,
            { sincronizado: true }
          );
          setShowAlert({
            show: true,
            message: "Resultado enviado correctamente",
            title: "Confirmación",
          });
        } else {
          setShowAlert({
            show: true,
            message:
              "No se pudo enviar el resultado, favor verifique su conexión a internet",
            title: "Error",
          });
        }
      }
    } else {
      console.log("no se pasaron todos los examenes");
    }

    let nuevosPorcentajes = {
      declaracionJurada,
      practico: porcentajePractico,
      teorico: porcentajeTeorico,
      testMemorizarNumeros: porcentajeMemorizarNumeros,
      testColores: porcentajeTestColores,
      testDirecciones: porcentajeTestDirecciones,
      testNumerosGrandes: porcentajeTestNumerosGrandes,
      testPosicionesBloques: porcentajePosicionesBloques,
    };

    setState((state: any) => ({
      ...state,
      porcentajes: nuevosPorcentajes,
      aprobado: aprobado,
    }));
  };

  const { user, porcentajes, aprobado } = state;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="favorite">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="ion-text-center title">Informe</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonAlert
          isOpen={showAlert.show}
          onDidDismiss={() =>
            setShowAlert({ show: false, message: "", title: "" })
          }
          cssClass="my-custom-class"
          header={showAlert.title}
          message={showAlert.message}
          buttons={[
            {
              text: "Ok",
              handler: () => {
                // setShowAlert(false)
              },
            },
          ]}
        />

        {user && (
          <>
            <DataList user={user} />
            <IonItem>
              <IonLabel>
                <strong>Resultado:</strong>{" "}
                {aprobado ? "APROBADO" : "NO APROBADO"}
              </IonLabel>
            </IonItem>
            <IonTitle className="report-title">Declaración Jurada</IonTitle>
            <IonItem>
              <div className="percentage-container">
                <div className="percentage-text">Declaración Jurada</div>
                <div className="percentage-number" id="file">
                  <div className="w3-light-grey w3-round verde">
                    <div
                      className="w3-container w3-blue w3-round "
                      style={{
                        width: `${porcentajes.declaracionJurada}%`,
                        height: "100%",
                      }}
                    ></div>
                  </div>
                  <b>{porcentajes.declaracionJurada}%</b>
                </div>
              </div>
            </IonItem>
            <IonTitle className="report-title">
              Prueba Práctica - porcentaje mínimo para aprobación 70%
            </IonTitle>
            <IonItem>
              <div className="percentage-container">
                <div className="percentage-text">Idoneidad conductiva</div>
                <div className="percentage-number" id="file">
                  <div className="w3-light-grey w3-round naranja">
                    <div
                      className="w3-container w3-blue w3-round "
                      style={{ width: porcentajes.practico }}
                    ></div>
                  </div>
                  <b>{porcentajes.practico}%</b>
                </div>
              </div>
            </IonItem>
            <IonTitle className="report-title">
              Prueba Teórica - Porcentaje mínimo para aprobación 70%
            </IonTitle>
            <IonItem>
              <div className="percentage-container">
                <div className="percentage-text">
                  <p>conocimientos sobre conducción</p>
                  <p>señalización</p>
                  <p>legislación</p>
                  <p>accidentes y modo de prevenirlos</p>
                </div>
                <div className="percentage-number" id="file">
                  <div className="w3-light-grey w3-round celeste">
                    <div
                      className="w3-container w3-blue w3-round "
                      style={{
                        width: `${porcentajes.teorico}%`,
                        height: "100%",
                      }}
                    ></div>
                  </div>
                  <b>{porcentajes.teorico}%</b>
                </div>
              </div>
            </IonItem>
            <IonTitle className="report-title">
              Prueba psíquica - Porcentaje mínimo para aprobación 70%
            </IonTitle>
            <div className="reporte-psiquica">
              <div className="percentage-container">
                <div className="percentage-text">
                  <p>prueba 1</p>
                </div>
                <div className="percentage-number" id="file">
                  <div className="w3-light-grey w3-round rojo">
                    <div
                      className="w3-container w3-blue w3-round"
                      style={{
                        width: `${porcentajes.testMemorizarNumeros}%`,
                        height: "100%",
                      }}
                    ></div>
                  </div>
                  <b>{porcentajes.testMemorizarNumeros}%</b>
                </div>
              </div>
              <div className="percentage-container">
                <div className="percentage-text">
                  <p>prueba 2</p>
                </div>
                <div className="percentage-number" id="file">
                  <div className="w3-light-grey w3-round rojo">
                    <div
                      className="w3-container w3-blue w3-round "
                      style={{
                        width: `${porcentajes.testColores}%`,
                        height: "100%",
                      }}
                    ></div>
                  </div>
                  <b>{porcentajes.testColores}%</b>
                </div>
              </div>
              <div className="percentage-container">
                <div className="percentage-text">
                  <p>prueba 3</p>
                </div>
                <div className="percentage-number" id="file">
                  <div className="w3-light-grey w3-round rojo">
                    <div
                      className="w3-container w3-blue w3-round"
                      style={{
                        width: `${porcentajes.testDirecciones}%`,
                        height: "100%",
                      }}
                    ></div>
                  </div>
                  <b>{porcentajes.testDirecciones}%</b>
                </div>
              </div>
              <div className="percentage-container">
                <div className="percentage-text">
                  <p>prueba 4</p>
                </div>
                <div className="percentage-number" id="file">
                  <div className="w3-light-grey w3-round rojo">
                    <div
                      className="w3-container w3-blue w3-round "
                      style={{
                        width: `${porcentajes.testNumerosGrandes}%`,
                        height: "100%",
                      }}
                    ></div>
                  </div>
                  <b>{porcentajes.testNumerosGrandes}%</b>
                </div>
              </div>
              <div className="percentage-container">
                <div className="percentage-text">
                  <p>prueba 5</p>
                </div>
                <div className="percentage-number" id="file">
                  <div className="w3-light-grey w3-round rojo">
                    <div
                      className="w3-container w3-blue w3-round "
                      style={{
                        width: `${porcentajes.testPosicionesBloques}%`,
                        height: "100%",
                      }}
                    ></div>
                  </div>
                  <b>{porcentajes.testPosicionesBloques}%</b>
                </div>
              </div>
            </div>
            <IonButton
              className="back-to-main"
              color="favorite"
              onClick={returnMenu}
            >
              Pagina principal
            </IonButton>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default withCookies(ReportPage);
