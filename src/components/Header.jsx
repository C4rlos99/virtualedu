import React from "react";
import { Container, Nav, Image } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../style.css";
import PropTypes from "prop-types";

export default function Header(props) {
  return (
    <Navbar
      fixed="top"
      className="header-style"
      collapseOnSelect
      expand="md"
      variant="dark"
      bg="dark"
    >
      <Container>
        <Navbar.Brand className="web-title" href="/home">
          <Image
            alt="Logo de la web"
            src={process.env.PUBLIC_URL + "/icons/exampleIncon.png"}
            width="45"
            height="45"
          />{" "}
          Virtual Edu
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          className="justify-content-end"
          id="responsive-navbar-nav"
        >
          <Nav className="me-auto">
            <Link className="nav-link" to={"/home"}>
              Home
            </Link>
          </Nav>
          <Nav>
            <NavDropdown title={"Nombre Usuario"} id="collasible-nav-dropdown">
              <NavDropdown.Item>Perfil</NavDropdown.Item>
              <NavDropdown.Item>Cerrar sesión</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

Header.propTypes = {};
