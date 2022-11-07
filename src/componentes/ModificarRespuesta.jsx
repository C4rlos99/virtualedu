import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { NodoEscenarioContext } from "../context/NodoEscenarioContext";
import { modificarRespuesta } from "../servicios/respuestaServicio";
import { feedBackRespuesta } from "../constantes/feedBack";
import InputForm from "./InputForm";
import { Button, Form } from "react-bootstrap";
import swal from "sweetalert";
import TextAreaForm from "./TextAreaForm";
import BotonEliminarRespuesta from "./BotonEliminarRespuesta";

export default function ModificarRespuesta(props) {
  const { respuesta, modificable = true } = props;
  const [id, setId] = useState("");
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
  const { nodo, setNodo } = useContext(NodoEscenarioContext);

  useEffect(() => {
    setId(respuesta.id);
    setNumeroCorrectas(respuesta.min_correctas);
    setPalabrasCorrectas(respuesta.palabras_correctas);
    setNumeroIncorrectas(respuesta.max_incorrectas);
    setPalabrasIncorrectas(respuesta.palabras_incorrectas);
    setNumeroCorrectasFeedBack("");
    setPalabrasCorrectasFeedBack("");
  }, [respuesta]);

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
      title: "Respuesta",
      text: texto,
      icon: icono,
      buttons: "aceptar",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (numeroCorrectas && palabrasCorrectas) {
      setSubmitActivo(false);

      let nuevosDatosRespuesta = {
        id: id,
        min_correctas: numeroCorrectas,
        palabras_correctas: palabrasCorrectas,
        max_incorrectas: numeroIncorrectas,
        palabras_incorrectas: palabrasIncorrectas,
      };

      modificarRespuesta(nuevosDatosRespuesta).then((resultado) => {
        switch (resultado.status) {
          case 200:
            mostrarAlerta(resultado.mensaje, "success");
            nodo.setRespuesta(resultado.respuesta);
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
      if (!numeroCorrectas)
        setNumeroCorrectasFeedBack(feedBackRespuesta.numeroCorrectas);
      if (!palabrasCorrectas)
        setPalabrasCorrectasFeedBack(feedBackRespuesta.palabrasCorrectas);
    }
  };

  return (
    <>
      <div id="datos-nodo-form">
        <div className="d-flex position-relative">
          <h4 id="modal-titulo" className="text-center">
            Respuesta
          </h4>
          {modificable && (
            <div className="position-absolute end-0">
              <BotonEliminarRespuesta
                respuestaId={nodo.id}
                handleEliminarRespuesta={nodo.handleEliminarRespuesta}
              />
            </div>
          )}
        </div>
        <Form>
          <InputForm
            activo={modificable}
            controlId="numero-correctas"
            label="Número mínimo de palabras claves que tendrá que tener la interacción oral"
            placeHolder=""
            value={numeroCorrectas.toString()}
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
            activo={modificable}
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
            activo={modificable}
            controlId="numero-incorrectas"
            label="Número máximo de palabras incorrectas que podrá tener la interacción oral"
            placeHolder=""
            value={numeroIncorrectas ? numeroIncorrectas.toString() : ""}
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
            activo={modificable}
            controlId="palabras-incorrectas"
            label="Palabras incorrectas que podrá tener la interacción oral (separar mediante coma)"
            placeHolder="Palabra1, Palabra2, Palabra3..."
            value={palabrasIncorrectas || ""}
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
