const apiURL = "http://localhost:8000/api/";

export const obtenerResultados = async (escenarioId) => {
  try {
    return await fetch(apiURL + `resultados/${escenarioId}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((resultado) => {
        return resultado;
      });
  } catch (error) {}
};
