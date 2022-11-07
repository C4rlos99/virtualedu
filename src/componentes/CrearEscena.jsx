import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import swal from "sweetalert";
import InputForm from "./InputForm";
import { feedBackEscena } from "../constantes/feedBack.js";
import { crearEscena } from "../servicios/escenaServicio";

export default function CrearEscena(props) {
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
  const [titulo, setTitulo] = useState("");
  const [urlVideo, setUrlVideo] = useState("");
  const [urlVideoApoyo, setUrlVideoApoyo] = useState("");
  const [urlVideoRefuerzo, setUrlVideoRefuerzo] = useState("");
  const [tituloFeedBack, setTituloFeedBack] = useState("");
  const [urlVideoFeedBack, setUrlVideoFeedBack] = useState("");
  const [urlVideoApoyoFeedBack, setUrlVideoApoyoFeedBack] = useState("");
  const [urlVideoRefuerzoFeedBack, setUrlVideoRefuerzoFeedBack] = useState("");
  const [submitActivo, setSubmitActivo] = useState(true);

  const handleClose = () => {
    setMostrarFormEscena(false);
    setTitulo("");
    setUrlVideo("");
    setUrlVideoFeedBack("");
    setUrlVideoApoyo("");
    setUrlVideoApoyoFeedBack("");
    setUrlVideoRefuerzo("");
    setUrlVideoRefuerzoFeedBack("");
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

    if (
      titulo &&
      urlVideo &&
      ((escenaTipoId !== 2 && escenaTipoId !== 3) || urlVideoApoyo) &&
      (escenaTipoId !== 3 || urlVideoRefuerzo)
    ) {
      setSubmitActivo(false);

      let nuevaEscena = {
        escenario_id: escenarioId,
        escena_tipo_id: escenaTipoId,
        respuesta_id: respuestaId,
        titulo: titulo,
        url_video: urlVideo,
      };

      switch (escenaTipoId) {
        case 3:
          nuevaEscena.url_video_refuerzo = urlVideoRefuerzo;
        case 2:
          nuevaEscena.url_video_apoyo = urlVideoApoyo;
          break;
        default:
          break;
      }

      crearEscena(nuevaEscena).then((resultado) => {
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
    } else {
      if (!titulo) setTituloFeedBack(feedBackEscena.titulo);
      if (!urlVideo) setUrlVideoFeedBack(feedBackEscena.urlVideo);
      if (!urlVideoApoyo)
        setUrlVideoApoyoFeedBack(feedBackEscena.urlVideoApoyo);
      if (!urlVideoRefuerzo)
        setUrlVideoRefuerzoFeedBack(feedBackEscena.urlVideoRefuerzo);
    }
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
            controlId="titulo"
            label="Título de la escena"
            placeHolder="Título de la escena"
            value={titulo}
            feedBack={tituloFeedBack}
            type="text"
            name="titulo"
            handleChange={(titulo) =>
              handleChange(
                titulo,
                setTitulo,
                setTituloFeedBack,
                feedBackEscena.titulo
              )
            }
          />

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

          {(escenaTipoId === 2 || escenaTipoId === 3) && (
            <InputForm
              activo={activo}
              controlId="url-video-apoyo"
              label="Vídeo de apoyo de la escena"
              placeHolder="https://www.youtube.com/watch?v=..."
              value={urlVideoApoyo}
              feedBack={urlVideoApoyoFeedBack}
              type="text"
              name="url-video-apoyo"
              handleChange={(urlVideoApoyo) =>
                handleChange(
                  urlVideoApoyo,
                  setUrlVideoApoyo,
                  setUrlVideoApoyoFeedBack,
                  feedBackEscena.urlVideoApoyo
                )
              }
            />
          )}

          {escenaTipoId === 3 && (
            <InputForm
              activo={activo}
              controlId="url-video-refuerzo"
              label="Vídeo de refuerzo de la escena"
              placeHolder="https://www.youtube.com/watch?v=..."
              value={urlVideoRefuerzo}
              feedBack={urlVideoRefuerzoFeedBack}
              type="text"
              name="url-video-refuerzo"
              handleChange={(urlVideoRefuerzo) =>
                handleChange(
                  urlVideoRefuerzo,
                  setUrlVideoRefuerzo,
                  setUrlVideoRefuerzoFeedBack,
                  feedBackEscena.urlVideoRefuerzo
                )
              }
            />
          )}

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
