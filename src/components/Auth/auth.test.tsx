import axios from "axios";
import { HTTP } from "@ionic-native/http";

import { signInWithUsernameAndPassword } from "./auth";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
jest.mock("@ionic-native/http");
const mockedHTTP = HTTP as jest.Mocked<typeof HTTP>;

describe('signInWithUsernameAndPassword', () => {
  describe("loguea al empleado que realizará el test de manera exitosa", () => {
    const data = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <AutenticarExaminadorResponse xmlns="http://rut.antsv.gov.py/">
          <AutenticarExaminadorResult>
            <Ticket>ticket</Ticket>
            <Entidad>entidad</Entidad>
            <ListaMensajes>
              <MensajesError>
                <CodError>0</CodError>
                <Mensaje>string</Mensaje>
              </MensajesError>
              <MensajesError>
                <CodError>0</CodError>
                <Mensaje>string</Mensaje>
              </MensajesError>
            </ListaMensajes>
          </AutenticarExaminadorResult>
        </AutenticarExaminadorResponse>
      </soap:Body>
    </soap:Envelope>`;

    const PostResponse = {
      data,
      status: 200,
      statusText: "OK",
      headers: {},
      url: "",
    };

    const expectedResult = {
      apellidos: "ANTUNEZ VILLAGRA ",
      cantidad: "1",
      categoria: "MOTOCICLISTA",
      idAntecedente: "2",
      nombres: "MARIA SOL",
      nroDocumento: "0",
      tramite: "PRIMERA VEZ",
    };

    it("con el plugin nativo HTTP", async () => {
      mockedHTTP.post.mockResolvedValueOnce(PostResponse);

      await expect(
        signInWithUsernameAndPassword("username", "password")
      ).resolves.toEqual(expectedResult);
    });

    it("con axios", async () => {
      mockedHTTP.post.mockRejectedValueOnce("cordova_not_available");
      mockedAxios.post.mockResolvedValueOnce(PostResponse);

      await expect(
        signInWithUsernameAndPassword("username", "password")
      ).resolves.toEqual(expectedResult);
    });
  });
});