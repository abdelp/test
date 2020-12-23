import axios from 'axios';
import preguntas_senhales from './preguntas_senhales.json';

const url = "http://www.opaci.org.py:8082/ws/WSAA.asmx?wsdl";

const signinUser = (username: any, password: any) => {
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

const getTestedUserData = (rut: any) => {
  return new Promise((resolve, reject) => {
    resolve({name: 'Abdel Omar Pérez Téllez', birthDate: '04/02/1992', ci: '4.484.595'})
  });
}

const getCategories = async () =>
  // @ts-ignore
  ({
    name: 'Conductor B2',
    description: 'A description'
  },
  {
    name: 'Profesional',
    description: 'A description'
  });

const getPreguntasSenhales = () => {
  return new Promise((resolve, reject) => {
    resolve(preguntas_senhales);
  });
}

export {
  signinUser, getCategories, getTestedUserData, getPreguntasSenhales
};
