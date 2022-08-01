import React, { useContext } from "react";
import { NodoEscenarioContext } from "../context/NodoEscenarioContext";
import ModificarEscena from "./ModificarEscena";
import ModificarRespuesta from "./ModificarRespuesta";

export default function DatosNodo() {
  const { nodo } = useContext(NodoEscenarioContext);
  return (
    nodo && (
      <div id="datos-nodo">
        {nodo.tipo === "escena" ? (
          <ModificarEscena escena={nodo} />
        ) : (
          nodo.tipo === "respuesta" && <ModificarRespuesta respuesta={nodo} />
        )}
      </div>
    )
  );
}
