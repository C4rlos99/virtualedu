import React from "react";
import { useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import InputForm from "../components/InputForm";

export default function Register() {
  // Campo errorMsg de cada estado vacío
  const [nombre, setNombre] = useState({
    value: "",
    errorMsg: "",
  });
  const [apellidos, setApellidos] = useState({
    value: "",
    errorMsg: "",
  });
  const [correo, setCorreo] = useState({
    value: "",
    errorMsg: "",
  });
  const [password, setPassword] = useState({
    value: "",
    errorMsg: "",
  });
  const [rePassword, setRePassword] = useState({
    value: "",
    errorMsg: "",
  });
  const [validated, setValidated] = useState(true);

  // Expresiones regulares para la validación de campos
  const regex = {
    nombre: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{1,}$/, // 1 caracter alfabéticos como minimo
    apellidos: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{1,}$/, // 1 caracter alfabéticos como minimo
    password: /^[a-zA-Z0-9]{4,12}$/, // 4 a 12 caracteres (letras y números). Al menos una minúscula, una mayúscula y un número.
    rePassword: new RegExp(password.value), // Coincide con la contraseña ya escrita
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // Formato de correo válido
  };

  // Mensajes de error para cada campo del formulario register
  const errorMsg = {
    nombre: "El nombre falta o no contiene únicamente caracteres alfanuméricos",
    apellidos:
      "Los apellidos faltan o no contienen únicamente caracteres alfanuméricos",
    password:
      "La contraseña debe tener entre 4 y 12 caracteres y contener mayúscula, minúscula y número",
    rePassword: "Las contraseñas no coinciden",
    correo: "El correo electrónico falta o es inválido",
  };

  const onSubmitHandler = (e) => {
    if (
      validate(nombre.value, regex.nombre) &&
      validate(apellidos.value, regex.apellidos) &&
      validate(correo.value, regex.correo) &&
      validate(password.value, regex.password) &&
      validate(rePassword.value, regex.rePassword)
    ) {
      setValidated(true);
      //...
    } else {
      // Valida nombre
      if (!validate(nombre.value, regex.nombre))
        setNombre({ ...nombre, errorMsg: errorMsg.nombre });

      // Valida apellidos
      if (!validate(apellidos.value, regex.apellidos))
        setApellidos({ ...apellidos, errorMsg: errorMsg.apellidos });

      // Valida correo
      if (!validate(correo.value, regex.correo))
        setCorreo({ ...correo, errorMsg: errorMsg.correo });

      // Valida contraseña
      if (!validate(password.value, regex.password))
        setPassword({ ...password, errorMsg: errorMsg.password });

      // Valida contraseña2
      if (!validate(rePassword.value, regex.rePassword))
        setRePassword({ ...rePassword, errorMsg: errorMsg.rePassword });

      e.preventDefault();
      e.stopPropagation();
    }
  };

  const validate = (value, pattern) => {
    return pattern.test(value.trim());
  };

  const onChangeHandler = (value, setFieldState, pattern, errorMsg) => {
    if (validate(value, pattern)) errorMsg = "";

    setFieldState({ value, errorMsg });
  };

  return (
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
        <Form onSubmit={onSubmitHandler}>
          <Row xs={1} md={2}>
            <Col md={5}>
              <InputForm
                controlId={"nombre"}
                label={"Nombre"}
                placeholder={"Nombre"}
                value={nombre.value}
                errorMsg={nombre.errorMsg}
                type={"text"}
                name={"nombre"}
                onChangeHandler={(nombre) =>
                  onChangeHandler(
                    nombre,
                    setNombre,
                    regex.nombre,
                    errorMsg.nombre
                  )
                }
              />
            </Col>

            <Col md={7}>
              <InputForm
                controlId={"apelliodos"}
                label={"Apellidos"}
                placeholder={"Apellidos"}
                value={apellidos.value}
                errorMsg={apellidos.errorMsg}
                type={"text"}
                name={"apellido"}
                onChangeHandler={(apellido) =>
                  onChangeHandler(
                    apellido,
                    setApellidos,
                    regex.apellidos,
                    errorMsg.apellidos
                  )
                }
              />
            </Col>

            <Col md={12}>
              <InputForm
                controlId={"correo"}
                label={"Correo electrónico"}
                placeholder={"correo@example.com"}
                value={correo.value}
                errorMsg={correo.errorMsg}
                type={"email"}
                name={"correo"}
                onChangeHandler={(correo) =>
                  onChangeHandler(
                    correo,
                    setCorreo,
                    regex.correo,
                    errorMsg.correo
                  )
                }
              />
            </Col>

            <Col>
              <InputForm
                controlId={"password"}
                label={"Contraseña"}
                placeholder={"Contraseña"}
                value={password.value}
                errorMsg={password.errorMsg}
                type={"password"}
                name={"password"}
                onChangeHandler={(password) =>
                  onChangeHandler(
                    password,
                    setPassword,
                    regex.password,
                    errorMsg.password
                  )
                }
              />
            </Col>

            <Col>
              <InputForm
                controlId={"rePassword"}
                label={"Repita la contraseña"}
                placeholder={"Repita la contraseña"}
                value={rePassword.value}
                errorMsg={rePassword.errorMsg}
                type={"password"}
                name={"rePassword"}
                onChangeHandler={(rePassword) =>
                  onChangeHandler(
                    rePassword,
                    setRePassword,
                    regex.rePassword,
                    errorMsg.rePassword
                  )
                }
              />
            </Col>
          </Row>

          <Button variant="primary" type="submit">
            Continuar
          </Button>
        </Form>

        <hr></hr>

        <Row xs={1} md={2}>
          <Col md="auto">
            <p>¿Ya tienes una cuenta?</p>
          </Col>
          <Col md="auto">
            <Link to={"/login"}>Iniciar sesión</Link>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
