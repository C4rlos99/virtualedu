import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { obtenerResultados } from "../servicios/resultadoServicio";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResultadoPDF from "./ResultadoPDF";

export default function TablaResultados(props) {
  const { filtro, setTituloEscenario } = props;
  const [redireccion, setRedireccion] = useState(false);
  const [tituloEscenarioPDF, setTituloEscenarioPDF] = useState("");
  const [path, setPath] = useState("");
  const [resultados, setResultados] = useState([]);
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
          setTituloEscenario(resultado.titulo_escenario);
          setTituloEscenarioPDF(resultado.titulo_escenario);
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
          {resultados
            .filter((resultado) => {
              return resultado.nombre_usuario
                .toLowerCase()
                .includes(filtro.toLowerCase());
            })
            .map((resultado) => (
              <tr key={resultado.id}>
                <td>{resultado.nombre_usuario}</td>
                <td>{resultado.fecha_evaluacion.split("T")[0]}</td>
                <td>
                  <PDFDownloadLink
                    document={
                      <ResultadoPDF
                        tituloEscenario={tituloEscenarioPDF}
                        resultado={resultado}
                      />
                    }
                    fileName={
                      resultado.nombre_usuario.replaceAll(" ", "-") +
                      "_" +
                      resultado.fecha_evaluacion.split("T")[0]
                    }
                  >
                    <Button>Descargar pdf</Button>
                  </PDFDownloadLink>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
