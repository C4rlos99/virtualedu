import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import swal from "sweetalert";
import { eliminarEscena } from "../servicios/escenaServicio";
import "../style.css";

export default function BotonEliminarEscena(props) {
  const { escenaId, setEscena } = props;
  const [activo, setActivo] = useState(true);

  const mostrarAlertaEliminar = (id) => {
    setActivo(false);
    swal({
      title: "Eliminar escena",
      text: "Si aceptas se eliminará la escena y todas sus respuestas y escenas descendientes.",
      icon: "warning",
      buttons: ["Cancelar", "aceptar"],
      dangerMode: true,
    }).then((Eliminar) => {
      if (Eliminar) {
        eliminarEscena(id).then((resultado) => {
          switch (resultado.status) {
            case 200:
              swal(resultado.mensaje, {
                icon: "success",
              });
              setEscena(null);
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
        mostrarAlertaEliminar(escenaId);
      }}
    >
      <BsTrash />
    </button>
  );
}
