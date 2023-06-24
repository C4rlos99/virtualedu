import { apiURL } from "../constantes/apiConfig";

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
