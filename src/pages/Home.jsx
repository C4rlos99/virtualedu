import React, { useState } from "react";
import PropTypes from "prop-types";
import Header from "../components/Header";
import Crud from "../components/Crud";
import { Link } from "react-router-dom";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import "../style.css";
//Pruebas con array local
import getItems from "../Items.js";

export default function Home() {
  const [search, setSearch] = useState("");

  const onChangeHandler = (value) => {
    setSearch(value);
  };

  return (
    <>
      <Header />
      <Container className="container-wrapper">
        <Row>
          <Col sm={6}>
            <Link to={"/home"} className="crud-btn" id="new-stage">
              <BsPlusLg /> Nuevo escenario
            </Link>
          </Col>
          <Col sm={6}>
            <Form>
              <InputGroup>
                <div id="search-box">
                  <BsSearch />
                  <Form.Control
                    placeholder="Buscar escenario..."
                    type="text"
                    value={search}
                    name="search"
                    onChange={(e) => onChangeHandler(e.target.value)}
                  />
                </div>
              </InputGroup>
            </Form>
          </Col>
        </Row>
        <Crud items={getItems()} />
      </Container>
    </>
  );
}

Home.propTypes = {};
