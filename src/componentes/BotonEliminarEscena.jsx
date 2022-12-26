import React, { useContext, useState } from "react";
import { BsTrash } from "react-icons/bs";
import swal from "sweetalert";
import { eliminarEscena } from "../servicios/escenaServicio";
import { NodoEscenarioContext } from "../context/NodoEscenarioContext";
import "../style.css";

export default function BotonEliminarEscena(props) {
  const { escenaId, setEscena } = props;
  const [activo, setActivo] = useState(true);
  const { setNodo } = useContext(NodoEscenarioContext);

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
              setNodo(null);
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
          setActivo(true);
        });
      } else setActivo(true);
    });
  };

  return (
    <BsTrash
      style={
        activo ? { cursor: "pointer" } : { color: "#f55050", cursor: "default" }
      }
      onClick={() => {
        activo && mostrarAlertaEliminar(escenaId);
      }}
    />
  );
}
