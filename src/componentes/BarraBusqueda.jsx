import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

export default function BarraBusqueda(props) {
  const { handleChangeFiltro, placeHolder } = props;
  const [busqueda, setBusqueda] = useState("");

  const handleChange = (valor) => {
    setBusqueda(valor);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleChangeFiltro(busqueda);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <div id="search-box">
          <button type="submit">
            <BsSearch />
          </button>
          <Form.Control
            placeholder={placeHolder}
            type="text"
            value={busqueda}
            name="busqueda"
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
        </div>
      </InputGroup>
    </Form>
  );
}
