import React, { useState } from "react";
import { BsEye } from "react-icons/bs";
import { Navigate } from "react-router-dom";

export default function BotonMostrarEscenario(props) {
  const { escenarioId } = props;
  const [redireccion, setRedireccion] = useState(false);

  const handleClick = () => {
    setRedireccion(true);
  };

  return redireccion ? (
    <Navigate to={`/escenarios/mostrar/${escenarioId}`} />
  ) : (
    <button className="crud-btn" id="show-btn" onClick={() => handleClick()}>
      <BsEye />
    </button>
  );
}
