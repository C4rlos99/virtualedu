import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { BsInfoCircle } from "react-icons/bs";
import { feedBackInicioSesion } from "../constantes/feedBack.js";
import logo from "../icons/virtualEdu_logo.png";
import { iniciarSesion, obtenerUsuarioAutenticado } from "../servicios/usuarioServicio";
import { Link, Navigate } from "react-router-dom";
import InputForm from "../componentes/InputForm";
import { UsuarioContext } from "../context/UsuarioContext.js";
import "../style.css";
import swal from "sweetalert";
import { obtenerEscenaTipos } from "../servicios/escenaTipoServicio.js";
import { obtenerLenguajes } from "../servicios/lenguajeServicio.js";

export default function InicioSesion() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [correoFeedBack, setCorreoFeedBack] = useState("");
  const [passwordFeedBack, setPasswordFeedBack] = useState("");
  const [activo, setActivo] = useState(true);
  const [redireccion, setRedireccion] = useState(false);
  const [credencialesFeedback, setCredencialesFeedback] = useState("");
  const { setUsuario } = useContext(UsuarioContext);

  const mostrarAlerta = (texto) => {
    swal({
      title: "Usuario",
      text: texto,
      icon: "error",
      buttons: "aceptar",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (correo && password) {
      setActivo(false);

      iniciarSesion({
        correo: correo,
        password: password,
      }).then((resultado) => {
        switch (resultado.status) {
          case 200:
            obtenerEscenaTipos().then((resultado) => {
              if (resultado.status === 200) localStorage.setItem("escenaTipos", JSON.stringify(resultado.escena_tipos));
            });

            obtenerLenguajes().then((resultado) => {
              localStorage.setItem("lenguajes", JSON.stringify(resultado.lenguajes));
            });

            obtenerUsuarioAutenticado().then((resultado) => {
              switch (resultado.status) {
                case 200:
                  setUsuario(resultado.usuario);
                  localStorage.setItem("usuario", JSON.stringify(resultado.usuario));
                  setRedireccion(true);
                  break;
                case 401:
                  mostrarAlerta(resultado.mensaje);
                  break;
                default:
                  break;
              }
              setActivo(true);
            });
            break;
          case 401:
            setCredencialesFeedback(resultado.mensaje);
            setActivo(true);
            break;
          default:
            break;
        }
      });
    } else {
      if (!correo) setCorreoFeedBack(feedBackInicioSesion.correo);

      if (!password) setPasswordFeedBack(feedBackInicioSesion.password);
    }
  };

  const handleChange = (valor, setEstadoCampo, setEstadoFeedBack, feedBack) => {
    if (valor) feedBack = "";

    setEstadoCampo(valor);
    setEstadoFeedBack(feedBack);
  };

  return redireccion ? (
    <Navigate to="/escenarios" replace />
  ) : (
    <div className="wrapper">
      <Container style={{ maxWidth: 400, marginTop: 20 }}>
        <div className="text-center">
          <Image alt="Logo de la web" src={logo} className="img-fluid mb-3" width="280" height="280" />
        </div>

        <div className="border rounded-3 p-4">
          <h2>Iniciar sesión</h2>
          <hr></hr>

          {credencialesFeedback && (
            <div id="credenciales-invalidas">
              <BsInfoCircle />
              <p>{credencialesFeedback}</p>
            </div>
          )}

          <Form onSubmit={handleSubmit}>
            <InputForm
              controlId="correo"
              label="Correo electrónico"
              placeHolder="correo@example.com"
              value={correo}
              feedBack={correoFeedBack}
              type="email"
              name="correo"
              handleChange={(correo) => handleChange(correo, setCorreo, setCorreoFeedBack, feedBackInicioSesion.correo)}
            />

            <InputForm
              controlId="password"
              label="Contraseña"
              placeHolder="Contraseña"
              value={password}
              feedBack={passwordFeedBack}
              type="password"
              name="password"
              handleChange={(password) => handleChange(password, setPassword, setPasswordFeedBack, feedBackInicioSesion.password)}
            />

            <Button variant="primary" type="submit" disabled={!activo}>
              Iniciar sesión
            </Button>
          </Form>

          <hr></hr>

          <Row xs={1} md={2}>
            <Col md={8}>
              <p>¿Aún no tienes una cuenta?</p>
            </Col>
            <Col md={4}>
              <Link to={"/registrarse"}>Registrarse</Link>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
