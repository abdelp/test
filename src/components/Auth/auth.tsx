// @ts-nocheck
import axios from "axios";
import to from "await-to-js";
import { HTTP } from "@ionic-native/http";
import { xml2js } from "xml-js";

const url = "http://www.opaci.org.py:8082/ws/WSAA.asmx?wsdl";

const signInWithUsernameAndPassword = async (
  username: string,
  password: string
) => {
  try {
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

    HTTP.setDataSerializer("utf8");

    let [error, result]: any = await to(
      HTTP.post(url, data, {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/xml; charset=utf-8",
        SOAPAction: "http://rut.antsv.gov.py/AutenticarExaminador",
      })
    );

    if (error === "cordova_not_available") {
      [error, result] = await to(
        axios.post(url, data, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "text/xml; charset=utf-8",
            SOAPAction: "http://rut.antsv.gov.py/AutenticarExaminador",
          },
        })
      );
    }

    if (error) throw error;

    const {
      ["soap:Envelope"]: {
        ["soap:Body"]: {
          AutenticarExaminadorResponse: { AutenticarExaminadorResult },
        },
      },
    } = xml2js(result.data, {
      ignoreDeclaration: true,
      ignoreAttributes: true,
      compact: true,
      textKey: "text",
    });

    return AutenticarExaminadorResult;
  } catch (e) {
    throw e;
  }
};

export { signInWithUsernameAndPassword };
