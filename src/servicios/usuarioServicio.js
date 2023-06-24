// const apiURL = "http://localhost:8000/api/";
const apiURL = "https://virtualedu-api-production.up.railway.app/api/";

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

export const cerrarSesion = async () => {
  try {
    return await fetch(apiURL + "cerrar-sesion", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((resultado) => {
        return resultado;
      });
  } catch (error) {}
};

export const obtenerUsuarioAutenticado = async () => {
  try {
    return await fetch(apiURL + "usuario", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((resultado) => {
        return resultado;
      });
  } catch (error) {}
};
