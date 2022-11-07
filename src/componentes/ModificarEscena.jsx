import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { NodoEscenarioContext } from "../context/NodoEscenarioContext";
import { modificarEscena } from "../servicios/escenaServicio";
import { feedBackEscena } from "../constantes/feedBack";
import InputForm from "./InputForm";
import { Button, Form } from "react-bootstrap";
import swal from "sweetalert";
import BotonEliminarEscena from "./BotonEliminarEscena";

export default function ModificarEscena(props) {
  const { escena, modificable = true } = props;
  const [id, setId] = useState("");
  const [escenaTipoId, setEscenaTipoId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [urlVideo, setUrlVideo] = useState("");
  const [urlVideoApoyo, setUrlVideoApoyo] = useState("");
  const [urlVideoRefuerzo, setUrlVideoRefuerzo] = useState("");
  const [tituloFeedBack, setTituloFeedBack] = useState("");
  const [urlVideoFeedBack, setUrlVideoFeedBack] = useState("");
  const [urlVideoApoyoFeedBack, setUrlVideoApoyoFeedBack] = useState("");
  const [urlVideoRefuerzoFeedBack, setUrlVideoRefuerzoFeedBack] = useState("");
  const [submitActivo, setSubmitActivo] = useState(true);
  const { nodo, setNodo } = useContext(NodoEscenarioContext);

  useEffect(() => {
    setId(escena.id);
    setTitulo(escena.titulo);
    setUrlVideo(escena.url_video);
    setEscenaTipoId(escena.escena_tipo_id);
    setUrlVideoFeedBack("");

    switch (escena.escena_tipo_id) {
      case 3:
        setUrlVideoRefuerzo(escena.url_video_refuerzo);
        setUrlVideoRefuerzoFeedBack("");
      case 2:
        setUrlVideoApoyo(escena.url_video_apoyo);
        setUrlVideoApoyoFeedBack("");
        break;
      default:
        break;
    }
  }, [escena]);

  const handleClose = () => {
    setNodo(null);
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

      let nuevosDatosEscena = {
        id: id,
        titulo: titulo,
        escena_tipo_id: escenaTipoId,
        url_video: urlVideo,
      };

      switch (escenaTipoId) {
        case 3:
          nuevosDatosEscena.url_video_refuerzo = urlVideoRefuerzo;
        case 2:
          nuevosDatosEscena.url_video_apoyo = urlVideoApoyo;
          break;
        default:
          break;
      }

      modificarEscena(nuevosDatosEscena).then((resultado) => {
        switch (resultado.status) {
          case 200:
            mostrarAlerta(resultado.mensaje, "success");
            nodo.setEscena(resultado.escena);
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

          <InputForm
            activo={modificable}
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
              activo={modificable}
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
              activo={modificable}
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
              Cerrar
            </Button>

            {modificable && (
              <Button
                disabled={!submitActivo}
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
