import React, { useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import InputForm from "../componentes/InputForm";
import { feedBackRegistro } from "../constantes/feedBack.js";
import { regex } from "../constantes/regex.js";
import swal from "sweetalert";
import { registarUsuario } from "../servicios/usuarioServicio";

export default function Registrarse() {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [nombreFeedBack, setNombreFeedBack] = useState("");
  const [apellidosFeedBack, setApellidosFeedBack] = useState("");
  const [correoFeedBack, setCorreoFeedBack] = useState("");
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
        password: password,
        rePassword: rePassword,
      }).then((resultado) => {
        switch (resultado.status) {
          case 200:
            mostrarAlerta(resultado.mensaje, "success");
            setRedireccion(true);
            break;
          case 422:
            if (resultado.errores.correo)
              setCorreoFeedBack(resultado.errores.correo[0]);
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
      if (!valido(nombre, regex.nombre))
        setNombreFeedBack(feedBackRegistro.nombre);

      if (!valido(apellidos, regex.apellidos))
        setApellidosFeedBack(feedBackRegistro.apellidos);

      if (!valido(correo, regex.correo))
        setCorreoFeedBack(feedBackRegistro.correo);

      if (!valido(password, regex.password))
        setPasswordFeedBack(feedBackRegistro.password);

      if (!valido(rePassword, regexRePassword))
        setRePasswordFeedBack(feedBackRegistro.rePassword);
    }
  };

  const valido = (valor, patron) => {
    return patron.test(valor.trim());
  };

  const handleChange = (
    valor,
    setEstadoCampo,
    setEstadoFeedBack,
    patron,
    feedBack
  ) => {
    if (valido(valor, patron)) feedBack = "";

    setEstadoCampo(valor);
    setEstadoFeedBack(feedBack);
  };

  return redireccion ? (
    <Navigate to="/iniciar-sesion" replace />
  ) : (
    <Container style={{ maxWidth: 650 }}>
      <div className="text-center">
        <Image
          alt="Logo de la web"
          src={process.env.PUBLIC_URL + "/icons/exampleIncon.png"}
          className="img-fluid mb-3"
          width="150"
          height="150"
        />
      </div>

      <div className="border rounded-3 p-4">
        <h2>Crear cuenta</h2>
        <hr></hr>
        <Form onSubmit={handleSubmit}>
          <Row xs={1} md={2}>
            <Col md={5}>
              <InputForm
                controlId="nombre"
                label="Nombre"
                placeHolder="Nombre"
                value={nombre}
                feedBack={nombreFeedBack}
                type="text"
                name="nombre"
                handleChange={(nombre) =>
                  handleChange(
                    nombre,
                    setNombre,
                    setNombreFeedBack,
                    regex.nombre,
                    feedBackRegistro.nombre
                  )
                }
              />
            </Col>

            <Col md={7}>
              <InputForm
                controlId="apelliodos"
                label="Apellidos"
                placeHolder="Apellidos"
                value={apellidos}
                feedBack={apellidosFeedBack}
                type="text"
                name="apellido"
                handleChange={(apellido) =>
                  handleChange(
                    apellido,
                    setApellidos,
                    setApellidosFeedBack,
                    regex.apellidos,
                    feedBackRegistro.apellidos
                  )
                }
              />
            </Col>

            <Col md={12}>
              <InputForm
                controlId="correo"
                label="Correo electrónico"
                placeHolder="correo@example.com"
                value={correo}
                feedBack={correoFeedBack}
                type="email"
                name="correo"
                handleChange={(correo) =>
                  handleChange(
                    correo,
                    setCorreo,
                    setCorreoFeedBack,
                    regex.correo,
                    feedBackRegistro.correo
                  )
                }
              />
            </Col>

            <Col>
              <InputForm
                controlId="password"
                label="Contraseña"
                placeHolder="Contraseña"
                value={password}
                feedBack={passwordFeedBack}
                type="password"
                name="password"
                handleChange={(password) =>
                  handleChange(
                    password,
                    setPassword,
                    setPasswordFeedBack,
                    regex.password,
                    feedBackRegistro.password
                  )
                }
              />
            </Col>

            <Col>
              <InputForm
                controlId="rePassword"
                label="Repita la contraseña"
                placeHolder="Repita la contraseña"
                value={rePassword}
                feedBack={rePasswordFeedBack}
                type="password"
                name="rePassword"
                handleChange={(rePassword) =>
                  handleChange(
                    rePassword,
                    setRePassword,
                    setRePasswordFeedBack,
                    regexRePassword,
                    feedBackRegistro.rePassword
                  )
                }
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
  );
}
