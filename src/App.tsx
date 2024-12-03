import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Home} from "./containers/Home";
import './App.css'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route index element={<Home/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
