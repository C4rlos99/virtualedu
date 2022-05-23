const apiURL = "http://localhost:8000/api/";

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
