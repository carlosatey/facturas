import axios from "axios";
import { Facturas } from "../interfaces/Facturas";

const apiFacturas = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})


export const useFacturas = () => {
  
  // Get Facturas
  const getFacturas = async () => {
    try {
      const response = await apiFacturas.get('/facturas');
      console.log("Datos obtenidos:", response.data);
      return response.data;
    } catch (err) {
      console.error("Hubo un error con la solicitud GET:", err);

    }
  }

  // Get Facturas en base a su id
  const getFacturasById = async (id:string) => {
    try {
      const response = await apiFacturas.get(`/facturas/${id}`);
      console.log("Datos obtenidos:", response.data);
      return response.data;
    } catch (err) {
      console.error("Hubo un error con la solicitud GET:", err);

    }
  }

  // Post Factura
  const postFactura = async (data: Facturas) => {
    try {
      const response = await apiFacturas.post('/facturas', data);
      console.log("Factura creada:", response.data);
      return response.data;
    } catch (err) {
      console.error("Hubo un error con la solicitud POST:", err);
      throw err;
    }
  };

  // Put Factura
  const updateFactura = async (factura:Facturas) => {
    try {
      const response = await apiFacturas.put(`/facturas/${factura.id}`, factura);
      console.log("Factura creada:", response.data);
      return response.data;
    } catch (err) {
      console.error("Hubo un error con la solicitud POST:", err);
      throw err;
    }
  };

  // Delete Factura
  const deleteFactura = async (id: string) => {
    try {
      const response = await apiFacturas.delete(`/facturas/${id}`);
      console.log("Factura eliminada:", response.data);
      return response.data;
    } catch (err) {
      console.error("Hubo un error con la solicitud DELETE:", err);
      throw err;
    }
  };

  return {
    getFacturas,
    getFacturasById,
    postFactura,
    deleteFactura,
    updateFactura
  };
}


