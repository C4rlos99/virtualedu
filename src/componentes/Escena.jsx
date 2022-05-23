import React, { useEffect, useState } from "react";
import AnadirEscena from "./AnadirEscena";
import Respuesta from "./Respuesta";

export default function Escena(props) {
  const { respuestaId = null, escenarioId, escena = null } = props;
  const [escenaDatos, setEscenaDatos] = useState(null);

  useEffect(() => {
    setEscenaDatos(escena);
  }, [escena]);

  return escenaDatos ? (
    <>
      <div id="escena">
        <b>Escena {escenaDatos.id}</b>
      </div>
      <div id="escena-respuestas">
        {escenaDatos.respuestas.length !== 0 ? (
          <>
            {escenaDatos.respuestas.map((respuesta) => {
              return (
                <Respuesta
                  key={respuesta.id}
                  inicial={true}
                  respuesta={respuesta}
                  escenaId={escenaDatos.id}
                  escenaTipoId={escenaDatos.escena_tipo_id}
                  escenarioId={escenarioId}
                />
              );
            })}
            {escenaDatos.escena_tipo_id === 4 && (
              <Respuesta
                escenaId={escenaDatos.id}
                escenaTipoId={escenaDatos.escena_tipo_id}
                escenarioId={escenarioId}
              />
            )}
          </>
        ) : (
          <Respuesta
            escenaId={escenaDatos.id}
            escenaTipoId={escenaDatos.escena_tipo_id}
            escenarioId={escenarioId}
          />
        )}
      </div>
    </>
  ) : (
    <AnadirEscena
      escenarioId={escenarioId}
      respuestaId={respuestaId}
      setEscena={setEscenaDatos}
    />
  );
}
