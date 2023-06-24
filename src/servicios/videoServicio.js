// const apiURL = "http://localhost:8000/api/";
const apiURL = "https://virtualedu-api-production.up.railway.app/api/";

export const subirVideos = async (props) => {
  try {
    const formData = new FormData();
    formData.append("escenario_id", props.escenario_id);

    props.videos.map((video) => {
      formData.append("videos[]", video);
    });

    return await fetch(apiURL + "guardar-videos", {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((response) => response.json())
      .then((resultado) => {
        return resultado;
      });
  } catch (error) {}
};

export const eliminarVideo = async (id) => {
  try {
    return await fetch(apiURL + `eliminar-video/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((resultado) => {
        return resultado;
      });
  } catch (error) {}
};
