import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import swal from "sweetalert";
import { eliminarEscenario } from "../servicios/escenarioServicio";
import "../style.css";

export default function BotonEliminarEscenario(props) {
  const { handleEliminarEscenario, escenarioId } = props;
  const [activo, setActivo] = useState(true);

  const mostrarAlertaEliminar = () => {
    setActivo(false);
    swal({
      title: "Eliminar escenario",
      text: "Si aceptas no podrás acceder más al escenario eliminado",
      icon: "warning",
      buttons: ["Cancelar", "aceptar"],
      dangerMode: true,
    }).then((Eliminar) => {
      if (Eliminar) {
        eliminarEscenario(escenarioId).then((resultado) => {
          switch (resultado.status) {
            case 200:
              swal(resultado.mensaje, {
                icon: "success",
              });
              handleEliminarEscenario(escenarioId);
              break;
            case 403:
              swal(resultado.mensaje, {
                icon: "error",
              });
              break;
            default:
              break;
          }
          setActivo(true);
        });
      } else setActivo(true);
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
