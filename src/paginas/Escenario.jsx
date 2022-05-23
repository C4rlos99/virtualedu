import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Header from "../componentes/Header";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
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
  const [tituloFeedBack, setTituloFeedBack] = useState("");
  const [visible, setVisible] = useState(false);
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

  const handleChangeTitulo = (
    valor,
    setEstadoCampo,
    setEstadoFeedBack,
    feedBack
  ) => {
    if (valor) feedBack = "";

    setEstadoCampo(valor);
    setEstadoFeedBack(feedBack);
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
              <Col xs={11}>
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
              <Col xs={1}>
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

        <Escena escena={escenaRaiz} escenarioId={id} />
      </Container>

      <Footer />
    </div>
  );
}
