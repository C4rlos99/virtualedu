import React, { useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import InputForm from "../componentes/InputForm";
import { feedBackRegistro } from "../constantes/feedBack.js";
import logo from "../icons/virtualEdu_logo.png";
import { regex } from "../constantes/regex.js";
import swal from "sweetalert";
import { registarUsuario } from "../servicios/usuarioServicio";

export default function Registrarse() {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [googleSheetUrl, setGoogleSheetUrl] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [nombreFeedBack, setNombreFeedBack] = useState("");
  const [apellidosFeedBack, setApellidosFeedBack] = useState("");
  const [correoFeedBack, setCorreoFeedBack] = useState("");
  const [googleSheetUrlFeedBack, setGoogleSheetUrlFeedBack] = useState("");
  const [passwordFeedBack, setPasswordFeedBack] = useState("");
  const [rePasswordFeedBack, setRePasswordFeedBack] = useState("");
  const [activo, setActivo] = useState(true);
  const [redireccion, setRedireccion] = useState(false);
  const regexRePassword = new RegExp(password);

  const mostrarAlerta = (texto, icono) => {
    console.log(texto);
    swal({
      title: "Registro",
      text: texto,
      icon: icono,
      buttons: "aceptar",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      valido(nombre, regex.nombre) &&
      valido(apellidos, regex.apellidos) &&
      valido(correo, regex.correo) &&
      valido(password, regex.password) &&
      valido(rePassword, regexRePassword)
    ) {
      setActivo(false);

      registarUsuario({
        nombre: nombre,
        apellidos: apellidos,
        correo: correo,
        spread_sheet_id: googleSheetUrl ? /\/([\w-_]{15,})\/(.*?gid=(\d+))?/.exec(googleSheetUrl)[1] : null,
        password: password,
        rePassword: rePassword,
      }).then((resultado) => {
        switch (resultado.status) {
          case 200:
            mostrarAlerta(resultado.mensaje, "success");
            setRedireccion(true);
            break;
          case 422:
            if (resultado.errores.correo) setCorreoFeedBack(resultado.errores.correo[0]);
            else {
              mostrarAlerta(resultado.mensaje, "error");
            }
            break;
          default:
            break;
        }
        setActivo(true);
      });
    } else {
      if (!valido(nombre, regex.nombre)) setNombreFeedBack(feedBackRegistro.nombre);

      if (!valido(apellidos, regex.apellidos)) setApellidosFeedBack(feedBackRegistro.apellidos);

      if (!valido(correo, regex.correo)) setCorreoFeedBack(feedBackRegistro.correo);

      if (!valido(password, regex.password)) setPasswordFeedBack(feedBackRegistro.password);

      if (!valido(rePassword, regexRePassword)) setRePasswordFeedBack(feedBackRegistro.rePassword);
    }
  };

  const valido = (valor, patron) => {
    return patron != "" ? patron.test(valor.trim()) : true;
  };

  const handleChange = (valor, setEstadoCampo, setEstadoFeedBack, patron, feedBack) => {
    if (valido(valor, patron)) feedBack = "";

    setEstadoCampo(valor);
    setEstadoFeedBack(feedBack);
  };

  return redireccion ? (
    <Navigate to="/iniciar-sesion" replace />
  ) : (
    <div className="wrapper">
      <Container style={{ maxWidth: 650, marginTop: 20 }}>
        <div className="text-center">
          <Image alt="Logo de la web" src={logo} className="img-fluid mb-3" width="280" height="280" />
        </div>

        <div className="border rounded-3 p-4">
          <h2>Crear cuenta</h2>
          <hr></hr>
          <Form onSubmit={handleSubmit}>
            <Row xs={1} md={2}>
              <Col md={5}>
                <InputForm
                  controlId="nombre"
                  label="Nombre*"
                  placeHolder="Nombre"
                  value={nombre}
                  feedBack={nombreFeedBack}
                  type="text"
                  name="nombre"
                  handleChange={(nombre) => handleChange(nombre, setNombre, setNombreFeedBack, regex.nombre, feedBackRegistro.nombre)}
                />
              </Col>

              <Col md={7}>
                <InputForm
                  controlId="apelliodos"
                  label="Apellidos*"
                  placeHolder="Apellidos"
                  value={apellidos}
                  feedBack={apellidosFeedBack}
                  type="text"
                  name="apellido"
                  handleChange={(apellido) => handleChange(apellido, setApellidos, setApellidosFeedBack, regex.apellidos, feedBackRegistro.apellidos)}
                />
              </Col>

              <Col md={12}>
                <InputForm
                  controlId="correo"
                  label="Correo electrónico*"
                  placeHolder="correo@example.com"
                  value={correo}
                  feedBack={correoFeedBack}
                  type="email"
                  name="correo"
                  handleChange={(correo) => handleChange(correo, setCorreo, setCorreoFeedBack, regex.correo, feedBackRegistro.correo)}
                />
              </Col>

              <Col md={12}>
                <InputForm
                  controlId="googleSheet"
                  label="Enlace a la hoja de cálculo de google (Editable para cualquier usuario)"
                  placeHolder="https://docs.google.com/spreadsheets/d/1kB5NrwxAgeeoRfdgJ4l1FYJJr-RIDltMVfm8_4jfAM4/edit#gid=0"
                  value={googleSheetUrl}
                  feedBack={googleSheetUrlFeedBack}
                  type="text"
                  name="googleSheet"
                  handleChange={(googleSheetUrl) => handleChange(googleSheetUrl, setGoogleSheetUrl, setGoogleSheetUrlFeedBack, "", "")}
                />
              </Col>

              <Col>
                <InputForm
                  controlId="password"
                  label="Contraseña*"
                  placeHolder="Contraseña"
                  value={password}
                  feedBack={passwordFeedBack}
                  type="password"
                  name="password"
                  handleChange={(password) => handleChange(password, setPassword, setPasswordFeedBack, regex.password, feedBackRegistro.password)}
                />
              </Col>

              <Col>
                <InputForm
                  controlId="rePassword"
                  label="Repita la contraseña*"
                  placeHolder="Repita la contraseña"
                  value={rePassword}
                  feedBack={rePasswordFeedBack}
                  type="password"
                  name="rePassword"
                  handleChange={(rePassword) => handleChange(rePassword, setRePassword, setRePasswordFeedBack, regexRePassword, feedBackRegistro.rePassword)}
                />
              </Col>
            </Row>

            <Button variant="primary" type="submit" disabled={!activo}>
              Continuar
            </Button>
          </Form>

          <hr></hr>

          <Row xs={1} md={2}>
            <Col md="auto">
              <p>¿Ya tienes una cuenta?</p>
            </Col>
            <Col md="auto">
              <Link to={"/iniciar-sesion"}>Iniciar sesión</Link>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
