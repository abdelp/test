import { set, get } from 'idb-keyval';

const obtenerDatosUsuarioTesteadoPorCedula = async (cedula: any) => {
  try {
    const TABLA = 'usuarios_testeados';
    const usuariosTesteados: any = await get(TABLA);
    const usuarioTesteado = usuariosTesteados.findIndex((u: any) => u.cedula === cedula);

    return usuarioTesteado;
  } catch(e) {
    throw e;
  }
};

const actualizarUsuarioTesteadoPorCedula = async (cedula: any, datos: any) => {
  const TABLA = 'usuarios_testeados';
  const DATOS_USUARIO = obtenerDatosUsuarioTesteadoPorCedula(cedula);

  // VER QUE PASA CUANDO NO HAY DATOS

  const NUEVOS_DATOS = {...DATOS_USUARIO, ...datos};


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

export { updateUserTest }