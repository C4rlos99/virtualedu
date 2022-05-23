import React, { useEffect, useState } from "react";
import AnadirRespuesta from "./AnadirRespuesta";
import Escena from "./Escena";

export default function Respuesta(props) {
  const {
    escenaId,
    escenaTipoId,
    escenarioId,
    respuesta = null,
    inicial,
  } = props;
  const [respuestaDatos, setRespuestaDatos] = useState(null);

  useEffect(() => {
    setRespuestaDatos(respuesta);
  }, [respuesta]);

  return respuestaDatos ? (
    <>
      <div id="respuesta">
        <b>Respuesta </b>
        {respuestaDatos.valores}
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
      {escenaTipoId === 4 && !inicial && (
        <Respuesta
          escenaId={escenaId}
          escenaTipoId={escenaTipoId}
          escenarioId={escenarioId}
        />
      )}
    </>
  ) : (
    <AnadirRespuesta escenaId={escenaId} setRespuesta={setRespuestaDatos} />
  );
}
