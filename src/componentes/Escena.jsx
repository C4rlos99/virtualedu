import React, { useEffect, useState } from "react";
import AnadirEscena from "./AnadirEscena";
import BotonEliminarEscena from "./BotonEliminarEscena";
import Respuesta from "./Respuesta";
import AnadirRespuesta from "./AnadirRespuesta";

export default function Escena(props) {
  const { respuestaId = null, escenarioId, escena = null } = props;
  const [escenaDatos, setEscenaDatos] = useState(null);

  useEffect(() => {
    setEscenaDatos(escena);
  }, [escena]);

  const handleAnadirRespuesta = (respuesta) => {
    let respuestas = [...escenaDatos.respuestas];
    respuestas.push(respuesta);

    setEscenaDatos({ ...escenaDatos, respuestas });
  };

  const handleEliminarRespuesta = (id) => {
    let respuestas = [...escenaDatos.respuestas];
    let i = respuestas.findIndex((respuesta) => respuesta.id === id);

    if (i > -1) respuestas.splice(i, 1);
    setEscenaDatos({ ...escenaDatos, respuestas });
  };

  return escenaDatos ? (
    <>
      <div
        id="escena"
        className={
          escenaDatos.escena_tipo_id === 4 ? "escena-4" : "escena-1-2-3"
        }
      >
        <b>Escena {escenaDatos.id}</b>

        <BotonEliminarEscena
          setEscena={setEscenaDatos}
          escenaId={escenaDatos.id}
        />
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
                    respuesta={respuesta}
                    handleEliminarRespuesta={handleEliminarRespuesta}
                    escenarioId={escenarioId}
                  />
                );
              })}
              {escenaDatos.escena_tipo_id === 4 && (
                <AnadirRespuesta
                  escenaId={escenaDatos.id}
                  handleAnadirRespuesta={handleAnadirRespuesta}
                />
              )}
            </>
          ) : (
            <AnadirRespuesta
              escenaId={escenaDatos.id}
              handleAnadirRespuesta={handleAnadirRespuesta}
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
