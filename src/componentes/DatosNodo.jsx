import React, { useContext, useEffect } from "react";
import { NodoEscenarioContext } from "../context/NodoEscenarioContext";
import ModificarEscena from "./ModificarEscena";

export default function DatosNodo() {
  const { nodo } = useContext(NodoEscenarioContext);
  return nodo && nodo.tipo === "escena" && <ModificarEscena escena={nodo} />;
}
