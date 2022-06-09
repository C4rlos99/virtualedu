import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Header from "../componentes/Header";
import { Container, Row, Col, Form, Button, FormSelect } from "react-bootstrap";
import Footer from "../componentes/Footer";
import { Navigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { feedBackEscenario } from "../constantes/feedBack";
import InputForm from "../componentes/InputForm";
import CheckForm from "../componentes/CheckForm";
import {
  modificarEscenario,
  obtenerEscenario,
} from "../servicios/escenarioServicio";
import { obtenerEscenas } from "../servicios/escenaServicio";
import Escena from "../componentes/Escena";

export default function Escenario() {
  const [titulo, setTitulo] = useState("");
  const [visible, setVisible] = useState(false);
  const [lenguaje, setLenguaje] = useState("0");
  const [tituloFeedBack, setTituloFeedBack] = useState("");
  const [lenguajeFeedBack, setLenguajeFeedBack] = useState("");
  const [submitActivo, setSubmitActivo] = useState(true);
  const [redireccion, setRedireccion] = useState(false);
  const [path, setPath] = useState("");
  const [escenaRaiz, setEscenaRaiz] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    obtenerEscenario(id).then((resultado) => {
      switch (resultado.status) {
        case 200:
          setTitulo(resultado.escenario.titulo);
          setLenguaje(resultado.escenario.lenguaje_id);
          setVisible(resultado.escenario.visible);
          obtenerEscenas(id).then((resultado) => {
            switch (resultado.status) {
              case 200:
                setEscenaRaiz(resultado.escenas);
                break;
              case 403:
                mostrarAlerta(resultado.mensaje, "error", "escenario");
                setPath("/escenarios");
                setRedireccion(true);
                break;
              case 401:
                mostrarAlerta(resultado.mensaje, "error", "Usuario");
                setPath("/iniciar-sesion");
                setRedireccion(true);
                break;
              default:
                break;
            }
          });
          break;
        case 403:
          mostrarAlerta(resultado.mensaje, "error", "Escenario");
          setPath("/escenarios");
          setRedireccion(true);
          break;
        case 401:
          mostrarAlerta(resultado.mensaje, "error", "Usuario");
          setPath("/iniciar-sesion");
          setRedireccion(true);
          break;
        default:
          break;
      }
    });
  }, [id]);

  const handleChangeTitulo = (titulo) => {
    setTitulo(titulo);
    titulo
      ? setTituloFeedBack("")
      : setTituloFeedBack(feedBackEscenario.titulo);
  };

  const handleChangeLenguaje = (e) => {
    setLenguaje(e.target.value);
    e.target.value !== "0"
      ? setLenguajeFeedBack("")
      : setLenguajeFeedBack(feedBackEscenario.lenguaje);
  };

  const handleChangeVisible = (visible) => {
    setVisible(visible);
  };

  const mostrarAlerta = (texto, icono, titulo) => {
    swal({
      title: titulo,
      text: texto,
      icon: icono,
      buttons: "aceptar",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (titulo) {
      setSubmitActivo(false);

      modificarEscenario({
        id: id,
        titulo: titulo,
        lenguaje_id: lenguaje,
        visible: visible,
      }).then((resultado) => {
        switch (resultado.status) {
          case 200:
            mostrarAlerta(resultado.mensaje, "success");
            break;
          case 422:
            mostrarAlerta(resultado.mensaje, "error");
            break;
          case 403:
            mostrarAlerta(resultado.mensaje, "error");
            break;
          default:
            break;
        }
        setSubmitActivo(true);
      });
    } else setTituloFeedBack(feedBackEscenario.titulo);
  };
  return redireccion ? (
    <Navigate to={path} replace />
  ) : (
    <div className="wrapper">
      <Header />

      <Container className="content">
        <div id="datos-escenario">
          <Form>
            <Row>
              <Col sm={12} md={7}>
                <InputForm
                  controlId="titulo-escenario"
                  label="Titulo del escenario virtual"
                  placeHolder="Título del escenario virtual"
                  value={titulo}
                  feedBack={tituloFeedBack}
                  type="text"
                  name="titulo-escenario"
                  handleChange={(titulo) =>
                    handleChangeTitulo(
                      titulo,
                      setTitulo,
                      setTituloFeedBack,
                      feedBackEscenario.titulo
                    )
                  }
                />
              </Col>

              <Col sm={10} md={4}>
                <Form.Group>
                  <Form.Label>Selecciona el lenguaje</Form.Label>
                  <FormSelect
                    id="lenguaje-selector"
                    value={lenguaje}
                    onChange={(lenguaje) =>
                      handleChangeLenguaje(
                        lenguaje,
                        setLenguaje,
                        setLenguajeFeedBack,
                        feedBackEscenario.lenguaje
                      )
                    }
                  >
                    <option className="text-center" value="0">
                      -- Seleccione el lenguaje --
                    </option>
                    {JSON.parse(localStorage.getItem("lenguajes")).map(
                      (lenguaje) => (
                        <option key={lenguaje.id} value={lenguaje.id}>
                          {lenguaje.nombre}
                        </option>
                      )
                    )}
                  </FormSelect>
                </Form.Group>
                <p className="error-msg">{lenguajeFeedBack}</p>
              </Col>

              <Col sm={2} md={1}>
                <CheckForm
                  controlId="visible"
                  label="Visible"
                  checked={visible}
                  name="visible"
                  handleChange={(visible) => handleChangeVisible(visible)}
                />
              </Col>
            </Row>

            <div className="d-flex justify-content-center">
              <Button
                disabled={!submitActivo}
                id="guardar-escenario"
                variant="primary"
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                Guardar
              </Button>
            </div>
          </Form>
        </div>
        <br />
        <h3>Escenas</h3>
        <br />

        <div className="d-flex">
          <div>
            <Escena escena={escenaRaiz} escenarioId={id} />
          </div>
          <div></div>
        </div>
      </Container>

      <Footer />
    </div>
  );
}
