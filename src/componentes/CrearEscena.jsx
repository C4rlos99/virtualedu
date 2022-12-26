import React, { useState } from "react";
import { Modal, Button, Form, FormSelect } from "react-bootstrap";
import swal from "sweetalert";
import InputForm from "./InputForm";
import { feedBackEscena } from "../constantes/feedBack.js";
import { crearEscena } from "../servicios/escenaServicio";
import { VideosEscenarioContext } from "../context/VideosEscenarioContext";
import { useContext } from "react";

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
  const [video, setVideo] = useState("0");
  const [videoApoyo, setVideoApoyo] = useState("0");
  const [videoRefuerzo, setVideoRefuerzo] = useState("0");
  const [tituloFeedBack, setTituloFeedBack] = useState("");
  const [videoFeedBack, setVideoFeedBack] = useState("");
  const [videoApoyoFeedBack, setVideoApoyoFeedBack] = useState("");
  const [videoRefuerzoFeedBack, setVideoRefuerzoFeedBack] = useState("");
  const [submitActivo, setSubmitActivo] = useState(true);
  const { videosEscenario } = useContext(VideosEscenarioContext);

  const handleClose = () => {
    setMostrarFormEscena(false);
    setTitulo("");
    setTituloFeedBack("");
    setVideo("0");
    setVideoFeedBack("");
    setVideoApoyo("0");
    setVideoApoyoFeedBack("");
    setVideoRefuerzo("0");
    setVideoRefuerzoFeedBack("");
  };

  const handleChange = (valor, setEstadoCampo, setEstadoFeedBack, feedBack) => {
    if (valor) feedBack = "";

    setEstadoCampo(valor);
    setEstadoFeedBack(feedBack);
  };

  const handleChangeVideo = (
    e,
    setEstadoCampo,
    setEstadoFeedBack,
    feedBack
  ) => {
    setEstadoCampo(e.target.value);
    e.target.value !== "0"
      ? setEstadoFeedBack("")
      : setEstadoFeedBack(feedBack);
  };

  const mostrarAlerta = (texto, icono) => {
    swal({
      text: texto,
      icon: icono,
      buttons: "aceptar",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      titulo &&
      video != 0 &&
      ((escenaTipoId !== 2 && escenaTipoId !== 3) || videoApoyo != 0) &&
      (escenaTipoId !== 3 || videoRefuerzo != 0)
    ) {
      setSubmitActivo(false);

      let nuevaEscena = {
        escenario_id: escenarioId,
        escena_tipo_id: escenaTipoId,
        respuesta_id: respuestaId,
        titulo: titulo,
        video_id: video,
      };

      switch (escenaTipoId) {
        case 3:
          nuevaEscena.video_refuerzo_id = videoRefuerzo;
        case 2:
          nuevaEscena.video_apoyo_id = videoApoyo;
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
        setSubmitActivo(true);
      });
    } else {
      if (!titulo) setTituloFeedBack(feedBackEscena.titulo);
      if (video == 0) setVideoFeedBack(feedBackEscena.video);
      if (videoApoyo == 0) setVideoApoyoFeedBack(feedBackEscena.videoApoyo);
      if (videoRefuerzo == 0)
        setVideoRefuerzoFeedBack(feedBackEscena.videoRefuerzo);
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

          <Form.Group>
            <Form.Label>Selecciona el video 360</Form.Label>
            <FormSelect
              id="video"
              value={video}
              disabled={activo}
              onChange={(video) =>
                handleChangeVideo(
                  video,
                  setVideo,
                  setVideoFeedBack,
                  feedBackEscena.video
                )
              }
            >
              <option className="text-center" value="0">
                -- Seleccione el video 360 --
              </option>
              {videosEscenario.map((video) => (
                <option key={video.id} value={video.id}>
                  {video.nombre}
                </option>
              ))}
            </FormSelect>
            <p className="error-msg">{videoFeedBack}</p>
          </Form.Group>

          {(escenaTipoId === 2 || escenaTipoId === 3) && (
            <Form.Group>
              <Form.Label>Selecciona el video 360 de apoyo</Form.Label>
              <FormSelect
                id="video-apoyo"
                value={videoApoyo}
                disabled={activo}
                onChange={(videoApoyo) =>
                  handleChangeVideo(
                    videoApoyo,
                    setVideoApoyo,
                    setVideoApoyoFeedBack,
                    feedBackEscena.videoApoyo
                  )
                }
              >
                <option className="text-center" value="0">
                  -- Seleccione el video 360 de apoyo --
                </option>
                {videosEscenario.map((video) => (
                  <option key={video.id} value={video.id}>
                    {video.nombre}
                  </option>
                ))}
              </FormSelect>
              <p className="error-msg">{videoApoyoFeedBack}</p>
            </Form.Group>
          )}

          {escenaTipoId === 3 && (
            <Form.Group>
              <Form.Label>Selecciona el video 360 de refuerzo</Form.Label>
              <FormSelect
                id="video-refuerzo"
                value={videoRefuerzo}
                disabled={activo}
                onChange={(videoRefuerzo) =>
                  handleChangeVideo(
                    videoRefuerzo,
                    setVideoRefuerzo,
                    setVideoRefuerzoFeedBack,
                    feedBackEscena.videoRefuerzo
                  )
                }
              >
                <option className="text-center" value="0">
                  -- Seleccione el video 360 de refuerzo --
                </option>
                {videosEscenario.map((video) => (
                  <option key={video.id} value={video.id}>
                    {video.nombre}
                  </option>
                ))}
              </FormSelect>
              <p className="error-msg">{videoRefuerzoFeedBack}</p>
            </Form.Group>
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
