// const apiURL = "http://localhost:8000/api/";
const apiURL = "https://virtualedu-api-production.up.railway.app/api/";

export const crearRespuesta = async (props) => {
  try {
    return await fetch(apiURL + "respuesta", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props),
    })
      .then((response) => response.json())
      .then((resultado) => {
        return resultado;
      });
  } catch (error) {}
};

export const modificarRespuesta = async (props) => {
  try {
    return await fetch(apiURL + `respuesta/${props.id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props),
    })
      .then((response) => response.json())
      .then((resultado) => {
        return resultado;
      });
  } catch (error) {}
};

export const eliminarRespuesta = async (id) => {
  try {
    return await fetch(apiURL + `respuesta/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((resultado) => {
        return resultado;
      });
  } catch (error) {}
};
