import { createContext, useState } from "react";

export const NodoEscenarioContext = createContext();

export function NodoEscenarioContextProvider({ children }) {
  const [nodo, setNodo] = useState(null);

  return (
    <NodoEscenarioContext.Provider value={{ nodo, setNodo }}>
      {children}
    </NodoEscenarioContext.Provider>
  );
}
