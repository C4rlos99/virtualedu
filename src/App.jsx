import { BrowserRouter, Route, Routes } from "react-router-dom";
import InicioSesion from "./paginas/InicioSesion";
import Registrarse from "./paginas/Registrarse";
import NoEncontrado from "./paginas/NoEncontrado";
import Escenarios from "./paginas/Escenarios";
import ModificarEscenario from "./paginas/ModificarEscenario";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InicioSesion />} />

        <Route path="/iniciar-sesion" element={<InicioSesion />} />

        <Route path="/registrarse" element={<Registrarse />} />

        <Route path="/escenarios" element={<Escenarios />} />

        <Route
          path="/escenarios/modificar/1"
          element={<ModificarEscenario />}
        />

        <Route path="*" element={<NoEncontrado />} />
      </Routes>
    </BrowserRouter>
  );
}
