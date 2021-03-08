import React from "react";
import { render } from "@testing-library/react";
import { ionFireEvent as fireEvent } from "@ionic/react-test-utils";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";

test("page should have a title of Ionic React Tools", async () => {
  const { findByPlaceholderText, findByText, findByDisplayValue } = render(
    <Router>
      <Login />
    </Router>
  );
  const usuarioInput = await findByPlaceholderText("USUARIO");
  const contrasenaInput = await findByPlaceholderText("CONTRASEÑA");
  fireEvent.ionChange(usuarioInput, "junior");
  fireEvent.ionChange(contrasenaInput, "1234");
  const aceptarBtn = await findByDisplayValue("ACEPTAR");
  fireEvent.click(aceptarBtn);
  await findByText("Usuario y/o contraseña incorrecta");
});
