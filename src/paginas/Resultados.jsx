import React from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import BarraBusqueda from "../componentes/BarraBusqueda";
import Footer from "../componentes/Footer";
import Header from "../componentes/Header";
import TablaResultados from "../componentes/TablaResultados";

export default function Resultados(props) {
  const [filtro, setFiltro] = useState("");
  const [tituloEscenario, setTituloEscenario] = useState("");

  const handleChange = (valor) => {
    setFiltro(valor);
  };

  return (
    <div className="wrapper">
      <Header />

      <Container className="content">
        <h2>Resultados</h2>
        <h4 id="titulo-escenario">Escenario: {tituloEscenario}</h4>

        <div id="barra-busqueda">
          <BarraBusqueda
            handleChangeFiltro={handleChange}
            placeHolder="Buscar resultado por nombre y apellidos del usuario..."
          />
        </div>

        <TablaResultados
          filtro={filtro}
          setTituloEscenario={setTituloEscenario}
        />
      </Container>

      <Footer />
    </div>
  );
}
