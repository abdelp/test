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
    setInterval(() => {
      if(rut == 111) {
        resolve(
          {
          nombre: 'Pedro Martinez',
          fechaNac: '04/02/1980',
          ci: '3.324.585',
          domicilio: 'LAMBARE',
          nacionalidad: 'PARAGUAYA',
          categoria: '1',
          fecCatMotocicleta: {
            ultimoExamen: '2020-12-23',
            proximaHabilitacion: '30 dias',
            catProfB: null,
          }
        }
        )
      } else {
        reject({codError: 1, message: 'Usuario no registrado, favor verifique que esté correcto.'})
      }
    }, 2000)
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

const sendResult = (ticket: any, ci: any, result: any) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
    xhr.setRequestHeader("SOAPAction", "http://rut.antsv.gov.py/EnviarResultado");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        resolve(xhr);
      }
    };

    const data = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <EnviarResultado xmlns="http://rut.antsv.gov.py/">
          <Token>${ticket}</Token>
          <Firma>string</Firma>
          <Entidad>string</Entidad>
          <CI>${ci}</CI>
          <DatosExamenXML>${result}</DatosExamenXML>
        </EnviarResultado>
      </soap:Body>
    </soap:Envelope>
  `;

    xhr.send(data);
  });
}

export {
  signinUser, getCategories, getTestedUserData, getPreguntasSenhales, sendResult
};
