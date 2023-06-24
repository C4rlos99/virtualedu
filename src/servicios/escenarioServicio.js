import { apiURL } from "../constantes/apiConfig";

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
    return await fetch(apiURL + `escenario/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((resultado) => {
        return resultado;
      });
  } catch (error) {}
};

export const crearEscenario = async (props) => {
  try {
    return await fetch(apiURL + "escenario", {
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

export const modificarEscenario = async (props) => {
  try {
    return await fetch(apiURL + `escenario/${props.id}`, {
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

export const eliminarEscenario = async (id) => {
  try {
    return await fetch(apiURL + `eliminar-escenario/${id}`, {
      method: "PATCH",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((resultado) => {
        return resultado;
      });
  } catch (error) {}
};
