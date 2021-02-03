import axios from 'axios';
import { HTTP } from '@ionic-native/http';

const url = "http://www.opaci.org.py:8082/ws/WSAA.asmx?wsdl";

const signInWithUsernameAndPassword = async (username: any, password: any) => {
//   const data = `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
//   <s:Body>
//     <AutenticarExaminador xmlns="http://rut.antsv.gov.py/" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
//       <Usuario>${username}</Usuario>
//       <Clave>${password}</Clave>
//       <Certificado/>
//       <Firma/>
//     </AutenticarExaminador>
//   </s:Body>
// </s:Envelope>`;
  const data = `<?xml version="1.0" encoding="utf-8"?>
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      <AutenticarExaminadorJson xmlns="http://rut.antsv.gov.py/">
        <Usuario>${username}</Usuario>
        <Clave>${password}</Clave>
        <Certificado>string</Certificado>
        <Firma>string</Firma>
      </AutenticarExaminadorJson>
    </soap:Body>
  </soap:Envelope>`;

// const result = await axios.post(url,
//   data,
//   {headers: 
//     {"Access-Control-Allow-Origin": "*",
//     "Content-Type": "text/xml; charset=utf-8",
//     "SOAPAction": "http://rut.antsv.gov.py/AutenticarExaminador"}});

// HTTP.setHeader('*', String("Access-Control-Allow-Origin"), String("*"));
// HTTP.setHeader('*', String("Content-Type"), String("text/xml; charset=utf-8"));
// HTTP.setHeader('*', String("SOAPAction"), String("http://rut.antsv.gov.py/AutenticarExaminador"));
// HTTP.setDataSerializer('json');
  // const options = {
  //   method: 'post',
  //   data,
  //   headers: {"Access-Control-Allow-Origin": "*",
  //       "Content-Type": "text/xml; charset=utf-8",
  //       "SOAPAction": "http://rut.antsv.gov.py/AutenticarExaminador"}
  // };

  HTTP.setDataSerializer('utf8');

  const result = await HTTP.post(url, data, {"Access-Control-Allow-Origin": "*",
  "Content-Type": "text/xml; charset=utf-8",
  "SOAPAction": "http://rut.antsv.gov.py/AutenticarExaminador"});

    return result;
  // return new Promise((resolve, reject) => {
  //   const xhr = new XMLHttpRequest();
  //   xhr.open("POST", url);
  //   xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
  //   xhr.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
  //   xhr.setRequestHeader("SOAPAction", "http://rut.antsv.gov.py/AutenticarExaminador");

  //   xhr.onreadystatechange = function () {
  //     if (xhr.readyState === 4) {
  //       resolve(xhr);
  //     }
  //   };

  //   const data = `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
  //     <s:Body>
  //       <AutenticarExaminador xmlns="http://rut.antsv.gov.py/" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
  //         <Usuario>${username}</Usuario>
  //         <Clave>${password}</Clave>
  //         <Certificado/>
  //         <Firma/>
  //       </AutenticarExaminador>
  //     </s:Body>
  //   </s:Envelope>`;

  //   xhr.send(data);
  // });
};

export { signInWithUsernameAndPassword };