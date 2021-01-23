import PREGUNTAS_SENHALES from './preguntas_senhales.json';
import PREGUNTAS_DECLARACION_JURADA from './declaracion_jurada.json';
import ITEMS_MOTOCICLETA_PRACTICO from './motocicleta_practico.json';
import PREGUNTAS_MECANICA from './preguntas_mecanica.json';
import PREGUNTAS_PRIMEROS_AUXILIOS from './preguntas_primeros_auxilios.json';

const url = "http://www.opaci.org.py:8082/ws/WSAA.asmx?wsdl";

const signinUser = (username: any, password: any) => {
  return new Promise((resolve, reject) => {

    try {
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
    } catch(e) {
      reject(e);
    }

  });
};

const getTestedUserData = (cedula: any) => {
  return new Promise((resolve, reject) => {
    setInterval(() => {
      if(cedula == 111) {
        resolve(
          {
            nombres: 'Pedro Marting',
            apellidos: 'Benitez Martinez',
            fechaNac: '04/02/1980',
            ci: '3324585',
            rut: '111',
            domicilio: 'LAMBARE',
            nacionalidad: 'PARAGUAYA',
            categoria: 'Motocicleta',
            renovacion: true,
            nroAntecedente: 1701,
            examenes:
              {
              }
          }
        )
      } else if (cedula == 222) {
        resolve(
          {
            nombres: 'Gustavo Marcelo',
            apellidos: 'Dominguez Britos',
            fechaNac: '04/09/1991',
            ci: '3324333',
            rut: '111',
            domicilio: 'LAMBARE',
            nacionalidad: 'PARAGUAYA',
            categoria: 'Profesional B',
            renovacion: false,
            nroAntecedente: 1702,
            examenes:
              {
                catMotocicleta: {
                  examenTeorico: {
                    fecha: '2020-12-23',
                    puntaje: 80
                  }
                }
              }
          }
        )
      } else {
        reject({codError: 1, message: 'Usuario no registrado, favor verifique que esté correcto.'})
      }
    }, 2000)
  });
};

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
    resolve([...PREGUNTAS_SENHALES, ...PREGUNTAS_MECANICA, ...PREGUNTAS_PRIMEROS_AUXILIOS]);
  });
};

const sendResult = (ticket: any, ci: any, result: any) => {
  return new Promise((resolve, reject) => {
    try {
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
    } catch(error) {
      reject(error);
    }
  });
};

const getExamDate = async ({categoria, ticket, ci, test}: any) =>
  ({ ci: '111', categoria: 'motocicleta', test, date: '2020-01-22', nroAntecedente: 1701 });

const getDeclaracionJurada = async () => {
  return new Promise((resolve, reject) => {
    resolve(PREGUNTAS_DECLARACION_JURADA);
  });
};

const getPracticalTestItems = () => {
  return new Promise((resolve, reject) => {
    resolve(ITEMS_MOTOCICLETA_PRACTICO);
  });
};

const saveDeclaracionJurada = (declaracion: any) => {
  return new Promise((resolve, reject) => {
    setInterval(() =>
      resolve({cod: 200, message: 'Declaración guardada correctamente'})
    , 2000);
  });
};

export {
  signinUser,
  getCategories,
  getTestedUserData,
  getPreguntasSenhales,
  sendResult,
  getExamDate,
  getDeclaracionJurada,
  getPracticalTestItems,
  saveDeclaracionJurada
};
