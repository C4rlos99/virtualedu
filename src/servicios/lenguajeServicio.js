const apiURL = "http://localhost:8000/api/";

export const obtenerLenguajes = async () => {
  try {
    return await fetch(apiURL + "lenguajes", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((resultado) => {
        return resultado;
      });
  } catch (error) {}
};
