import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function BotonMostrarResultados(props) {
  const { escenarioId } = props;
  const [redireccion, setRedireccion] = useState(false);

  const handleClick = () => {
    setRedireccion(true);
  };

  return redireccion ? (
    <Navigate to={`/resultados/${escenarioId}`} />
  ) : (
    <button className="crud-btn" id="result-btn" onClick={() => handleClick()}>
      Ver resultados
    </button>
  );
}
