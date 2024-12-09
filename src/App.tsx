import { BrowserRouter, NavigateFunction  } from "react-router-dom";
import { useState } from "react";
import {RuterController} from "./components/RuterController";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ChakraProvider} from '@chakra-ui/react';
import { AuthContext } from "./context/auth.context";
import { Users } from "./interfaces/Users";
import './App.css'

function App() {
  const storedUser = localStorage.getItem("user");
  const userPerfil: Users = storedUser ? JSON.parse(storedUser) : null;


  const [user, setUser] = useState<Users>({
    nombre: userPerfil?.nombre || "",
    apellidos: userPerfil?.apellidos || "",
    email: userPerfil?.email || "",
    createdAt: userPerfil?.createdAt || new Date(),
    id: userPerfil?.id || "",
    phone: userPerfil?.phone || "",
    password: ""
  })

  const [auth, setAuth] = useState<boolean>(localStorage?.getItem("auth") === "true" ? true : false)

  const logout = (navigate: NavigateFunction) => {
    localStorage.removeItem("user")
    localStorage.removeItem("auth")

    setUser({
      nombre: null,
      apellidos: null,
      email: null,
      createdAt: null,
      id: null,
      phone: null,
      password: null
    })

    setAuth(false)

    navigate("/")
  }

  const queryClient = new QueryClient();

  return (
    <ChakraProvider>
      <AuthContext.Provider value={{ user, setUser, auth, setAuth, logout }}>
        <QueryClientProvider client={queryClient}> 
          <BrowserRouter>
              <RuterController/>
          </BrowserRouter>
          <ReactQueryDevtools/>
        </QueryClientProvider> 
      </AuthContext.Provider>
    </ChakraProvider>   
  )
}

export default App
