const apiURL = "http://localhost:8000/api/";

export const obtenerEscenas = async (escenarioId) => {
  try {
    return await fetch(apiURL + `escenas/${escenarioId}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((resultado) => {
        return resultado;
      });
  } catch (error) {}
};

export const crearEscena = async (props) => {
  try {
    return await fetch(apiURL + "escena", {
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

export const eliminarEscena = async (id) => {
  try {
    return await fetch(apiURL + `escena/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((resultado) => {
        return resultado;
      });
  } catch (error) {}
};
