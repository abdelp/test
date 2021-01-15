import userEvent from '@testing-library/user-event';
import { set, get } from 'idb-keyval';
import { useCookies } from "react-cookie";

async function loggedIn() {
  const user = await get("user");
  return user;
}

async function updateUserTestDate(ci: any, categoria: any, test: any) {
  const date = new Date();
  const usuariosTesteados: any = await get('usuarios_testeados');
  console.log(usuariosTesteados);
  const idx = usuariosTesteados.findIndex((u: any) => u.ci === ci);
  // si se encuentra
  console.log(idx);
  console.log(usuariosTesteados[idx]["examenes"]);
  console.log(categoria);
  console.log(usuariosTesteados[idx]["examenes"][categoria] = 1);
  const result = await set("usuarios_testeados", usuariosTesteados);
}

export { loggedIn, updateUserTestDate }