const apiURL = "http://localhost:8000/api/";

export const obtenerEscenarios = async () => {
  try {
    return await fetch(apiURL + "escenarios", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((resultado) => {
        return resultado;
      });
  } catch (error) {}
};

export const obtenerEscenario = async (id) => {
  try {
    return await fetch(apiURL + `escenarios/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((resultado) => {
        return resultado;
      });
  } catch (error) {}
};
