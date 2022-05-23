import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import InputForm from "../componentes/InputForm";
import { feedBackEscena } from "../constantes/feedBack.js";

export default function FormularioEscena3(props) {
  const {
    show,
    onHide,
    setMostrarFormEscena,
    activo,
    EscenaTipoId,
    respuestaId,
    EscenarioId,
  } = props;
  const [video, setVideo] = useState("");
  const [videoApoyo, setVideoApoyo] = useState("");
  const [videoRefuerzo, setVideoRefuerzo] = useState("");
  const [videoFeedBack, setVideoFeedBack] = useState("");
  const [videoApoyoFeedBack, setVideoApoyoFeedBack] = useState("");
  const [videoRefuerzoFeedBack, setVideoRefuerzoFeedBack] = useState("");

  const handleClose = () => setMostrarFormEscena(false);

  const handleChange = (valor, setEstadoCampo, setEstadoFeedBack, feedBack) => {
    if (valor) feedBack = "";

    setEstadoCampo(valor);
    setEstadoFeedBack(feedBack);
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
            controlId="video"
            label="Vídeo de la escena"
            placeholder="https://www.youtube.com/watch?v=..."
            value={video}
            feedBack={videoFeedBack}
            type="text"
            name="video"
            handleChange={(video) =>
              handleChange(
                video,
                setVideo,
                setVideoFeedBack,
                feedBackEscena.video
              )
            }
          />
          <InputForm
            activo={activo}
            controlId="video-apoyo"
            label="Vídeo de apoyo de la escena"
            placeholder="https://www.youtube.com/watch?v=..."
            value={videoApoyo}
            feedBack={videoApoyoFeedBack}
            type="text"
            name="video-apoyo"
            handleChange={(videoApoyo) =>
              handleChange(
                videoApoyo,
                setVideoApoyo,
                setVideoApoyoFeedBack,
                feedBackEscena.videoApoyo
              )
            }
          />
          <InputForm
            activo={activo}
            controlId="video-refuerzo"
            label="Vídeo de refuerzo de la escena"
            placeholder="https://www.youtube.com/watch?v=..."
            value={videoRefuerzo}
            feedBack={videoRefuerzoFeedBack}
            type="text"
            name="video-refuerzo"
            handleChange={(videoRefuerzo) =>
              handleChange(
                videoRefuerzo,
                setVideoRefuerzo,
                setVideoRefuerzoFeedBack,
                feedBackEscena.videoRefuerzo
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
              id="modal-aceptar"
              variant="primary"
              type="submit"
              onClick={handleClose}
            >
              Guardar
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
