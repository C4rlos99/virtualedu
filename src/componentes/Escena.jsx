import React, { useContext, useEffect, useState } from "react";
import AnadirEscena from "./AnadirEscena";
import Respuesta from "./Respuesta";
import { NodoEscenarioContext } from "../context/NodoEscenarioContext";
import AnadirRespuesta from "./AnadirRespuesta";
import { BsChevronRight } from "react-icons/bs";
import { Collapse } from "react-bootstrap";

export default function Escena(props) {
  const {
    respuestaId = null,
    escenarioId,
    escena = null,
    modificable = true,
  } = props;
  const [escenaDatos, setEscenaDatos] = useState(null);
  const [colapsado, setColapsado] = useState(false);
  const { nodo, setNodo } = useContext(NodoEscenarioContext);

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

  const handleClick = () => {
    setNodo({
      tipo: "escena",
      ...escenaDatos,
      setEscena: (nuevaEscenaDatos) => setEscenaDatos(nuevaEscenaDatos),
    });
  };

  return escenaDatos ? (
    <>
      <div className="d-flex">
        <div
          id="escena"
          onClick={() => handleClick()}
          style={
            !modificable && !escenaDatos.respuestas.length
              ? nodo && nodo.tipo === "escena" && nodo.id === escenaDatos.id
                ? { backgroundColor: "#60e78f6e", marginBottom: 10 }
                : { marginBottom: 10 }
              : nodo && nodo.tipo === "escena" && nodo.id === escenaDatos.id
              ? { backgroundColor: "#60e78f6e" }
              : {}
          }
          className={
            escenaDatos.escena_tipo_id === 4 && !colapsado
              ? !modificable && !escenaDatos.respuestas.length
                ? "escena-1-2-3"
                : "escena-4"
              : "escena-1-2-3"
          }
        >
          <b>{escenaDatos.titulo}</b>
        </div>

        <div
          id="escena-collapse-btn"
          className="collapse-btn"
          onClick={() => setColapsado(!colapsado)}
          style={
            !modificable && !escenaDatos.respuestas.length
              ? nodo && nodo.tipo === "escena" && nodo.id === escenaDatos.id
                ? { backgroundColor: "#60e78f6e", marginBottom: 10 }
                : { marginBottom: 10 }
              : nodo && nodo.tipo === "escena" && nodo.id === escenaDatos.id
              ? { backgroundColor: "#60e78f6e" }
              : {}
          }
        >
          <BsChevronRight
            style={
              colapsado
                ? { transform: "rotate(0deg)", transition: "0.35s" }
                : { transform: "rotate(90deg)", transition: "0.35s" }
            }
          />
        </div>
      </div>

      <Collapse in={!colapsado}>
        <div>
          <div id="escena-respuestas" className="d-flex">
            <div
              id="escena-respuestas-espacio"
              className={
                escenaDatos.escena_tipo_id === 4
                  ? !modificable && !escenaDatos.respuestas.length
                    ? ""
                    : "escena-respuestas-espacio-borde"
                  : ""
              }
              style={
                nodo && nodo.tipo === "escena" && nodo.id === escenaDatos.id
                  ? { borderColor: "#60e78f6e" }
                  : {}
              }
            ></div>

            <div
              className={
                escenaDatos.escena_tipo_id === 4
                  ? "w-100 escena-respuestas-4"
                  : "w-100"
              }
              style={
                !modificable && escenaDatos.escena_tipo_id === 4
                  ? { paddingBottom: 5 }
                  : {}
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
                        modificable={modificable}
                      />
                    );
                  })}
                  {modificable && escenaDatos.escena_tipo_id === 4 && (
                    <AnadirRespuesta
                      escenaId={escenaDatos.id}
                      handleAnadirRespuesta={handleAnadirRespuesta}
                    />
                  )}
                </>
              ) : (
                modificable && (
                  <AnadirRespuesta
                    escenaId={escenaDatos.id}
                    handleAnadirRespuesta={handleAnadirRespuesta}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </Collapse>
    </>
  ) : (
    modificable && (
      <AnadirEscena
        escenarioId={escenarioId}
        respuestaId={respuestaId}
        setEscena={setEscenaDatos}
      />
    )
  );
}
