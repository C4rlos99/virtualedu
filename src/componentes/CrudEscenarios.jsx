import React, { useEffect, useState } from "react";
import { Table, Row, Col } from "react-bootstrap";
import { BsFillCheckSquareFill, BsFillXSquareFill } from "react-icons/bs";
import "../style.css";
import { obtenerEscenarios } from "../servicios/escenarioServicio";
import swal from "sweetalert";
import { Navigate } from "react-router-dom";
import BotonEliminarEscenario from "./BotonEliminarEscenario";
import BotonModificarEscenario from "./BotonModificarEscenario";
import BotonMostrarEscenario from "./BotonMostrarEscenario";
import BotonMostrarResultados from "./BotonMostrarResultados";

export default function CrudEscenarios(props) {
  const { filtro } = props;
  const [redireccion, setRedireccion] = useState(false);
  const [escenarios, setEscenarios] = useState([]);

  useEffect(() => {
    obtenerEscenarios().then((resultado) => {
      switch (resultado.status) {
        case 200:
          setEscenarios(resultado.escenarios);
          break;
        case 401:
          mostrarAlertaNoAutenticado(resultado.mensaje);
          setRedireccion(true);
          break;
        default:
          break;
      }
    });
  }, []);

  const mostrarAlertaNoAutenticado = (texto) => {
    swal({
      title: "Usuario",
      text: texto,
      icon: "error",
      buttons: "aceptar",
    });
  };

  const handleEliminarEscenario = (id) => {
    let escenariosNuevos = [...escenarios];
    let i = escenariosNuevos.findIndex((escenario) => escenario.id === id);

    if (i > -1) escenariosNuevos.splice(i, 1);
    setEscenarios(escenariosNuevos);
  };

  return redireccion ? (
    <Navigate to="/iniciar-sesion" replace />
  ) : window.innerWidth >= 768 ? (
    <Table hover id="table-crud-escenarios" className="table-crud">
      <thead>
        <tr>
          <th>Nombre del escenario</th>
          <th>Fecha</th>
          <th id="visible-th">Visible</th>
          <th> </th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {escenarios
          .filter((escenario) => {
            return escenario.titulo
              .toLowerCase()
              .includes(filtro.toLowerCase());
          })
          .map((escenario) => (
            <tr key={escenario.id}>
              <td>{escenario.titulo}</td>
              <td>{escenario.fecha_creacion.split("T")[0]}</td>
              <td id="visible-td">
                {escenario.visible ? (
                  <BsFillCheckSquareFill className="visible-icon" />
                ) : (
                  <BsFillXSquareFill className="invisible-icon" />
                )}
              </td>
              <td></td>
              <td>
                <div className="d-flex">
                  <BotonMostrarEscenario escenarioId={escenario.id} />

                  <BotonModificarEscenario escenarioId={escenario.id} />

                  <BotonEliminarEscenario
                    handleEliminarEscenario={handleEliminarEscenario}
                    escenarioId={escenario.id}
                  />

                  <BotonMostrarResultados escenarioId={escenario.id} />
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  ) : (
    <div id="mobile-crud">
      {escenarios
        .filter((escenario) => {
          return escenario.titulo.includes(filtro);
        })
        .map((escenario) => (
          <div key={escenario.id} className="mobile-item-crud">
            <div className="text-center">
              <span>{escenario.titulo}</span>
            </div>
            <hr />
            <Row>
              <Col xs={6}>
                <span>Fecha:</span> {escenario.fecha_creacion.split("T")[0]}
                <br />
                <br />
                <span>Visible:</span>
                {escenario.visible ? (
                  <BsFillCheckSquareFill className="visible-icon" />
                ) : (
                  <BsFillXSquareFill className="invisible-icon" />
                )}
              </Col>
              <Col xs={6}>
                <div className="d-flex justify-content-end">
                  <BotonMostrarEscenario escenarioId={escenario.id} />{" "}
                  <BotonModificarEscenario escenarioId={escenario.id} />
                  <BotonEliminarEscenario
                    escenario={escenario}
                    escenarios={escenarios}
                    setEscenarios={setEscenarios}
                  />
                </div>
                <div className="d-flex justify-content-end">
                  <BotonMostrarResultados escenarioId={escenario.id} />
                </div>
              </Col>
            </Row>
          </div>
        ))}
    </div>
  );
}
