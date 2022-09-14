import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { NodoEscenarioContext } from "../context/NodoEscenarioContext";
import ModificarEscena from "./ModificarEscena";
import ModificarRespuesta from "./ModificarRespuesta";

export default function DatosNodo(props) {
  const { nodo, setNodo } = useContext(NodoEscenarioContext);

  return (
    nodo &&
    (window.innerWidth >= 768 ? (
      <div id="datos-nodo">
        {nodo.tipo === "escena" ? (
          <ModificarEscena escena={nodo} />
        ) : (
          nodo.tipo === "respuesta" && <ModificarRespuesta respuesta={nodo} />
        )}
      </div>
    ) : (
      <Modal show={nodo != null} onHide={() => setNodo(null)} centered>
        <div id="modal-form">
          {nodo.tipo === "escena" ? (
            <ModificarEscena escena={nodo} />
          ) : (
            nodo.tipo === "respuesta" && <ModificarRespuesta respuesta={nodo} />
          )}
        </div>
      </Modal>
    ))
  );
}
