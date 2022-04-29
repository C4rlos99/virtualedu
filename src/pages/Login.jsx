import React from "react";
import { useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import InputForm from "../components/InputForm";

export default function Login() {
  const [correo, setCorreo] = useState({
    value: "",
    errorMsg: "",
  });
  const [password, setPassword] = useState({
    value: "",
    errorMsg: "",
  });
  const [validated, setValidated] = useState(true);

  // Mensajes de error para cada campo del formulario login
  const errorMsg = {
    correo: "Introduce un correo electrónico",
    password: "Introduce una contraseña",
  };

  const onSubmitHandler = (e) => {
    if (correo.value && password.value) {
      setValidated(true);
      //...
    } else {
      // Valida correo
      if (!correo.value) setCorreo({ ...correo, errorMsg: errorMsg.correo });

      // Valida contraseña
      if (!password.value)
        setPassword({ ...password, errorMsg: errorMsg.password });

      e.preventDefault();
      e.stopPropagation();
    }
  };

  const onChangeHandler = (value, setFieldState, errorMsg) => {
    if (value) errorMsg = "";

    setFieldState({ value, errorMsg });
  };

  return (
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
        <Form onSubmit={onSubmitHandler}>
          <InputForm
            controlId={"correo"}
            label={"Correo electrónico"}
            placeholder={"correo@example.com"}
            value={correo.value}
            errorMsg={correo.errorMsg}
            type={"email"}
            name={"correo"}
            onChangeHandler={(correo) =>
              onChangeHandler(correo, setCorreo, errorMsg.correo)
            }
          />

          <InputForm
            controlId={"password"}
            label={"Contraseña"}
            placeholder={"Contraseña"}
            value={password.value}
            errorMsg={password.errorMsg}
            type={"password"}
            name={"password"}
            onChangeHandler={(password) =>
              onChangeHandler(password, setPassword, errorMsg.password)
            }
          />

          <Button variant="primary" type="submit">
            Iniciar Sesión
          </Button>
        </Form>

        <hr></hr>

        <Row xs={1} md={2}>
          <Col md={8}>
            <p>¿Aún no tienes una cuenta?</p>
          </Col>
          <Col md={4}>
            <Link to={"/register"}>Registrarse</Link>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
