import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Home} from "./containers/Home";
import { New } from "./containers/New";
import { Show } from "./containers/Show";
import { Edit } from "./containers/Edit";
import './App.css'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Home/>} />
          <Route path="/new" element={<New />} />
          <Route path="/show/:idFactura" element={<Show />} />
          <Route path="/edit/:idFactura" element={<Edit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
