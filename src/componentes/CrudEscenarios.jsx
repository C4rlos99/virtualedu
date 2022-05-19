import React, { useEffect, useState } from "react";
import { Table, Row, Col } from "react-bootstrap";
import {
  BsFillCheckSquareFill,
  BsFillXSquareFill,
  BsTrash,
  BsEye,
  BsPencil,
  BsListCheck,
} from "react-icons/bs";
import "../style.css";
import PropTypes from "prop-types";
import { obtenerEscenarios } from "../servicios/escenarioServicio";
import swal from "sweetalert";
import { Navigate } from "react-router-dom";

export default function CrudEscenarios(props) {
  const { filtro } = props;
  const [escenarios, setEscenarios] = useState([]);
  const [redireccion, setRedireccion] = useState(false);

  useEffect(() => {
    obtenerEscenarios().then((resultado) => {
      switch (resultado.status) {
        case 200:
          setEscenarios(resultado.escenarios);
          break;
        case 401:
          mostrarAlerta(resultado.mensaje);
          setRedireccion(true);
      }
    });
  }, []);

  const mostrarAlerta = (texto) => {
    swal({
      title: "Usuario",
      text: texto,
      icon: "error",
      buttons: "aceptar",
    });
  };

  return redireccion ? (
    <Navigate to="/iniciar-sesion" replace />
  ) : window.innerWidth >= 768 ? (
    <Table hover id="table-crud">
      <thead>
        <tr>
          <th>Nombre del escenario</th>
          <th>Fecha</th>
          <th>Visible</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {escenarios
          .filter((escenario) => {
            return escenario.titulo.includes(filtro);
          })
          .map((escenario) => (
            <tr key={escenario.id}>
              <td>{escenario.titulo}</td>
              <td>{escenario.fecha_creacion}</td>
              <td>
                {escenario.visible ? (
                  <BsFillCheckSquareFill className="visible-icon" />
                ) : (
                  <BsFillXSquareFill className="invisible-icon" />
                )}
              </td>
              <td>
                <div className="d-flex">
                  <button className="crud-btn" id="result-btn">
                    <BsListCheck />
                  </button>

                  <button className="crud-btn" id="show-btn">
                    <BsEye />
                  </button>

                  <button className="crud-btn" id="mod-btn">
                    <BsPencil />
                  </button>

                  <button className="crud-btn" id="delete-btn">
                    <BsTrash />
                  </button>
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
                <span>Fecha:</span> {escenario.fecha_creacion}
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
                  <button className="crud-btn" id="result-btn">
                    <BsListCheck />
                  </button>

                  <button className="crud-btn" id="show-btn">
                    <BsEye />
                  </button>
                </div>
                <div className="d-flex justify-content-end">
                  <button className="crud-btn" id="mod-btn">
                    <BsPencil />
                  </button>

                  <button className="crud-btn" id="delete-btn">
                    <BsTrash />
                  </button>
                </div>
              </Col>
            </Row>
          </div>
        ))}
    </div>
  );
}

CrudEscenarios.propTypes = {};
