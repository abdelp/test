import { set, get } from 'idb-keyval';
import _ from 'lodash';

const obtenerIndiceDeUsuarioTesteadoPorCedula = async (cedula: any) => {
  try {
    const TABLA = 'usuarios_testeados';
    const usuariosTesteados: any = await get(TABLA) || [];
    const usuarioTesteadoIdx = usuariosTesteados.findIndex((u: any) => u.cedula === cedula);

    return usuarioTesteadoIdx;
  } catch(e) {
    throw e;
  }
};

const obtenerDatosUsuarioTesteadoPorCedula = async (cedula: any) => {
  try {
    const TABLA = 'usuarios_testeados';
    const usuariosTesteados: any = await get(TABLA) || [];
    const usuarioTesteadoIdx = usuariosTesteados.findIndex((u: any) => u.cedula === cedula);
    const usuarioTesteado = usuariosTesteados[usuarioTesteadoIdx];

    return usuarioTesteado;
  } catch(e) {
    throw e;
  }
};

const actualizarDatosUsuarioTesteadoPorCedula = async (cedula: any, datos: any) => {
  try {
    const TABLA = 'usuarios_testeados';
    const DATOS_USUARIO = await obtenerDatosUsuarioTesteadoPorCedula(cedula) || {};
    const NUEVOS_DATOS = _.merge(DATOS_USUARIO, datos);

    let usuariosTesteados: any = await get(TABLA) || [];
    const USUARIO_TESTEADO_IDX = await obtenerIndiceDeUsuarioTesteadoPorCedula(cedula);

    if (USUARIO_TESTEADO_IDX === -1) return {cod: 0, mensaje: `Usuario con cédula de identidad nro.: ${cedula} no encontrado`};

    usuariosTesteados[USUARIO_TESTEADO_IDX] = NUEVOS_DATOS;

    await set(TABLA, usuariosTesteados);

    return {cod: 0, mensaje: 'Los datos del usuario testeado fueron actualizados exitosamente'};
  } catch(e) {
    throw e;
  }
};

const actualizarTestDeUsuario = async (
  cedula: any,
  categoria: any,
  test: any,
  data: any) => {

  const TABLA = 'usuarios_testeados';
  const FECHA = new Date();
  const USUARIOS_TESTEADOS: any = await get(TABLA) || [];
  const usuarioTesteado: any = await obtenerDatosUsuarioTesteadoPorCedula(cedula) || {};

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

      console.log(usuarioTesteado);
      console.log(usuariosTesteados);

    } else {
      
      
    }

    await set(TABLA, usuariosTesteados);

    return {codigo: 0, mensaje: 'Fecha de test actualizada correctamente'};

  } catch(e) {
    throw e;
  }
};

const updateUserTest = async (ci: any, categoria: any, test: any, result: any) => {
  const date = new Date();
  const usuariosTesteados: any = await get('usuarios_testeados');
  const idx = usuariosTesteados.findIndex((u: any) => u.ci === ci);
  let cat: any;

  if (!usuariosTesteados[idx][categoria.toLowerCase()]) {
    cat = usuariosTesteados[idx]["examenes"][categoria.toLowerCase()] = {};
  } else {
    cat = usuariosTesteados[idx]["examenes"][categoria.toLowerCase()];
  }

  cat[test] = { date: new Date(), result }
  await set("usuarios_testeados", usuariosTesteados);

  return;
}

export {
  updateUserTest,
  obtenerDatosUsuarioTesteadoPorCedula,
  actualizarDatosUsuarioTesteadoPorCedula
};