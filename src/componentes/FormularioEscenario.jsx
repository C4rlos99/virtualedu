import React, { useState } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import InputForm from "../componentes/InputForm";
import { feedBackEscenario } from "../constantes/feedBack.js";
import CheckForm from "../componentes/CheckForm";

export default function FormularioEscenario(props) {
  const { show, onHide, setMostrarFormEscenario } = props;
  const [titulo, setTitulo] = useState("");
  const [tituloFeedBack, setTituloFeedBack] = useState("");
  const [visible, setVisible] = useState(false);

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

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Nuevo Escenario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={9}>
            <InputForm
              controlId={"titulo"}
              label={"Titulo"}
              placeholder={"Titulo del escenario virtual"}
              value={titulo}
              feedBack={tituloFeedBack}
              type={"text"}
              name={"titulo"}
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
          <Col xs={3}>
            <CheckForm
              controlId={"visible"}
              label={"Visible"}
              checked={visible}
              name={"visible"}
              handleChange={(visible) => handleChangeVisible(visible)}
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
