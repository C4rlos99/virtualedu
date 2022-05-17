const apiURL = "http://localhost:8000/api/";

export const registarUsuario = async (props) => {
  try {
    return await fetch(apiURL + "registrar", {
      method: "POST",
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

export const iniciarSesion = async (props) => {
  try {
    return await fetch(apiURL + "iniciar-sesion", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(props),
    })
      .then((response) => response.json())
      .then((resultado) => {
        return resultado;
      });
  } catch (error) {}
};

export const cerrarSesion = async () => {};

export const obtenerUsuarioAutenticado = async () => {};
