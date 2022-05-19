import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import Header from "../componentes/Header";
import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import { Container, Row, Col } from "react-bootstrap";
import CrudEscenarios from "../componentes/CrudEscenarios";
import BarraBusqueda from "../componentes/BarraBusqueda";
import Footer from "../componentes/Footer";
import "../style.css";

export default function Escenarios() {
  const [filtro, setFiltro] = useState("");

  const handleChange = (valor) => {
    setFiltro(valor);
  };

  return (
    <div className="wrapper">
      <Header />

      <Container className="content">
        <Row>
          <Col sm={6}>
            <Link to={"/"} className="crud-btn" id="new-stage">
              <BsPlusLg />
              Nuevo escenario
            </Link>
          </Col>
          <Col sm={6}>
            <BarraBusqueda
              handleChangeFiltro={handleChange}
              placeHolder="Buscar escenario por título..."
            />
          </Col>
        </Row>

        <CrudEscenarios filtro={filtro} />
      </Container>

      <Footer />
    </div>
  );
}

Escenarios.propTypes = {};
