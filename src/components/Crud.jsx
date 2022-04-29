import React from "react";
import { Button, Table, Row, Col, Container } from "react-bootstrap";
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

export default function Crud({ items }) {
  return (
    <>
      {/* Para screens con widht >= 480px */}
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
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.nombre}</td>
              <td>{item.fecha}</td>
              <td>
                {item.visible ? (
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

      {/* Para screens con widht < 480px */}
      <div id="mobile-crud">
        {items.map((item) => (
          <div className="mobile-item-crud">
            <div className="text-center">
              <span>{item.nombre}</span>
            </div>
            <hr />
            <Row>
              <Col xs={6}>
                <span>Fecha:</span> {item.fecha}
                <br />
                <br />
                <span>Visible:</span>
                {item.visible ? (
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
    </>
  );
}

Crud.propTypes = {};
