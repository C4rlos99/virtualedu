import React, { useContext, useEffect, useState } from "react";
import { NodoEscenarioContext } from "../context/NodoEscenarioContext";
import Escena from "./Escena";

export default function Respuesta(props) {
  const {
    escenarioId,
    respuesta = null,
    handleEliminarRespuesta,
    modificable = true,
  } = props;
  const [respuestaDatos, setRespuestaDatos] = useState(null);
  const { nodo, setNodo } = useContext(NodoEscenarioContext);

  useEffect(() => {
    setRespuestaDatos(respuesta);
  }, [respuesta]);

  const handleClick = () => {
    setNodo({
      tipo: "respuesta",
      ...respuestaDatos,
      handleEliminarRespuesta: () => handleEliminarRespuesta(respuestaDatos.id),
      setRespuesta: (nuevaRespuestaDatos) =>
        setRespuestaDatos(nuevaRespuestaDatos),
    });
  };

  return (
    respuestaDatos && (
      <>
        <div
          id="respuesta"
          onClick={() => handleClick()}
          style={
            nodo && nodo.tipo === "respuesta" && nodo.id === respuestaDatos.id
              ? { backgroundColor: "#60e78f6e" }
              : {}
          }
        >
          <b>Respuesta </b>
          {respuestaDatos.valores}
        </div>
        <div id="respuesta-escena">
          {respuestaDatos.escena ? (
            <Escena
              escena={respuestaDatos.escena}
              escenarioId={escenarioId}
              respuestaId={respuestaDatos.id}
              modificable={modificable}
            />
          ) : (
            <Escena
              escenarioId={escenarioId}
              respuestaId={respuestaDatos.id}
              modificable={modificable}
            />
          )}
        </div>
      </>
    )
  );
}
