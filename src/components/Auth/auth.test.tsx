import axios from "axios";
import { HTTP } from "@ionic-native/http";

import { signInWithUsernameAndPassword } from "./auth";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
jest.mock("@ionic-native/http");
const mockedHTTP = HTTP as jest.Mocked<typeof HTTP>;

describe("signInWithUsernameAndPassword", () => {
  describe("retorna datos del usuario de manera exitosa", () => {
    const data = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
      <soap:Body>
        <AutenticarExaminadorResponse xmlns="http://rut.antsv.gov.py/">
          <AutenticarExaminadorResult>
            <CodError>0</CodError>
            <Ticket>e201994dca9320fc94336603b1cfc970</Ticket>
            <Entidad>Test</Entidad>
            <ListaMensajes>
              <MensajesError>
                <CodError>0</CodError>
                <Mensaje>OK</Mensaje>
              </MensajesError>
              <MensajesError>
                <CodError>1</CodError>
                <Mensaje>Error General</Mensaje>
              </MensajesError>
              <MensajesError>
                <CodError>2</CodError>
                <Mensaje>Error generico en Base de Datos</Mensaje>
              </MensajesError>
              <MensajesError>
                <CodError>3</CodError>
                <Mensaje>No se encontraron coincidencias</Mensaje>
              </MensajesError>
              <MensajesError>
                <CodError>4</CodError>
                <Mensaje>No tiene permisos para esta operación</Mensaje>
              </MensajesError>
              <MensajesError>
                <CodError>5</CodError>
                <Mensaje>Token expirado</Mensaje>
              </MensajesError>
              <MensajesError>
                <CodError>6</CodError>
                <Mensaje>Usuario y/o contraseña incorrecta</Mensaje>
              </MensajesError>
              <MensajesError>
                <CodError>7</CodError>
                <Mensaje>Usuario inhabilitado</Mensaje>
              </MensajesError>
              <MensajesError>
                <CodError>8</CodError>
                <Mensaje>No existe ningún filtro de búsqueda</Mensaje>
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
      codError: "0",
      entidad: "Test",
      mensaje: "OK",
      ticket: "e201994dca9320fc94336603b1cfc970",
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

  describe("retorna estado de usuario no encontrado de manera exitosa", () => {
    const data = `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
        <soap:Body>
          <AutenticarExaminadorResponse xmlns="http://rut.antsv.gov.py/">
            <AutenticarExaminadorResult>
              <CodError>6</CodError>
              <ListaMensajes>
                <MensajesError>
                  <CodError>0</CodError>
                  <Mensaje>OK</Mensaje>
                </MensajesError>
                <MensajesError>
                  <CodError>1</CodError>
                  <Mensaje>Error General</Mensaje>
                </MensajesError>
                <MensajesError>
                  <CodError>2</CodError>
                  <Mensaje>Error generico en Base de Datos</Mensaje>
                </MensajesError>
                <MensajesError>
                  <CodError>3</CodError>
                  <Mensaje>No se encontraron coincidencias</Mensaje>
                </MensajesError>
                <MensajesError>
                  <CodError>4</CodError>
                  <Mensaje>No tiene permisos para esta operación</Mensaje>
                </MensajesError>
                <MensajesError>
                  <CodError>5</CodError>
                  <Mensaje>Token expirado</Mensaje>
                </MensajesError>
                <MensajesError>
                  <CodError>6</CodError>
                  <Mensaje>Usuario y/o contraseña incorrecta</Mensaje>
                </MensajesError>
                <MensajesError>
                  <CodError>7</CodError>
                  <Mensaje>Usuario inhabilitado</Mensaje>
                </MensajesError>
                <MensajesError>
                  <CodError>8</CodError>
                  <Mensaje>No existe ningún filtro de búsqueda</Mensaje>
                </MensajesError>
              </ListaMensajes>
            </AutenticarExaminadorResult>
          </AutenticarExaminadorResponse>
        </soap:Body>
      </soap:Envelope>`;

    const expectedResult = {
      codError: "6",
      entidad: null,
      mensaje: "Usuario y/o contraseña incorrecta",
      ticket: null,
    };

    const PostResponse = {
      data,
      status: 200,
      statusText: "OK",
      headers: {},
      url: "",
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

  describe("loguea erroneamente al usuario", () => {
    it("con el plugin nativo HTTP", async () => {
      const error = {
        status: -1,
        error:
          "There was an error with the request: Failed to connect to www.opaci.org.py/190.128.227.98:8082",
      };

      mockedHTTP.post.mockRejectedValueOnce(error);

      await expect(
        signInWithUsernameAndPassword("username", "password")
      ).rejects.toEqual(error);
    });

    it("con axios", async () => {
      const errorMessage = "Network Error";
      mockedHTTP.post.mockRejectedValueOnce("cordova_not_available");

      mockedAxios.post.mockImplementationOnce(() =>
        Promise.reject(new Error(errorMessage))
      );

      await expect(
        signInWithUsernameAndPassword("username", "password")
      ).rejects.toThrow(errorMessage);
    });
  });
});
