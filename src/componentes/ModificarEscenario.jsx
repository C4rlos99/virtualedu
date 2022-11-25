import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, FormSelect } from "react-bootstrap";
import swal from "sweetalert";
import { feedBackEscenario } from "../constantes/feedBack";
import InputForm from "../componentes/InputForm";
import CheckForm from "../componentes/CheckForm";
import {
  modificarEscenario,
  obtenerEscenario,
} from "../servicios/escenarioServicio";
import { Navigate } from "react-router-dom";

export default function ModificarEscenario(props) {
  const [estadoInicial, setEstadoIncicial] = useState({});
  const { id, modificable = true } = props;
  const [redireccion, setRedireccion] = useState(false);
  const [path, setPath] = useState("");
  const [titulo, setTitulo] = useState("");
  const [visible, setVisible] = useState(false);
  const [lenguaje, setLenguaje] = useState("0");
  const [tituloFeedBack, setTituloFeedBack] = useState("");
  const [lenguajeFeedBack, setLenguajeFeedBack] = useState("");
  const [submitActivo, setSubmitActivo] = useState(true);

  useEffect(() => {
    obtenerEscenario(id).then((resultado) => {
      switch (resultado.status) {
        case 200:
          setTitulo(resultado.escenario.titulo);
          setVisible(resultado.escenario.visible);
          setLenguaje(resultado.escenario.lenguaje_id);

          setEstadoIncicial({
            titulo: resultado.escenario.titulo,
            visible: resultado.escenario.visible,
            lenguaje: resultado.escenario.lenguaje_id,
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
            setEstadoIncicial({
              titulo: titulo,
              visible: visible,
              lenguaje: lenguaje,
            });
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
    <div id="datos-escenario">
      <Form>
        <Row>
          <Col sm={12} md={7}>
            <InputForm
              controlId="titulo-escenario-configuracion"
              label="Titulo del escenario virtual"
              placeHolder="Título del escenario virtual"
              value={titulo}
              feedBack={tituloFeedBack}
              type="text"
              name="titulo-escenario"
              activo={modificable}
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
                disabled={!modificable}
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
                {localStorage.getItem("lenguajes") &&
                  JSON.parse(localStorage.getItem("lenguajes")).map(
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
              activo={modificable}
              controlId="visible"
              label="Visible"
              checked={visible}
              name="visible"
              handleChange={(visible) => handleChangeVisible(visible)}
            />
          </Col>
        </Row>
        {modificable && (
          <div className="d-flex justify-content-center">
            <Button
              disabled={
                !submitActivo ||
                JSON.stringify({
                  titulo,
                  visible,
                  lenguaje,
                }) === JSON.stringify(estadoInicial)
              }
              id="guardar-escenario"
              variant="primary"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Guardar
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
}
