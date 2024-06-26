import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import InicioSesion from "./paginas/InicioSesion";
import Registrarse from "./paginas/Registrarse";
import NoEncontrado from "./paginas/NoEncontrado";
import Escenarios from "./paginas/Escenarios";
import Escenario from "./paginas/Escenario";
import { UsuarioContextProvider } from "./context/UsuarioContext";
import Resultados from "./paginas/Resultados";

export default function App() {
  return (
    <BrowserRouter>
      <UsuarioContextProvider>
        <Routes>
          <Route path="/" element={<InicioSesion />} />

          <Route path="/iniciar-sesion" element={<InicioSesion />} />

          <Route path="/registrarse" element={<Registrarse />} />

          <Route path="/escenarios" element={<Escenarios />} />

          <Route path="/escenarios/modificar/:id" element={<Escenario />} />

          <Route path="/resultados/:escenarioId" element={<Resultados />} />

          <Route
            path="/escenarios/mostrar/:id"
            element={<Escenario modificable={false} />}
          />

          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </UsuarioContextProvider>
    </BrowserRouter>
  );
}
