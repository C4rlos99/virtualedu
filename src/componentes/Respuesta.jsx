import React, { useContext, useEffect, useState } from "react";
import BotonEliminarRespuesta from "./BotonEliminarRespuesta";
import { NodoEscenarioContext } from "../context/NodoEscenarioContext";
import Escena from "./Escena";

export default function Respuesta(props) {
  const { escenarioId, respuesta = null, handleEliminarRespuesta } = props;
  const [respuestaDatos, setRespuestaDatos] = useState(null);
  const { nodo, setNodo } = useContext(NodoEscenarioContext);

  useEffect(() => {
    setRespuestaDatos(respuesta);
  }, [respuesta]);

  return (
    respuestaDatos && (
      <>
        <div id="respuesta">
          <b>Respuesta </b>
          {respuestaDatos.valores}

          <BotonEliminarRespuesta
            respuestaId={respuestaDatos.id}
            handleEliminarRespuesta={handleEliminarRespuesta}
          />
        </div>
        <div id="respuesta-escena">
          {respuestaDatos.escena ? (
            <Escena
              escena={respuestaDatos.escena}
              escenarioId={escenarioId}
              respuestaId={respuestaDatos.id}
            />
          ) : (
            <Escena escenarioId={escenarioId} respuestaId={respuestaDatos.id} />
          )}
        </div>
      </>
    )
  );
}
