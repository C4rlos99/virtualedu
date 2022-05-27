import React, { useState } from "react";
import { Button } from "react-bootstrap";
import FormularioRespuesta from "./FormularioRespuesta";

export default function AnadirRespuesta(props) {
  const { escenaId, setRespuesta, handleAnadirRespuesta } = props;
  const [mostrarFormRespuesta, setMostrarFormRespuesta] = useState(false);

  return (
    <div id="anadir-respuesta-contenedor">
      <Button
        id="anadir-respuesta-btn"
        onClick={() => setMostrarFormRespuesta(true)}
      >
        Añadir respuesta
      </Button>

      <FormularioRespuesta
        show={mostrarFormRespuesta}
        onHide={() => setMostrarFormRespuesta(false)}
        setMostrarFormRespuesta={setMostrarFormRespuesta}
        handleAnadirRespuesta={handleAnadirRespuesta}
        setRespuesta={setRespuesta}
        escenaId={escenaId}
      />
    </div>
  );
}
