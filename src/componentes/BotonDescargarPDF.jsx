import React from "react";
import { BsCloudDownloadFill } from "react-icons/bs";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResultadoPDF from "./ResultadoPDF";
import "../style.css";

export default function BotonModificarEscenario(props) {
  const { tituloEscenarioPDF, resultado } = props;

  return (
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
      <button className="crud-btn" id="descarga-btn">
        <BsCloudDownloadFill />
      </button>
    </PDFDownloadLink>
  );
}
