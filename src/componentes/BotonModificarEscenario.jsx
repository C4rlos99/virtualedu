import React, { useState } from "react";
import { BsPencil } from "react-icons/bs";
import { Navigate } from "react-router-dom";

export default function BotonModificarEscenario(props) {
  const { escenarioId } = props;
  const [redireccion, setRedireccion] = useState(false);

  const handleClick = () => {
    setRedireccion(true);
  };

  return redireccion ? (
    <Navigate to={`/escenarios/modificar/${escenarioId}`} />
  ) : (
    <button className="crud-btn" id="mod-btn" onClick={() => handleClick()}>
      <BsPencil />
    </button>
  );
}
