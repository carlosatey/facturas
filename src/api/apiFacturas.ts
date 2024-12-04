import axios from "axios";
import { Facturas } from "../types/Facturas";

const apiFacturas = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

// Get Facturas
export const getFacturas = async (endpoint:string) => {
  try {
    const response = await apiFacturas.get(endpoint);
    console.log("Datos obtenidos:", response.data);
    return response.data;
  } catch (err) {
    console.error("Hubo un error con la solicitud GET:", err);

  }
}

// Post Factura
export const postFactura =(data: Facturas) => apiFacturas.post('/facturas', data);

