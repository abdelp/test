import userEvent from '@testing-library/user-event';
import { set, get } from 'idb-keyval';
import { useCookies } from "react-cookie";

async function loggedIn() {
  const user = await get("user");
  return user;
}

async function updateUserTest(ci: any, categoria: any, test: any, result: any) {
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

export { loggedIn, updateUserTest }