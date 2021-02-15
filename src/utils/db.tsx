import { set, get } from "idb-keyval";
import _ from "lodash";

const obtenerUsuariosTesteados = async () => {
  try {
    const TABLA = "usuarios_testeados";
    const USUARIOS_TESTEADOS: any = (await get(TABLA)) || [];

    return USUARIOS_TESTEADOS;
  } catch (e) {
    throw e;
  }
};

const obtenerUsuariosTesteadosNoSincronizados = async () => {
  try {
    const TABLA = "usuarios_testeados";
    const USUARIOS_TESTEADOS: any = (await get(TABLA)) || []; // Debe haber alguna forma de filtrar ya en el get, averiguar luego.
    const USUARIOS_TESTEADOS_NO_SINCRONIZADOS = USUARIOS_TESTEADOS.filter(
      (u: any) => typeof u.sincronizado === "undefined" && u.aprobado
    );

    return USUARIOS_TESTEADOS_NO_SINCRONIZADOS;
  } catch (e) {
    throw e;
  }
};

const agregarUsuarioTesteado = async (usuario: any) => {
  try {
    const TABLA = "usuarios_testeados";
    const usuariosTesteados: any = (await get(TABLA)) || [];

    usuariosTesteados.push(usuario);

    await set(TABLA, usuariosTesteados);

    return { cod: 0, mensaje: "Usuario agregado exitosamente" };
  } catch (e) {
    throw e;
  }
};

const eliminarUsuarioTesteadoPorNroDocumentoYAntecedente = async (
  nroDocumento: string,
  tipoDocumento: string,
  idAntecedente: number
) => {
  try {
    const TABLA = "usuarios_testeados";
    const USUARIO_TESTEADO_IDX = await obtenerIndiceUsuarioTesteadoPorNroDocumentoYAntecedente(
      nroDocumento,
      "cedula",
      idAntecedente
    );
    let usuariosTesteados: any = (await get(TABLA)) || [];

    usuariosTesteados = [
      ...usuariosTesteados.slice(0, USUARIO_TESTEADO_IDX),
      ...usuariosTesteados.slice(USUARIO_TESTEADO_IDX + 1),
    ];

    await set(TABLA, usuariosTesteados);
    return { cod: 0, mensaje: "Usuario eliminado exitosamente" };
  } catch (e) {
    throw e;
  }
};

const obtenerIndiceUsuarioTesteadoPorNroDocumentoYAntecedente = async (
  nroDocumento: string,
  tipoDocumento: string,
  idAntecedente: number
) => {
  try {
    const TABLA = "usuarios_testeados";
    const usuariosTesteados: any = (await get(TABLA)) || [];
    const usuarioTesteadoIdx = usuariosTesteados.findIndex(
      (u: any) =>
        u.nroDocumento === nroDocumento && u.idAntecedente === idAntecedente
    );

    return usuarioTesteadoIdx;
  } catch (e) {
    throw e;
  }
};

const obtenerDatosUsuarioTesteadoPorNroDocumentoYAntecedente = async (
  nroDocumento: string,
  tipoDocumento: string,
  idAntecedente: number
) => {
  try {
    const TABLA = "usuarios_testeados";
    const usuariosTesteados: any = (await get(TABLA)) || [];
    const usuarioTesteadoIdx = usuariosTesteados.findIndex(
      (u: any) =>
        u.nroDocumento === nroDocumento && u.idAntecedente === idAntecedente
    );
    const usuarioTesteado = usuariosTesteados[usuarioTesteadoIdx];

    return usuarioTesteado;
  } catch (e) {
    throw e;
  }
};

const actualizarDatosUsuarioTesteadoPorNroDocumentoYAntecedente = async (
  nroDocumento: string,
  tipoDocumento: string,
  idAntecedente: number,
  datos: any
) => {
  try {
    const TABLA = "usuarios_testeados";
    const DATOS_USUARIO =
      (await obtenerDatosUsuarioTesteadoPorNroDocumentoYAntecedente(
        nroDocumento,
        tipoDocumento,
        idAntecedente
      )) || {};
    const NUEVOS_DATOS = _.merge(DATOS_USUARIO, datos);

    let usuariosTesteados: any = (await get(TABLA)) || [];
    const USUARIO_TESTEADO_IDX = await obtenerIndiceUsuarioTesteadoPorNroDocumentoYAntecedente(
      nroDocumento,
      tipoDocumento,
      idAntecedente
    );

    if (USUARIO_TESTEADO_IDX === -1)
      return {
        cod: 0,
        mensaje: `Usuario con nro. de documento: ${nroDocumento} no encontrado`,
      };

    usuariosTesteados[USUARIO_TESTEADO_IDX] = NUEVOS_DATOS;

    await set(TABLA, usuariosTesteados);

    return {
      cod: 0,
      mensaje:
        "Los datos del usuario testeado fueron actualizados exitosamente",
    };
  } catch (e) {
    throw e;
  }
};

/*
 *
 */

const update = async (table: string, data: any) => {
  try {
    await set(table, data);
    return { code: 0, message: "Table updated successfully" };
  } catch (e) {
    return e;
  }
};

const actualizarFechaDeTest = async (
  cedula: any,
  categoria: string,
  test: string,
  fecha: any
) => {
  try {
    const TABLA = "usuarios_testeados";
    const usuariosTesteados: any = await get(TABLA);

    if (usuariosTesteados?.length) {
      const usuarioIdx = usuariosTesteados.findIndex(
        (u: any) => u.cedula === cedula
      );
      const usuarioTesteado = usuariosTesteados[usuarioIdx];
      const CATEGORIA = usuarioTesteado.categoria || {};
      let testGuardado = usuarioTesteado.categoria[test] || {};

      testGuardado.fecha = new Date();
    } else {
    }

    await set(TABLA, usuariosTesteados);

    return { codigo: 0, mensaje: "Fecha de test actualizada correctamente" };
  } catch (e) {
    throw e;
  }
};

const updateUserTest = async (
  nroDocumento: any,
  categoria: any,
  test: any,
  result: any
) => {
  const date = new Date();
  const usuariosTesteados: any = await get("usuarios_testeados");
  const idx = usuariosTesteados.findIndex(
    (u: any) => u.nroDocumento === nroDocumento
  );
  let cat: any;

  if (!usuariosTesteados[idx][categoria.toLowerCase()]) {
    cat = usuariosTesteados[idx]["examenes"][categoria] = {};
  } else {
    cat = usuariosTesteados[idx]["examenes"][categoria];
  }

  cat[test] = { date: new Date(), result };
  await set("usuarios_testeados", usuariosTesteados);

  return;
};

export {
  obtenerUsuariosTesteados,
  updateUserTest,
  agregarUsuarioTesteado,
  obtenerDatosUsuarioTesteadoPorNroDocumentoYAntecedente,
  actualizarDatosUsuarioTesteadoPorNroDocumentoYAntecedente,
  eliminarUsuarioTesteadoPorNroDocumentoYAntecedente,
  obtenerUsuariosTesteadosNoSincronizados,
  update,
  actualizarFechaDeTest
};
