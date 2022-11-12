import React, { useState } from "react";
import { Modal, Button, Row, Col, Form, FormSelect } from "react-bootstrap";
import InputForm from "./InputForm";
import { feedBackEscenario } from "../constantes/feedBack.js";
import { crearEscenario } from "../servicios/escenarioServicio.js";
import CheckForm from "./CheckForm";
import swal from "sweetalert";
import { Navigate } from "react-router-dom";

export default function FormularioEscenario(props) {
  const { show, onHide, setMostrarFormEscenario } = props;
  const [titulo, setTitulo] = useState("");
  const [visible, setVisible] = useState(false);
  const [lenguaje, setLenguaje] = useState("0");
  const [tituloFeedBack, setTituloFeedBack] = useState("");
  const [lenguajeFeedBack, setLenguajeFeedBack] = useState("");
  const [submitActivo, setSubmitActivo] = useState(true);
  const [redireccion, setRedireccion] = useState(false);
  const [escenarioId, setEscenarioId] = useState(null);

  const handleClose = () => {
    setMostrarFormEscenario(false);
    setLenguaje("0");
    setLenguajeFeedBack("");
    setTitulo("");
    setTituloFeedBack("");
    setVisible(false);
  };

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

    if (titulo && lenguaje != 0) {
      setSubmitActivo(false);

      crearEscenario({
        titulo: titulo,
        lenguaje_id: lenguaje,
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
      });
      setSubmitActivo(true);
    } else {
      if (!titulo) setTituloFeedBack(feedBackEscenario.titulo);

      if (lenguaje === "0") setLenguajeFeedBack(feedBackEscenario.lenguaje);
    }
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
            <Col sm={12}>
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
            <Col sm={7}>
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
            <Col sm={3}>
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
