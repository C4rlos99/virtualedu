import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import swal from "sweetalert";
import TextAreaForm from "./TextAreaForm.jsx";
import InputForm from "./InputForm.jsx";
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
  const [palabrasCorrectas, setPalabrasCorrectas] = useState("");
  const [numeroCorrectas, setNumeroCorrectas] = useState("");
  const [palabrasIncorrectas, setPalabrasIncorrectas] = useState("");
  const [numeroIncorrectas, setNumeroIncorrectas] = useState("");
  const [numeroCorrectasFeedBack, setNumeroCorrectasFeedBack] = useState("");
  const [numeroIncorrectasFeedBack, setNumeroIncorrectasFeedBack] =
    useState("");
  const [palabrasCorrectasFeedBack, setPalabrasCorrectasFeedBack] =
    useState("");
  const [palabrasIncorrectasFeedBack, setPalabrasIncorrectasFeedBack] =
    useState("");

  const [submitActivo, setSubmitActivo] = useState(true);

  const handleClose = () => {
    setMostrarFormRespuesta(false);
    setNumeroCorrectas("");
    setNumeroCorrectasFeedBack("");
    setPalabrasCorrectas("");
    setPalabrasCorrectasFeedBack("");
    setNumeroIncorrectas("");
    setNumeroIncorrectasFeedBack("");
    setPalabrasIncorrectas("");
    setPalabrasIncorrectasFeedBack("");
  };

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

    if (palabrasCorrectas && numeroCorrectas) {
      setSubmitActivo(false);

      crearRespuesta({
        escena_id: escenaId,
        palabras_correctas: palabrasCorrectas,
        min_correctas: numeroCorrectas,
        palabras_incorrectas: palabrasIncorrectas,
        max_incorrectas: numeroIncorrectas,
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
      });
      setSubmitActivo(true);
    } else {
      if (!numeroCorrectas)
        setNumeroCorrectasFeedBack(feedBackRespuesta.numeroCorrectas);

      if (!palabrasCorrectas)
        setPalabrasCorrectasFeedBack(feedBackRespuesta.palabrasCorrectas);
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
            controlId="numero-correctas"
            label="Número mínimo de palabras claves que tendrá que tener la interacció oral"
            placeHolder=""
            value={numeroCorrectas}
            feedBack={numeroCorrectasFeedBack}
            type="number"
            name="numero-correctas"
            handleChange={(numeroCorrectas) =>
              handleChange(
                numeroCorrectas,
                setNumeroCorrectas,
                setNumeroCorrectasFeedBack,
                feedBackRespuesta.numeroCorrectas
              )
            }
          />

          <TextAreaForm
            activo={activo}
            controlId="palabras-correctas"
            label="Palabras clave que tendrá que tener la interacción oral (separar mediante coma)"
            placeHolder="Palabra1, Palabra2, Palabra3..."
            value={palabrasCorrectas}
            feedBack={palabrasCorrectasFeedBack}
            name="palabras-correctas"
            handleChange={(palabrasCorrectas) =>
              handleChange(
                palabrasCorrectas,
                setPalabrasCorrectas,
                setPalabrasCorrectasFeedBack,
                feedBackRespuesta.palabrasCorrectas
              )
            }
          />

          <InputForm
            activo={activo}
            controlId="numero-incorrectas"
            label="Número máximo de palabras incorrectas que podrá tener la interacció oral"
            placeHolder=""
            value={numeroIncorrectas}
            feedBack={numeroIncorrectasFeedBack}
            type="number"
            name="numero-incorrectas"
            handleChange={(numeroIncorrectas) =>
              handleChange(
                numeroIncorrectas,
                setNumeroIncorrectas,
                setNumeroIncorrectasFeedBack,
                ""
              )
            }
          />

          <TextAreaForm
            activo={activo}
            controlId="palabras-incorrectas"
            label="Palabras incorrectas que podrá tener la interacción oral (separar mediante coma)"
            placeHolder="Palabra1, Palabra2, Palabra3..."
            value={palabrasIncorrectas}
            feedBack={palabrasIncorrectasFeedBack}
            name="palabras-incorrectas"
            handleChange={(palabrasIncorrectas) =>
              handleChange(
                palabrasIncorrectas,
                setPalabrasIncorrectas,
                setPalabrasIncorrectasFeedBack,
                ""
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
