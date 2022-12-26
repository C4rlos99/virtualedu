import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { NodoEscenarioContext } from "../context/NodoEscenarioContext";
import { VideosEscenarioContext } from "../context/VideosEscenarioContext";
import { modificarEscena } from "../servicios/escenaServicio";
import { feedBackEscena } from "../constantes/feedBack";
import InputForm from "./InputForm";
import { Button, Form, FormSelect } from "react-bootstrap";
import swal from "sweetalert";
import BotonEliminarEscena from "./BotonEliminarEscena";

export default function ModificarEscena(props) {
  const { escena, modificable = true } = props;
  const [estadoInicial, setEstadoIncicial] = useState({});
  const [id, setId] = useState("");
  const [escenaTipoId, setEscenaTipoId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [video, setVideo] = useState("0");
  const [videoApoyo, setVideoApoyo] = useState("0");
  const [videoRefuerzo, setVideoRefuerzo] = useState("0");
  const [tituloFeedBack, setTituloFeedBack] = useState("");
  const [videoFeedBack, setVideoFeedBack] = useState("");
  const [videoApoyoFeedBack, setVideoApoyoFeedBack] = useState("");
  const [videoRefuerzoFeedBack, setVideoRefuerzoFeedBack] = useState("");
  const [submitActivo, setSubmitActivo] = useState(true);
  const { nodo, setNodo } = useContext(NodoEscenarioContext);
  const { videosEscenario } = useContext(VideosEscenarioContext);

  useEffect(() => {
    setId(escena.id);
    setTitulo(escena.titulo);
    setVideo(escena.video_id);
    setEscenaTipoId(escena.escena_tipo_id);
    setVideoFeedBack("");

    switch (escena.escena_tipo_id) {
      case 3:
        setVideoRefuerzo(escena.video_refuerzo_id);
        setVideoRefuerzoFeedBack("");
      case 2:
        setVideoApoyo(escena.video_apoyo_id);
        setVideoApoyoFeedBack("");
        break;
      default:
        break;
    }

    setEstadoIncicial({
      titulo: escena.titulo,
      video: escena.video_id,
      videoApoyo: escena.video_apoyo_id,
      videoRefuerzo: escena.video_refuerzo_id,
    });
  }, [escena]);

  const handleClose = () => {
    setNodo(null);
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

      let nuevosDatosEscena = {
        id: id,
        titulo: titulo,
        escena_tipo_id: escenaTipoId,
        video_id: video,
      };

      switch (escenaTipoId) {
        case 3:
          nuevosDatosEscena.video_refuerzo_id = videoRefuerzo;
        case 2:
          nuevosDatosEscena.video_apoyo_id = videoApoyo;
          break;
        default:
          break;
      }

      modificarEscena(nuevosDatosEscena).then((resultado) => {
        switch (resultado.status) {
          case 200:
            mostrarAlerta(resultado.mensaje, "success");
            nodo.setEscena(resultado.escena);
            setEstadoIncicial({
              titulo: titulo,
              video: video,
              videoApoyo: videoApoyo,
              videoRefuerzo: videoRefuerzo,
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
    } else {
      if (!titulo) setTituloFeedBack(feedBackEscena.titulo);
      if (video == 0) setVideoFeedBack(feedBackEscena.video);
      if (videoApoyo == 0) setVideoApoyoFeedBack(feedBackEscena.videoApoyo);
      if (videoRefuerzo == 0)
        setVideoRefuerzoFeedBack(feedBackEscena.videoRefuerzo);
    }
  };

  return (
    <>
      <div id="datos-nodo-form">
        <div className="d-flex position-relative">
          <h4 id="modal-titulo" className="text-center">
            Escena
          </h4>
          {modificable && (
            <div className="position-absolute end-0">
              <BotonEliminarEscena
                setEscena={nodo.setEscena}
                escenaId={nodo.id}
              />
            </div>
          )}
        </div>

        <Form>
          <InputForm
            activo={modificable}
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
              disabled={!modificable}
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
                disabled={!modificable}
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
                disabled={!modificable}
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
              Cerrar
            </Button>

            {modificable && (
              <Button
                disabled={
                  !submitActivo ||
                  JSON.stringify({
                    titulo,
                    video,
                    videoApoyo: videoApoyo ? videoApoyo : null,
                    videoRefuerzo: videoRefuerzo ? videoRefuerzo : null,
                  }) ===
                    JSON.stringify({
                      ...estadoInicial,
                      videoApoyo: estadoInicial.videoApoyo
                        ? estadoInicial.videoApoyo
                        : "0",
                      videoRefuerzo: estadoInicial.videoRefuerzo
                        ? estadoInicial.videoRefuerzo
                        : "0",
                    })
                }
                id="modal-guardar"
                variant="primary"
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                Guardar
              </Button>
            )}
          </div>
        </Form>
      </div>
    </>
  );
}
