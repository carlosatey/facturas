import { Route, Routes } from "react-router-dom";
import {Home} from "../pages/Home";
import { New } from "../pages/New";
import { Show } from "../pages/Show";
import { Edit } from "../pages/Edit";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { useAuthContext } from "../context/auth.context";

const RuterController = () => {
    const { auth } = useAuthContext();

    return (
        <Routes>
            <Route>
              <Route path="/" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/home" element={ auth ? <Home/>: <Login/>} />
              <Route path="/new" element={ auth ? <New />: <Login/>} />
              <Route path="/show/:idFactura" element={ auth ?<Show />: <Login/>} />
              <Route path="/edit/:idFactura" element={ auth ?<Edit />: <Login/>} />
            </Route>
        </Routes>
    )
}

export {RuterController}