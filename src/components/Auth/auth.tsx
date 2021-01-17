const url = "http://www.opaci.org.py:8082/ws/WSAA.asmx?wsdl";

const signInWithUsernameAndPassword = (username: any, password: any) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
    xhr.setRequestHeader("SOAPAction", "http://rut.antsv.gov.py/AutenticarExaminador");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        resolve(xhr);
      }
    };

    const data = `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
      <s:Body>
        <AutenticarExaminador xmlns="http://rut.antsv.gov.py/" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
          <Usuario>${username}</Usuario>
          <Clave>${password}</Clave>
          <Certificado/>
          <Firma/>
        </AutenticarExaminador>
      </s:Body>
    </s:Envelope>`;

    xhr.send(data);
  });
};

export { signInWithUsernameAndPassword };