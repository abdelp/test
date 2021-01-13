import userEvent from '@testing-library/user-event';
import { set, get } from 'idb-keyval';
import { useCookies } from "react-cookie";

async function loggedIn() {
  const user = await get("user");
  return user;
}

async function updateUserTestDate(ci: any, test: any) {
  const date = new Date();
  const usuariosTesteados = await get('usuarios_testeados');
  console.log(usuariosTesteados);
  
  const result = await set(ci, {test, date});
}

export { loggedIn, updateUserTestDate }