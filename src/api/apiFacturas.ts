import axios from "axios";

const apiFacturas = axios.create({
  baseURL: 'https://674f1cd6bb559617b26e1595.mockapi.io/api/v1'
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
};
