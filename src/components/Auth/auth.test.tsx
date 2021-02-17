import axios from "axios";
import { HTTP } from "@ionic-native/http";

import { signInWithUsernameAndPassword } from "./auth";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
jest.mock("@ionic-native/http");
const mockedHTTP = HTTP as jest.Mocked<typeof HTTP>;

describe("signInWithUsernameAndPassword", () => {
  describe("retorna datos del empleado que realizará el test de manera exitosa", () => {
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
      ListaMensajes: {
        MensajesError: [
          { CodError: { text: "0" }, Mensaje: { text: "OK" } },
          { CodError: { text: "1" }, Mensaje: { text: "Error General" } },
          {
            CodError: { text: "2" },
            Mensaje: { text: "Error generico en Base de Datos" },
          },
          {
            CodError: { text: "3" },
            Mensaje: { text: "No se encontraron coincidencias" },
          },
          {
            CodError: { text: "4" },
            Mensaje: { text: "No tiene permisos para esta operación" },
          },
          { CodError: { text: "5" }, Mensaje: { text: "Token expirado" } },
          {
            CodError: { text: "6" },
            Mensaje: { text: "Usuario y/o contraseña incorrecta" },
          },
          {
            CodError: { text: "7" },
            Mensaje: { text: "Usuario inhabilitado" },
          },
          {
            CodError: { text: "8" },
            Mensaje: { text: "No existe ningún filtro de búsqueda" },
          },
        ],
      },
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

  describe("", () => {
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
  });
});
