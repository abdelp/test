import userEvent from '@testing-library/user-event';
import { set, get } from 'idb-keyval';

async function loggedIn() {
  const user = await get("user");
  return user;
}

async function updateUserTestDate(ci: any, test: any) {
  const date = new Date();
  const result = await set(ci, {test, date});
}

export { loggedIn, updateUserTestDate }