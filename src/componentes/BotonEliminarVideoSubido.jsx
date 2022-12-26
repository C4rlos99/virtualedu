import React, { useState } from "react";
import swal from "sweetalert";
import { BsXLg } from "react-icons/bs";
import { eliminarVideo } from "../servicios/videoServicio";
import "../style.css";

export default function BotonEliminarVideoSubido(props) {
  const { handleEliminarVideo, id } = props;
  const [activo, setActivo] = useState(true);

  const mostrarAlertaEliminar = () => {
    setActivo(false);
    swal({
      title: "Eliminar video",
      text: "Si aceptas no podrás acceder más al video eliminado (tendrás que volverlo a subir)",
      icon: "warning",
      buttons: ["Cancelar", "aceptar"],
      dangerMode: true,
    }).then((Eliminar) => {
      if (Eliminar) {
        eliminarVideo(id).then((resultado) => {
          switch (resultado.status) {
            case 200:
              swal(resultado.mensaje, {
                icon: "success",
              });

              handleEliminarVideo(id);
              break;
            case 403:
              swal(resultado.mensaje, {
                icon: "error",
              });
              break;
            case 422:
              swal(resultado.mensaje, {
                title: "Error al eliminar video",
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
    <BsXLg
      style={
        activo ? { cursor: "pointer" } : { color: "grey", cursor: "default" }
      }
      onClick={() => {
        activo && mostrarAlertaEliminar();
      }}
    />
  );
}
