importScripts('./idb-keyval-iife.min.js');

self.onmessage = async ($event) => {
  if ($event && $event.data && $event.data.msg === 'saveUser') {
    const user = await saveUser();
    self.postMessage(user);
  }
};

async function saveUser(user) {
  const keys = await idbKeyval.keys();

  let sum = 0;
  for (const key of keys) {
      const value = await idbKeyval.get(key);
      sum += value;
  }

  return sum;
}
