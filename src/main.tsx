import { ChakraProvider} from '@chakra-ui/react';
import { createRoot } from 'react-dom/client'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <App />
        <ReactQueryDevtools/>
      </ChakraProvider>
    </QueryClientProvider>
)
