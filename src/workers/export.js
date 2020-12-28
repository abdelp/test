importScripts('./idb-keyval-iife.min.js');

self.onmessage = async ($event) => {
  console.log($event);
  if ($event && $event.data && $event.data.msg === 'saveUser') {
    const user = await saveUser();
    self.postMessage(user);
  } else if ($event && $event.data && $event.data.msg === 'saveExamProgress')  {
    const exam = await saveExamProgress($event.data);
    self.postMessage(exam);
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

async function saveExamProgress(exam) {
  const request = db.transaction(["examen"], "readwrite")
  .objectStore("examen")
  .add(exam);
  
  request.onsuccess = function(event) {
     alert("The exam has been added to your database.");
  };
  
  request.onerror = function(event) {
     alert("Unable to add data\r\nExam is already exist in your database! ");
  }
}
