import { apiURL } from "../constantes/apiConfig";

export const obtenerEscenaTipos = async () => {
  try {
    return await fetch(apiURL + "escena-tipos", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((resultado) => {
        return resultado;
      });
  } catch (error) {}
};
