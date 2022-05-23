import React, { useState } from "react";
import AnadirEscena from "./AnadirEscena";
import Respuesta from "./Respuesta";

// const escenaSwitch = ()

export default function Escena(props) {
  const { respuestaId = null, escenarioId } = props;
  const [escenaDatos, setEscenaDatos] = useState(props.escena);

  return escenaDatos ? (
    <>
      <div id="escena">{escenaDatos.id}</div>
      <div id="respuestas">
        {escenaDatos.respuestas ? (
          escenaDatos.respuestas.map((respuesta) => {
            <Respuesta respuesta={respuesta} />;
          })
        ) : (
          <Respuesta escenaId={escenaDatos.id} />
        )}
        {escenaDatos.tipo === 4 && <Respuesta escenaId={escenaDatos.id} />}
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
