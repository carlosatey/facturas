import { Route, Routes } from "react-router-dom";
import {Home} from "../pages/Home";
import { New } from "../pages/New";
import { Show } from "../pages/Show";
import { Edit } from "../pages/Edit";
import { Login } from "../pages/Login";

const RuterController = () => {

    return (
        <Routes>
            <Route>
              <Route path="/" element={<Login/>} />
              <Route path="/home" element={<Home/>} />
              <Route path="/new" element={<New />} />
              <Route path="/show/:idFactura" element={<Show />} />
              <Route path="/edit/:idFactura" element={<Edit />} />
            </Route>
        </Routes>
    )
}

export {RuterController}