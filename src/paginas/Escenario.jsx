import React, { useEffect, useState } from "react";
import Header from "../componentes/Header";
import { Container } from "react-bootstrap";
import Footer from "../componentes/Footer";
import { Navigate, useParams } from "react-router-dom";
import { obtenerEscenas } from "../servicios/escenaServicio";
import Escena from "../componentes/Escena";
import ModificarEscenario from "../componentes/ModificarEscenario";
import { NodoEscenarioContextProvider } from "../context/NodoEscenarioContext.js";
import swal from "sweetalert";
import DatosNodo from "../componentes/DatosNodo";
import { VideosEscenarioContextProvider } from "../context/VideosEscenarioContext";

export default function Escenario(props) {
  const { modificable = true } = props;
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
    obtenerEscenas(id).then((resultado) => {
      switch (resultado.status) {
        case 200:
          setEscenaRaiz(resultado.escena);
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
        {modificable ? (
          <h2>Modificar escenario</h2>
        ) : (
          <h2>Datos del escenario</h2>
        )}
        <h4 id="titulo-config-datos-escenario">Configuración del escenario</h4>
        <VideosEscenarioContextProvider>
          <ModificarEscenario id={id} modificable={modificable} />
          <br />
          <h4 id="titulo-seccion-escenas">Escenas</h4>
          <NodoEscenarioContextProvider>
            <div className="d-flex">
              <div id="nodos">
                <Escena
                  escena={escenaRaiz}
                  escenarioId={id}
                  modificable={modificable}
                />
              </div>

              <DatosNodo modificable={modificable} />
            </div>
          </NodoEscenarioContextProvider>
        </VideosEscenarioContextProvider>
      </Container>
      <Footer />
    </div>
  );
}
