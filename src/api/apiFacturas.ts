import axios from "axios";
import { Facturas } from "../types/Facturas";

const apiFacturas = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

// Get Facturas
export const getFacturas = async () => {
  try {
    const response = await apiFacturas.get('/facturas');
    console.log("Datos obtenidos:", response.data);
    return response.data;
  } catch (err) {
    console.error("Hubo un error con la solicitud GET:", err);

  }
}

// Get Facturas en base a su id
export const getFacturasById = async (id:string) => {
  try {
    const response = await apiFacturas.get(`/facturas/${id}`);
    console.log("Datos obtenidos:", response.data);
    return response.data;
  } catch (err) {
    console.error("Hubo un error con la solicitud GET:", err);

  }
}

// Post Factura
export const postFactura =(data: Facturas) => apiFacturas.post('/facturas', data);

// Delete Factura
export const deleteFactura = (id: string) => {
  return apiFacturas.delete(`/facturas/${id}`);
};
