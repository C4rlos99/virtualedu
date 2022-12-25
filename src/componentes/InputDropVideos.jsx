import React, { useRef, useState } from "react";
import { Button, Image } from "react-bootstrap";
import swal from "sweetalert";
import { subirVideos } from "../servicios/videoServicio";
import { BsXLg } from "react-icons/bs";
import "../style.css";

export default function DropFileVideos(props) {
  const { handleAnadirVideos, escenarioId } = props;
  const wrapperRef = useRef(null);
  const [nuevosVideos, setNuevosVideos] = useState([]);
  const [submitActivo, setSubmitActivo] = useState(true);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const handleDropVideo = (e) => {
    const nVideos = [...nuevosVideos, ...e.target.files];

    if (nVideos.length > 0) setNuevosVideos(nVideos);
  };

  const eliminarVideo = (video) => {
    const nVideos = [...nuevosVideos];

    nVideos.splice(nVideos.indexOf(video), 1);

    setNuevosVideos(nVideos);
  };

  const mostrarAlerta = (texto, icono) => {
    swal({
      title: "Videos",
      text: texto,
      icon: icono,
      buttons: "aceptar",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nuevosVideos.length > 0) {
      setSubmitActivo(false);

      subirVideos({
        escenario_id: escenarioId,
        videos: nuevosVideos,
      }).then((resultado) => {
        switch (resultado.status) {
          case 200:
            mostrarAlerta(resultado.mensaje, "success");
            handleAnadirVideos(resultado.videos);
            setNuevosVideos([]);
            break;
          case 422:
            mostrarAlerta(resultado.mensaje, "error");
            break;
          case 403:
            mostrarAlerta(resultado.mensaje, "error");
            break;
          default:
            break;
        }
        setSubmitActivo(true);
      });
    }
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="drop-file-input-label">
          <p>
            Arrastra y suelta los archivos .mp4 aquí o haz click para
            seleccionarlos
          </p>
        </div>
        <input type="file" multiple onChange={handleDropVideo} />
      </div>
      {nuevosVideos.length > 0 && (
        <>
          <p className="drop-file-preview-titulo">Listos para subir</p>

          <div className="drop-file-preview-grid">
            {nuevosVideos.map((nuevoVideo, index) => (
              <div key={index} className="drop-file-preview-item">
                <Image
                  alt="mp4 icono"
                  src={process.env.PUBLIC_URL + "/icons/mp4FileIcon.png"}
                />

                <div className="drop-file-preview-item-info">
                  <p>{nuevoVideo.name}</p>
                  <p>{nuevoVideo.size}B</p>
                </div>

                <BsXLg onClick={() => eliminarVideo(nuevoVideo)} />
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-center" id="subir-videos-div">
            <Button
              disabled={nuevosVideos.length <= 0 || !submitActivo}
              id="subir-videos"
              variant="primary"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Subir videos
            </Button>
          </div>
        </>
      )}
    </>
  );
}
