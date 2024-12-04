import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Home} from "./containers/Home";
import { New } from "./containers/New";
import './App.css'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Home/>} />
          <Route path="/new" element={<New />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
