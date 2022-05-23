import React, { useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import InputForm from "../componentes/InputForm";
import { feedBackEscenario } from "../constantes/feedBack.js";
import { crearEscenario } from "../servicios/escenarioServicio.js";
import CheckForm from "../componentes/CheckForm";
import swal from "sweetalert";
import { Navigate } from "react-router-dom";

export default function FormularioEscenario(props) {
  const { show, onHide, setMostrarFormEscenario } = props;
  const [titulo, setTitulo] = useState("");
  const [tituloFeedBack, setTituloFeedBack] = useState("");
  const [visible, setVisible] = useState(false);
  const [submitActivo, setSubmitActivo] = useState(true);
  const [redireccion, setRedireccion] = useState(false);
  const [escenarioId, setEscenarioId] = useState(null);

  const handleClose = () => setMostrarFormEscenario(false);

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

  const mostrarAlerta = (texto, icono) => {
    swal({
      title: "Escenario",
      text: texto,
      icon: icono,
      buttons: "aceptar",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (titulo) {
      setSubmitActivo(false);

      crearEscenario({
        titulo: titulo,
        visible: visible,
      }).then((resultado) => {
        switch (resultado.status) {
          case 200:
            mostrarAlerta(resultado.mensaje, "success");
            setEscenarioId(resultado.escenario.id);
            setRedireccion(true);
            break;
          case 422:
            mostrarAlerta(resultado.mensaje, "error");
            break;
          default:
            break;
        }
        handleClose();
        setSubmitActivo(true);
      });
    } else setTituloFeedBack(feedBackEscenario.titulo);
  };

  return redireccion ? (
    <Navigate to={`/escenarios/modificar/${escenarioId}`} />
  ) : (
    <Modal show={show} onHide={onHide} centered>
      <div id="modal-form">
        <h4 id="modal-titulo" className="text-center">
          Nuevo Escenario
        </h4>
        <Form>
          <Row>
            <Col xs={10}>
              <InputForm
                controlId="modal-titulo-escenario"
                label="Titulo del escenario virtual"
                placeHolder="Título del escenario virtual"
                value={titulo}
                feedBack={tituloFeedBack}
                type="text"
                name="modal-titulo-escenario"
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
            <Col xs={2}>
              <CheckForm
                controlId="visible"
                label="Visible"
                checked={visible}
                name="visible"
                handleChange={(visible) => handleChangeVisible(visible)}
              />
            </Col>
          </Row>

          <div id="modal-footer">
            <Button
              id="modal-cancelar"
              variant="secondary"
              onClick={handleClose}
            >
              Cancelar
            </Button>

            <Button
              disabled={!submitActivo}
              id="modal-guardar"
              variant="primary"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Guardar
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
