import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import swal from "sweetalert";
import InputForm from "../componentes/InputForm";
import { feedBackEscena } from "../constantes/feedBack.js";
import { crearEscena } from "../servicios/escenaServicio.js";

export default function FormularioEscenaBasico(props) {
  const {
    show,
    onHide,
    setMostrarFormEscena,
    activo,
    setEscena,
    escenaTipoId,
    respuestaId,
    escenarioId,
  } = props;
  const [urlVideo, setUrlVideo] = useState("");
  const [urlVideoFeedBack, setUrlVideoFeedBack] = useState("");
  const [submitActivo, setSubmitActivo] = useState(true);

  const handleClose = () => {
    setMostrarFormEscena(false);
    setUrlVideo("");
    setUrlVideoFeedBack("");
  };

  const handleChange = (valor, setEstadoCampo, setEstadoFeedBack, feedBack) => {
    if (valor) feedBack = "";

    setEstadoCampo(valor);
    setEstadoFeedBack(feedBack);
  };

  const mostrarAlerta = (texto, icono) => {
    swal({
      title: "Escena",
      text: texto,
      icon: icono,
      buttons: "aceptar",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (urlVideo) {
      setSubmitActivo(false);

      crearEscena({
        escenario_id: escenarioId,
        escena_tipo_id: escenaTipoId,
        respuesta_id: respuestaId,
        url_video: urlVideo,
      }).then((resultado) => {
        switch (resultado.status) {
          case 200:
            mostrarAlerta(resultado.mensaje, "success");
            setEscena(resultado.escena);
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
      });
      setSubmitActivo(true);
    } else setUrlVideoFeedBack(feedBackEscena.urlVideo);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <div id="modal-form">
        <h4 id="modal-titulo" className="text-center">
          Escena
        </h4>
        <Form>
          <InputForm
            activo={activo}
            controlId="url-video"
            label="Vídeo de la escena"
            placeHolder="https://www.youtube.com/watch?v=..."
            value={urlVideo}
            feedBack={urlVideoFeedBack}
            type="text"
            name="url-video"
            handleChange={(urlVideo) =>
              handleChange(
                urlVideo,
                setUrlVideo,
                setUrlVideoFeedBack,
                feedBackEscena.urlVideo
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
