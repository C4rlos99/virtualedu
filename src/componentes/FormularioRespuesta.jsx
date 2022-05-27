import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import swal from "sweetalert";
import TextAreaForm from "./TextAreaForm.jsx";
import { feedBackRespuesta } from "../constantes/feedBack.js";
import { crearRespuesta } from "../servicios/respuestaServicio.js";

export default function FormularioRespuesta(props) {
  const {
    show,
    onHide,
    setMostrarFormRespuesta,
    activo,
    handleAnadirRespuesta,
    escenaId,
  } = props;
  const [valores, setValores] = useState("");
  const [valoresFeedBack, setValoresFeedBack] = useState("");
  const [submitActivo, setSubmitActivo] = useState(true);

  const handleClose = () => setMostrarFormRespuesta(false);

  const handleChange = (valor, setEstadoCampo, setEstadoFeedBack, feedBack) => {
    if (valor) feedBack = "";

    setEstadoCampo(valor);
    setEstadoFeedBack(feedBack);
  };

  const mostrarAlerta = (texto, icono) => {
    swal({
      title: "Respuesta",
      text: texto,
      icon: icono,
      buttons: "aceptar",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (valores) {
      setSubmitActivo(false);

      crearRespuesta({
        escena_id: escenaId,
        valores: valores,
      }).then((resultado) => {
        switch (resultado.status) {
          case 200:
            mostrarAlerta(resultado.mensaje, "success");
            handleAnadirRespuesta(resultado.respuesta);
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
        handleClose();
        setValores("");
        setValoresFeedBack("");
      });
      setSubmitActivo(true);
    } else setValoresFeedBack(feedBackRespuesta.valores);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <div id="modal-form">
        <h4 id="modal-titulo" className="text-center">
          Escena
        </h4>
        <Form>
          <TextAreaForm
            activo={activo}
            controlId="valores"
            label="Palabras claves o frases que tendrá que contener la interacción oral (separar mediante coma)"
            placeHolder="Palabra1, Palabra2, frase1, frase2..."
            value={valores}
            feedBack={valoresFeedBack}
            name="valores"
            handleChange={(valores) =>
              handleChange(
                valores,
                setValores,
                setValoresFeedBack,
                feedBackRespuesta.valores
              )
            }
          />

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
