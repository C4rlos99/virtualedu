import React from "react";
import PropTypes from "prop-types";
import Header from "../components/Header";
import Crud from "../components/Crud";
import { Container, Row, Col } from "react-bootstrap";
import "../style.css";
//Pruebas con array local
import getItems from "../Items.js";

export default function Home() {
  return (
    <>
      <Header />
      <Container className="container-wrapper">
        <Row>
          <Col></Col>
        </Row>
        <Crud items={getItems()} />
      </Container>
    </>
  );
}

Home.propTypes = {};
