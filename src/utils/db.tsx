import { set, get } from 'idb-keyval';
import _ from 'lodash';

const obtenerUsuariosTesteados = async () => {
  try {
    const TABLA = 'usuarios_testeados';
    const USUARIOS_TESTEADOS: any = await get(TABLA) || [];

    return USUARIOS_TESTEADOS;
  } catch(e) {
    throw e;
  }
};

const obtenerUsuariosTesteadosNoSincronizados = async () => {
  try {
    const TABLA = 'usuarios_testeados';
    const USUARIOS_TESTEADOS: any = await get(TABLA) || []; // Debe haber alguna forma de filtrar ya en el get, averiguar luego.
    const USUARIOS_TESTEADOS_NO_SINCRONIZADOS = USUARIOS_TESTEADOS.filter((u: any) => typeof u.sincronizado === 'undefined');

    return USUARIOS_TESTEADOS_NO_SINCRONIZADOS;
  } catch(e) {
    throw e;
  }
};

const agregarUsuarioTesteado = async (usuario: any) => {
  try {
    const TABLA = 'usuarios_testeados';
    const usuariosTesteados: any = await get(TABLA) || [];

    usuariosTesteados.push(usuario);

    await set(TABLA, usuariosTesteados);

    return { cod: 0, mensaje: 'Usuario agregado exitosamente' };
  } catch(e) {
    throw e;
  }
};

const eliminarUsuarioTesteadoPorNroDocumento = async (nroDocumento: string) => {
  try {
    const TABLA = 'usuarios_testeados';
    const USUARIO_TESTEADO_IDX = await obtenerIndiceUsuarioTesteadoPorNroDocumento(nroDocumento);
    let usuariosTesteados: any = await get(TABLA) || [];

    usuariosTesteados = [...usuariosTesteados.slice(0, USUARIO_TESTEADO_IDX), ...usuariosTesteados.slice(USUARIO_TESTEADO_IDX + 1)]

    await set(TABLA, usuariosTesteados);
    return { cod: 0, mensaje: 'Usuario eliminado exitosamente' };
  } catch(e) {
    throw e;
  }
};

const obtenerIndiceUsuarioTesteadoPorNroDocumento = async (nroDocumento: string) => {
  try {
    const TABLA = 'usuarios_testeados';
    const usuariosTesteados: any = await get(TABLA) || [];
    const usuarioTesteadoIdx = usuariosTesteados.findIndex((u: any) => u.nroDocumento === nroDocumento);

    return usuarioTesteadoIdx;
  } catch(e) {
    throw e;
  }
};

const obtenerDatosUsuarioTesteadoPorNroDocumento = async (nroDocumento: any) => {
  try {
    const TABLA = 'usuarios_testeados';
    const usuariosTesteados: any = await get(TABLA) || [];
    const usuarioTesteadoIdx = usuariosTesteados.findIndex((u: any) => u.nroDocumento === nroDocumento);
    const usuarioTesteado = usuariosTesteados[usuarioTesteadoIdx];

    return usuarioTesteado;
  } catch(e) {
    throw e;
  }
};

const actualizarDatosUsuarioTesteadoPorNroDocumento = async (nroDocumento: string, datos: any) => {
  try {
    const TABLA = 'usuarios_testeados';
    const DATOS_USUARIO = await obtenerDatosUsuarioTesteadoPorNroDocumento(nroDocumento) || {};
    const NUEVOS_DATOS = _.merge(DATOS_USUARIO, datos);

    let usuariosTesteados: any = await get(TABLA) || [];
    const USUARIO_TESTEADO_IDX = await obtenerIndiceUsuarioTesteadoPorNroDocumento(nroDocumento);

    if (USUARIO_TESTEADO_IDX === -1) return {cod: 0, mensaje: `Usuario con nro. de documento: ${nroDocumento} no encontrado`};

    usuariosTesteados[USUARIO_TESTEADO_IDX] = NUEVOS_DATOS;

    await set(TABLA, usuariosTesteados);

    return {cod: 0, mensaje: 'Los datos del usuario testeado fueron actualizados exitosamente'};
  } catch(e) {
    throw e;
  }
};

const actualizarUsuarioTesteado = async (usuario: any) => {

};

/*
 *
 */

const actualizarTestDeUsuario = async (
  nroDocumento: string,
  categoria: any,
  test: any,
  data: any) => {
  const TABLA = 'usuarios_testeados';
  const FECHA = new Date();
  const USUARIOS_TESTEADOS: any = await get(TABLA) || [];
  const usuarioTesteado: any = await obtenerDatosUsuarioTesteadoPorNroDocumento(nroDocumento) || {};

  let nuevoExamen: any = {
    [categoria]: {
      [test]: data
    }
  };


  // const idx = usuariosTesteados.findIndex((u: any) => u.ci === ci);
  // let cat: any;

  // if (!usuariosTesteados[idx][categoria.toLowerCase()]) {
  //   cat = usuariosTesteados[idx]["examenes"][categoria.toLowerCase()] = {};
  // } else {
  //   cat = usuariosTesteados[idx]["examenes"][categoria.toLowerCase()];
  // }

  // cat[test] = { date: new Date(), result }
  // await set("usuarios_testeados", usuariosTesteados);

  // return;
};

const update = async (table: string, data: any) => {
  try {
    await set(table, data);
    return {code: 0, message: 'Table updated successfully'};
  } catch (e) {
    return e;
  }
};

const actualizarFechaDeTest = async (cedula: any, categoria: string, test: string, fecha: any) => {
  try {
    const TABLA = 'usuarios_testeados';
    const usuariosTesteados: any = await get(TABLA);

    if (usuariosTesteados?.length) {
      const usuarioIdx = usuariosTesteados.findIndex((u: any) => u.cedula === cedula);
      const usuarioTesteado = usuariosTesteados[usuarioIdx];
      const CATEGORIA = usuarioTesteado.categoria || {};
      let testGuardado = usuarioTesteado.categoria[test] || {};

      testGuardado.fecha = new Date();
    } else {
 
    }

    await set(TABLA, usuariosTesteados);

    return {codigo: 0, mensaje: 'Fecha de test actualizada correctamente'};

  } catch(e) {
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
  const usuariosTesteados: any = await get('usuarios_testeados');
  const idx = usuariosTesteados.findIndex((u: any) => u.nroDocumento === nroDocumento);
  let cat: any;

  if (!usuariosTesteados[idx][categoria.toLowerCase()]) {
    cat = usuariosTesteados[idx]["examenes"][categoria] = {};
  } else {
    cat = usuariosTesteados[idx]["examenes"][categoria];
  }

  cat[test] = { date: new Date(), result }
  await set("usuarios_testeados", usuariosTesteados);

  return;
}

export {
  updateUserTest,
  agregarUsuarioTesteado,
  obtenerDatosUsuarioTesteadoPorNroDocumento,
  actualizarDatosUsuarioTesteadoPorNroDocumento,
  eliminarUsuarioTesteadoPorNroDocumento
};