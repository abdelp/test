import axios from "axios";
import { obtenerDatosUsuarioTesteado } from "./";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("obtenerDatosUsuarioTesteado", () => {
  it("obtiene exitosamente los datos del usuario a ser testeado", async () => {
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

    const AxiosPostResponse = { data, status: 200, statusText: "OK" };

    mockedAxios.post.mockImplementationOnce(() => Promise.resolve(AxiosPostResponse));

    await expect(
      obtenerDatosUsuarioTesteado("valid token", "0", "cedula")
    ).resolves.toEqual({
      apellidos: "ANTUNEZ VILLAGRA ",
      cantidad: "1",
      categoria: "MOTOCICLISTA",
      idAntecedente: "2",
      nombres: "MARIA SOL",
      nroDocumento: "0",
      tramite: "PRIMERA VEZ",
    });
  });

  it("obtiene erroneamente los datos del usuario a ser testeado", async () => {
    const errorMessage = 'Network Error';
    mockedAxios.post.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)));

      await expect(
        obtenerDatosUsuarioTesteado("valid token", "0", "cedula")
      ).rejects.toThrow(errorMessage);
  });
});
