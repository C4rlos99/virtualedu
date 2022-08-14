import React, { useState } from "react";
import PropTypes from "prop-types";
import Header from "../componentes/Header";
import { BsPlusLg } from "react-icons/bs";
import { Container, Row, Col } from "react-bootstrap";
import CrudEscenarios from "../componentes/CrudEscenarios";
import BarraBusqueda from "../componentes/BarraBusqueda";
import CrearEscenario from "../componentes/CrearEscenario";
import Footer from "../componentes/Footer";
import "../style.css";

export default function Escenarios() {
  const [filtro, setFiltro] = useState("");
  const [mostrarFormEscenario, setMostrarFormEscenario] = useState(false);

  const handleChange = (valor) => {
    setFiltro(valor);
  };

  return (
    <div className="wrapper">
      <Header />

      <Container className="content">
        <h2>Escenarios</h2>

        <Row>
          <Col sm={6}>
            <div
              className="crud-btn"
              id="new-stage"
              onClick={() => setMostrarFormEscenario(true)}
            >
              <BsPlusLg />
              Nuevo escenario
            </div>
          </Col>
          <Col sm={6}>
            <BarraBusqueda
              handleChangeFiltro={handleChange}
              placeHolder="Buscar escenario por título..."
            />
          </Col>
        </Row>

        <CrudEscenarios filtro={filtro} />

        <CrearEscenario
          show={mostrarFormEscenario}
          onHide={() => setMostrarFormEscenario(false)}
          setMostrarFormEscenario={setMostrarFormEscenario}
        />
      </Container>

      <Footer />
    </div>
  );
}

Escenarios.propTypes = {};
