import { BrowserRouter } from "react-router-dom";
import {RuterController} from "./components/RuterController";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ChakraProvider} from '@chakra-ui/react';
import './App.css'

function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <BrowserRouter>
            <RuterController/>
        </BrowserRouter>
        <ReactQueryDevtools/>
      </ChakraProvider>
    </QueryClientProvider>    
  )
}

export default App
