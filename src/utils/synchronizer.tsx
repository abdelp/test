import { enviarResultado } from "../APIs";
import {
  obtenerUsuariosTesteadosNoSincronizados,
  actualizarDatosUsuarioTesteadoPorNroDocumentoYAntecedente,
} from "./db";
import to from "await-to-js";

const sincronizarResultados = async (token: string) => {
  const [error, usuariosNoSincronizados] = await to(
    obtenerUsuariosTesteadosNoSincronizados()
  );

  if (error) return;

  usuariosNoSincronizados.forEach((item: any) => {
    enviarResultado(token, "firma", item.idAntecedente, !!item.aprobado).then(
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
