import React, { useState } from "react";
import { Button, FormSelect } from "react-bootstrap";
import CrearEscena from "./CrearEscena";

export default function AnadirEscena(props) {
  const { escenarioId, respuestaId, setEscena } = props;
  const [selectorValor, setSelectorValor] = useState("0");
  const [mostrarFormEscena, setMostrarFormEscena] = useState(false);

  const handleChange = (e) => {
    setSelectorValor(e.target.value);
  };

  return (
    <div id="anadir-escena-contenedor">
      <Button
        id="anadir-escena-btn"
        disabled={selectorValor === "0"}
        onClick={() => setMostrarFormEscena(true)}
      >
        Añadir escena
      </Button>
      <FormSelect
        id="anadir-escena-selector"
        value={selectorValor}
        onChange={(e) => handleChange(e)}
      >
        <option className="text-center" value="0">
          -- Seleccione el tipo de la escena --
        </option>
        {JSON.parse(localStorage.getItem("escenaTipos")).map((escenaTipo) => (
          <option key={escenaTipo.id} value={escenaTipo.id}>
            {escenaTipo.nombre}
          </option>
        ))}
      </FormSelect>

      <CrearEscena
        show={mostrarFormEscena}
        onHide={() => setMostrarFormEscena(false)}
        setMostrarFormEscena={setMostrarFormEscena}
        setEscena={setEscena}
        escenarioId={escenarioId}
        respuestaId={respuestaId}
        escenaTipoId={parseInt(selectorValor)}
      />
    </div>
  );
}
