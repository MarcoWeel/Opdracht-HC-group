import logo from './logo.svg';
import './App.css';
import Filaments from './Components/Filaments';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateBrand from './Pages/CreateBrand';
import CreateSubType from './Pages/CreateSubType';
import CreateMainType from './Pages/CreateMainType';
import CreateFilament from './Pages/CreateFilament';


function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Filaments />} />
          <Route path="createbrand" element={<CreateBrand />} />
          <Route path="createmaintype" element={<CreateMainType />} />
          <Route path="createsubtype" element={<CreateSubType />} />
          <Route path="createfilament" element={<CreateFilament />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
