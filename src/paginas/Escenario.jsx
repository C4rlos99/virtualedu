import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Header from "../componentes/Header";
import { Container } from "react-bootstrap";
import Footer from "../componentes/Footer";
import { Navigate, useParams } from "react-router-dom";
import { obtenerEscenario } from "../servicios/escenarioServicio";
import { obtenerEscenas } from "../servicios/escenaServicio";
import Escena from "../componentes/Escena";
import ModificarEscenario from "../componentes/ModificarEscenario";
import swal from "sweetalert";

export default function Escenario() {
  const [escenarioDatos, setEscenarioDatos] = useState(null);
  const [redireccion, setRedireccion] = useState(false);
  const [path, setPath] = useState("");
  const [escenaRaiz, setEscenaRaiz] = useState(null);
  const { id } = useParams();

  const mostrarAlerta = (texto, icono, titulo) => {
    swal({
      title: titulo,
      text: texto,
      icon: icono,
      buttons: "aceptar",
    });
  };

  useEffect(() => {
    obtenerEscenario(id).then((resultado) => {
      switch (resultado.status) {
        case 200:
          setEscenarioDatos(resultado.escenario);
          obtenerEscenas(id).then((resultado) => {
            switch (resultado.status) {
              case 200:
                setEscenaRaiz(resultado.escenas);
                break;
              case 403:
                mostrarAlerta(resultado.mensaje, "error", "escenario");
                setPath("/escenarios");
                setRedireccion(true);
                break;
              case 401:
                mostrarAlerta(resultado.mensaje, "error", "Usuario");
                setPath("/iniciar-sesion");
                setRedireccion(true);
                break;
              default:
                break;
            }
          });
          break;
        case 403:
          mostrarAlerta(resultado.mensaje, "error", "Escenario");
          setPath("/escenarios");
          setRedireccion(true);
          break;
        case 401:
          mostrarAlerta(resultado.mensaje, "error", "Usuario");
          setPath("/iniciar-sesion");
          setRedireccion(true);
          break;
        default:
          break;
      }
    });
  }, [id]);

  return redireccion ? (
    <Navigate to={path} replace />
  ) : (
    <div className="wrapper">
      <Header />
      <Container className="content">
        {escenarioDatos && (
          <ModificarEscenario
            setEscenario={setEscenarioDatos}
            escenario={escenarioDatos}
          />
        )}
        <br />
        <h3>Escenas</h3>
        <br />
        <div className="d-flex">
          <div>
            <Escena escena={escenaRaiz} escenarioId={id} />
          </div>
          <div></div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
