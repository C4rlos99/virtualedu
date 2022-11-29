import React, { useContext, useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";
import { NodoEscenarioContext } from "../context/NodoEscenarioContext";
import { BsChevronRight } from "react-icons/bs";
import Escena from "./Escena";

export default function Respuesta(props) {
  const {
    escenarioId,
    respuesta = null,
    handleEliminarRespuesta,
    modificable = true,
  } = props;
  const [respuestaDatos, setRespuestaDatos] = useState(null);
  const [colapsado, setColapsado] = useState(false);
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
        <div className="d-flex">
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
          <div
            id="respuesta-collapse-btn"
            className="collapse-btn"
            onClick={() => setColapsado(!colapsado)}
            style={
              nodo && nodo.tipo === "respuesta" && nodo.id === respuestaDatos.id
                ? { backgroundColor: "#60e78f6e" }
                : {}
            }
          >
            <BsChevronRight
              style={
                colapsado
                  ? { transform: "rotate(180deg)", transition: "0.35s" }
                  : { transform: "rotate(90deg)", transition: "0.35s" }
              }
            />
          </div>
          <div></div>
        </div>

        <Collapse in={!colapsado}>
          <div>
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
          </div>
        </Collapse>
      </>
    )
  );
}
