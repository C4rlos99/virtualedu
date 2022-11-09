import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { obtenerResultados } from "../servicios/resultadoServicio";

export default function TablaResultados(props) {
  const { filtro } = props;
  const [redireccion, setRedireccion] = useState(false);
  const [path, setPath] = useState("");
  const [resultado, setResultados] = useState([]);
  const { escenarioId } = useParams();

  const mostrarAlerta = (texto, icono, titulo) => {
    swal({
      title: titulo,
      text: texto,
      icon: icono,
      buttons: "aceptar",
    });
  };

  useEffect(() => {
    obtenerResultados(escenarioId).then((resultado) => {
      switch (resultado.status) {
        case 200:
          setResultados(resultado.resultados);
          break;
        case 403:
          mostrarAlerta(resultado.mensaje, "error", "Resultados");
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
  }, [escenarioId]);

  return redireccion ? (
    <Navigate to={path} replace />
  ) : (
    <div className="wrapper">
      <Table hover className="table-crud">
        <thead>
          <tr>
            <th>Nombre y apellidos</th>
            <th>Fecha</th>
            <th>Descarga</th>
          </tr>
        </thead>
        <tbody>
          {resultado
            .filter((resultado) => {
              return (
                resultado.usuario.nombre +
                " " +
                resultado.usuario.apellidos
              )
                .toLowerCase()
                .includes(filtro.toLowerCase());
            })
            .map((resultado) => (
              <tr key={resultado.id}>
                <td>
                  {resultado.usuario.nombre + " " + resultado.usuario.apellidos}
                </td>
                <td>{resultado.fecha_evaluacion.split("T")[0]}</td>
                <td>descargar resultado</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
