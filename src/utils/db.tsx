import userEvent from '@testing-library/user-event';
import { set, get } from 'idb-keyval';

async function loggedIn() {
  const user = await get("user");
  return user;
}

export { loggedIn }