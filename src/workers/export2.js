self.onmessage = async ($event) => {
  if ($event && $event.data && $event.data.msg === 'sumTomato') {
      const sum = await sumTomato();
      self.postMessage(sum);
  }
};

async function sumTomato() {
  // TODO sum tomato
  return 0;
}