import { sendResult } from "../APIs";
import {
  obtenerUsuariosTesteadosNoSincronizados,
  actualizarDatosUsuarioTesteadoPorNroDocumentoYAntecedente,
} from "./db";
import to from "await-to-js";

const sincronizarResultados = async (token: string) => {
  const [error, usuariosNoSincronizados] = await to(
    obtenerUsuariosTesteadosNoSincronizados()
  );

  usuariosNoSincronizados.forEach((item: any) => {
    sendResult(token, "firma", item.idAntecedente, !!item.aprobado).then(
      (result: any) => {
        actualizarDatosUsuarioTesteadoPorNroDocumentoYAntecedente(
          item.nroDocumento,
          "cedula",
          item.idAntecedente,
          { sincronizado: true }
        );
      }
    );
  });
};

export { sincronizarResultados };
