import React, { useContext, useState } from "react";
import { Container, Nav, Image } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { UsuarioContext } from "../context/UsuarioContext.js";
import { cerrarSesion } from "../servicios/usuarioServicio.js";
import "../style.css";
import swal from "sweetalert";

export default function Header(props) {
  const [activo, setActivo] = useState(true);
  const [redireccion, setRedireccion] = useState(false);
  const { usuario, setUsuario } = useContext(UsuarioContext);

  const mostrarAlerta = (titulo, texto, icono = null) => {
    swal({
      title: titulo,
      text: texto,
      icon: icono,
      buttons: "aceptar",
    });
  };

  return redireccion ? (
    <Navigate to="/" replace />
  ) : (
    <Navbar fixed="top" collapseOnSelect expand="md" variant="dark" bg="dark">
      <Container>
        <Navbar.Brand id="web-title">
          <Link to={"/escenarios"}>
            <Image
              alt="Logo de la web"
              src={process.env.PUBLIC_URL + "/icons/virtualEdu_logo.png"}
              width="45"
              height="45"
            />{" "}
            Virtual Edu
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          className="justify-content-end"
          id="responsive-navbar-nav"
        >
          <Nav className="me-auto">
            <Link className="nav-link" to={"/escenarios"}>
              Escenarios
            </Link>
          </Nav>
          <Nav>
            <NavDropdown
              title={
                usuario !== null
                  ? `${usuario.nombre} ${usuario.apellidos}`
                  : "Nombre Usuario"
              }
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item
                onClick={() => {
                  mostrarAlerta(
                    "Clave de usuario",
                    `Tu clave es: ${usuario ? usuario.clave : "Sin clave"}`
                  );
                }}
              >
                Ver clave
              </NavDropdown.Item>
              <NavDropdown.Item
                disabled={!activo}
                onClick={() => {
                  setActivo(false);
                  cerrarSesion().then((resultado) => {
                    switch (resultado.status) {
                      case 200:
                        mostrarAlerta(
                          "Cerrar sesión",
                          resultado.mensaje,
                          "success"
                        );
                        localStorage.clear();
                        setUsuario(null);
                        setRedireccion(true);
                        break;
                      case 401:
                        mostrarAlerta(
                          "Cerrar sesión",
                          resultado.mensaje,
                          "error"
                        );
                        break;
                      default:
                        break;
                    }
                    setActivo(true);
                  });
                }}
              >
                Cerrar sesión
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
