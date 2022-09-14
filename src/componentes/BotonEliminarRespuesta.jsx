import React, { useContext, useState } from "react";
import { BsTrash } from "react-icons/bs";
import swal from "sweetalert";
import { eliminarRespuesta } from "../servicios/respuestaServicio";
import { NodoEscenarioContext } from "../context/NodoEscenarioContext";
import "../style.css";

export default function BotonEliminarRespuesta(props) {
  const { respuestaId, handleEliminarRespuesta } = props;
  const [activo, setActivo] = useState(true);
  const { setNodo } = useContext(NodoEscenarioContext);

  const mostrarAlertaEliminar = () => {
    setActivo(false);
    swal({
      title: "Eliminar respuesta",
      text: "Si aceptas se eliminará la respuesta y todas sus respuestas y escenas descendientes.",
      icon: "warning",
      buttons: ["Cancelar", "aceptar"],
      dangerMode: true,
    }).then((Eliminar) => {
      if (Eliminar) {
        eliminarRespuesta(respuestaId).then((resultado) => {
          switch (resultado.status) {
            case 200:
              swal(resultado.mensaje, {
                icon: "success",
              });
              setNodo(null);
              handleEliminarRespuesta(respuestaId);
              break;
            case 403:
              swal(resultado.mensaje, {
                icon: "error",
              });
              break;
            default:
              break;
          }
        });
      }
      setActivo(true);
    });
  };

  return (
    <button
      className="crud-btn"
      id="delete-btn"
      disabled={!activo}
      onClick={() => {
        mostrarAlertaEliminar();
      }}
    >
      <BsTrash />
    </button>
  );
}
