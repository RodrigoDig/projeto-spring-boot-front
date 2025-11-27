import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./pages/cadastro/cadastro";
import Lista from "./pages/lista/lista";

export default function RoutesWeb() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Lista />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/editar/:id' element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  );
}
