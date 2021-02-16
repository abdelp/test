import axios from "axios";
import { HTTP } from "@ionic-native/http";

import { obtenerDatosUsuarioTesteado } from "./";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
jest.mock("@ionic-native/http");
const mockedHTTP = HTTP as jest.Mocked<typeof HTTP>;

describe("obtenerDatosUsuarioTesteado", () => {
  describe("obtiene exitosamente los datos del usuario a ser testeado", () => {
    const data = `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
        <soap:Body>
          <ConsultarAntecedenteResponse xmlns="http://rut.antsv.gov.py/">
            <ConsultarAntecedenteResult>
              <CodError>0</CodError>
              <Antecedentes>
                <ConsultaAntecedente>
                  <IdAntecedente>2</IdAntecedente>
                  <Documento />
                  <Categoria>MOTOCICLISTA</Categoria>
                  <Tramite>PRIMERA VEZ</Tramite>
                  <Estado>GENERADO</Estado>
                  <Fecha>2021-01-28T02:36:25</Fecha>
                  <Apellidos>ANTUNEZ VILLAGRA </Apellidos>
                  <Nombres>MARIA SOL</Nombres>
                </ConsultaAntecedente>
              </Antecedentes>
              <Cantidad>1</Cantidad>
            </ConsultarAntecedenteResult>
          </ConsultarAntecedenteResponse>
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
        obtenerDatosUsuarioTesteado("valid token", "0", "cedula")
      ).resolves.toEqual(expectedResult);
    });

    it("con axios", async () => {
      mockedHTTP.post.mockRejectedValueOnce("cordova_not_available");
      mockedAxios.post.mockResolvedValueOnce(PostResponse);

      await expect(
        obtenerDatosUsuarioTesteado("valid token", "0", "cedula")
      ).resolves.toEqual(expectedResult);
    });
  });

  describe("retorna antecedente vacío cuando no encuentra el usuario a ser testeado", () => {
    const data = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
      <soap:Body>
        <ConsultarAntecedenteResponse xmlns="http://rut.antsv.gov.py/">
          <ConsultarAntecedenteResult>
            <CodError>0</CodError>
            <Antecedentes />
            <Cantidad>0</Cantidad>
          </ConsultarAntecedenteResult>
        </ConsultarAntecedenteResponse>
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
      apellidos: null,
      cantidad: "0",
      categoria: null,
      idAntecedente: null,
      nombres: null,
      nroDocumento: "0",
      tramite: null,
    };

    it("con el plugin nativo HTTP", async () => {
      mockedHTTP.post.mockResolvedValueOnce(PostResponse);

      await expect(
        obtenerDatosUsuarioTesteado("valid token", "0", "cedula")
      ).resolves.toEqual(expectedResult);
    });

    it("con axios", async () => {
      mockedHTTP.post.mockRejectedValueOnce("cordova_not_available");
      mockedAxios.post.mockResolvedValueOnce(PostResponse);

      await expect(
        obtenerDatosUsuarioTesteado("valid token", "0", "cedula")
      ).resolves.toEqual(expectedResult);
    });
  });

  describe("obtiene erroneamente los datos del usuario a ser testeado", () => {
    it("con el plugin nativo HTTP", async () => {
      const error = {
        status: -1,
        error:
          "There was an error with the request: Failed to connect to www.opaci.org.py/190.128.227.98:8082",
      };

      mockedHTTP.post.mockRejectedValueOnce(error);

      await expect(
        obtenerDatosUsuarioTesteado("valid token", "0", "cedula")
      ).rejects.toEqual(error);
    });

    it("con axios", async () => {
      const errorMessage = "Network Error";
      mockedHTTP.post.mockRejectedValueOnce("cordova_not_available");

      mockedAxios.post.mockImplementationOnce(() =>
        Promise.reject(new Error(errorMessage))
      );

      await expect(
        obtenerDatosUsuarioTesteado("valid token", "0", "cedula")
      ).rejects.toThrow(errorMessage);
    });
  });
});
