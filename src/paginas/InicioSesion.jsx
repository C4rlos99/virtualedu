import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { BsInfoCircle } from "react-icons/bs";
import { feedBackInicioSesion } from "../constantes/feedBack.js";
import {
  iniciarSesion,
  obtenerUsuarioAutenticado,
} from "../servicios/usuarioServicio";
import { Link, Navigate } from "react-router-dom";
import InputForm from "../componentes/InputForm";
import { UsuarioContext } from "../context/UsuarioContext.js";
import "../style.css";
import swal from "sweetalert";

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
            obtenerUsuarioAutenticado().then((resultado) => {
              switch (resultado.status) {
                case 200:
                  setUsuario(resultado.usuario);
                  localStorage.setItem(
                    "usuario",
                    JSON.stringify(resultado.usuario)
                  );
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
    <Container style={{ maxWidth: 400 }}>
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
            controlId={"correo"}
            label={"Correo electrónico"}
            placeholder={"correo@example.com"}
            value={correo}
            feedBack={correoFeedBack}
            type={"email"}
            name={"correo"}
            handleChange={(correo) =>
              handleChange(
                correo,
                setCorreo,
                setCorreoFeedBack,
                feedBackInicioSesion.correo
              )
            }
          />

          <InputForm
            controlId={"password"}
            label={"Contraseña"}
            placeholder={"Contraseña"}
            value={password}
            feedBack={passwordFeedBack}
            type={"password"}
            name={"password"}
            handleChange={(password) =>
              handleChange(
                password,
                setPassword,
                setPasswordFeedBack,
                feedBackInicioSesion.password
              )
            }
          />

          <Button variant="primary" type="submit" disabled={!activo}>
            Iniciar Sesión
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
  );
}
