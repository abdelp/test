import PREGUNTAS_SENHALES from './preguntas_senhales.json';
import PREGUNTAS_DECLARACION_JURADA from './declaracion_jurada.json';
import ITEMS_MOTOCICLETA_PRACTICO from './motocicleta_practico.json';
import PREGUNTAS_MECANICA from './preguntas_mecanica.json';
import PREGUNTAS_NORMAS from './preguntas_normas.json';
import PREGUNTAS_PRIMEROS_AUXILIOS from './preguntas_primeros_auxilios.json';
import axios from 'axios';
import to from 'await-to-js';
import { HTTP } from '@ionic-native/http';
import { xml2js } from 'xml-js';

const url = "http://www.opaci.org.py:8082/ws/WSAA.asmx?wsdl";

const getTestedUserData = async (
  token: string,
  nroDocumento: string,
  tipoDocumento: string
) => {
  try {
    const data = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <ConsultarAntecedente xmlns="http://rut.antsv.gov.py/">
          <Token>${token}</Token>
          <Documento>${nroDocumento}</Documento>
          <TipoDocumento>${tipoDocumento}</TipoDocumento>
        </ConsultarAntecedente>
      </soap:Body>
    </soap:Envelope>`;

    HTTP.setDataSerializer('utf8');

    let [error, result]: any = await to(HTTP.post(
      url,
      data,
      {"Access-Control-Allow-Origin": "*",
      "Content-Type": "text/xml; charset=utf-8",
      "SOAPAction": "http://rut.antsv.gov.py/ConsultarAntecedente"}));

    if (error === 'cordova_not_available') {
      [error, result] = await to(axios.post(url,
        data,
        {headers: 
          {"Access-Control-Allow-Origin": "*",
          "Content-Type": "text/xml; charset=utf-8",
          "SOAPAction": "http://rut.antsv.gov.py/ConsultarAntecedente"}}));
    }

    if (error) throw error;

    { /*
      //@ts-ignore */}
    const { ["soap:Envelope"]: { "soap:Body": {
          ConsultarAntecedenteResponse: {
            ConsultarAntecedenteResult: {
              Antecedentes: {
                ConsultaAntecedente = {
                  Nombres: {text: null},
                  Apellidos: {text: null},
                  Categoria: {text: null},
                  IdAntecedente: {text: null},
                  Tramite: {text: null}
                }
              },
              Cantidad: {text: cantidad}
            }
          }
        }
      }
    } = xml2js(result.data,
    {
      ignoreDeclaration: true,
      ignoreAttributes: true,
      compact: true,
      textKey: "text"
    });

    const {
      Nombres: { text:nombres },
      Apellidos: { text:apellidos },
      Categoria: { text:categoria },
      IdAntecedente: { text:idAntecedente },
      Tramite: { text:tramite }
    } = ConsultaAntecedente;

    return { cantidad, nombres, apellidos, categoria, nroDocumento, idAntecedente, tramite };
  } catch (e) {
    throw e;
  }
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
    resolve([...PREGUNTAS_SENHALES, ...PREGUNTAS_MECANICA, ...PREGUNTAS_PRIMEROS_AUXILIOS, ...PREGUNTAS_NORMAS]);
  });
};

const sendResult = async (
  token: any,
  firma: any,
  idAntecedente: number,
  aprobado: boolean
) => {
  try {
    const data = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <EnviarResultado xmlns="http://rut.antsv.gov.py/">
          <Token>${token}</Token>
          <Firma>${firma}</Firma>
          <IdAntecedente>${idAntecedente}</IdAntecedente>
          <Aprobado>${aprobado}</Aprobado>
          <DatosExamenXML>string</DatosExamenXML>
        </EnviarResultado>
      </soap:Body>
    </soap:Envelope>`;

    HTTP.setDataSerializer('utf8');

    let [error, result]: any = await to(HTTP.post(
      url,
      data,
      {"Access-Control-Allow-Origin": "*",
      "Content-Type": "text/xml; charset=utf-8",
      "SOAPAction": "http://rut.antsv.gov.py/ConsultarAntecedente"}));

    if (error === 'cordova_not_available') {
      [error, result] = await to(axios.post(url,
        data,
        {headers: 
          {"Access-Control-Allow-Origin": "*",
          "Content-Type": "text/xml; charset=utf-8",
          "SOAPAction": "http://rut.antsv.gov.py/ConsultarAntecedente"}}));
    }

    if (error) throw error;

    console.log(xml2js(result.data,
      {
        ignoreDeclaration: true,
        ignoreAttributes: true,
        compact: true,
        textKey: "text"
      }));

    { /*
      //@ts-ignore */}
    // const { 
    // } = xml2js(result.data,
    // {
    //   ignoreDeclaration: true,
    //   ignoreAttributes: true,
    //   compact: true,
    //   textKey: "text"
    // });

    return;
  } catch (e) {
    throw e;
  }
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
  getCategories,
  getTestedUserData,
  getPreguntasSenhales,
  sendResult,
  getExamDate,
  getDeclaracionJurada,
  getPracticalTestItems,
  saveDeclaracionJurada
};
