import { createContext, useEffect, useState } from "react";

export const UsuarioContext = createContext();

export function UsuarioContextProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    setUsuario(JSON.parse(localStorage.getItem("usuario")));
  }, [usuario]);

  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UsuarioContext.Provider>
  );
}
