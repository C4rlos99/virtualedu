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
      <div
        id="escena"
        className={
          escenaDatos.escena_tipo_id === 4 ? "escena-4" : "escena-1-2-3"
        }
      >
        <b>Escena {escenaDatos.id}</b>
      </div>

      <div id="escena-respuestas" className="d-flex">
        <div
          id="escena-respuestas-espacio"
          className={
            escenaDatos.escena_tipo_id === 4
              ? "escena-respuestas-espacio-borde"
              : ""
          }
        ></div>

        <div
          className={
            escenaDatos.escena_tipo_id === 4
              ? "w-100 escena-respuestas-4"
              : "w-100"
          }
        >
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
