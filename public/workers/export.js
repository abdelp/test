importScripts('./idb-keyval-iife.min.js');
self.onmessage = async ($event) => {
  if ($event && $event.data && $event.data.msg === 'incApple') {
    const user = await saveUser();
    self.postMessage(user);
  }
};

function saveUser(user) {

  return countApple + 1;
}
