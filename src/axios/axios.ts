import axios from "axios";
import { useState,useEffect } from "react"
import { Facturas } from "../types/Facturas";

const apiUrl ='https://674f1cd6bb559617b26e1595.mockapi.io/api/v1';

const Axios = () => {
    const [Facturas, setFacturas] = useState<Facturas[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(false)

    const request = () => {
        axios.get(`${apiUrl}/facturas`).then(response => {
              console.log('Datos obtenidos:', response.data);
              setFacturas(response.data);
              setLoading(false);
              setError(false);
            })
            .catch(error => {
              console.error('Hubo un error con la solicitud GET:', error);
              setLoading(true);
              setError(true);
            });
        }

        useEffect(() => {
            request();
        }, []);

      return {Facturas, isLoading, error};
    
    }

export default Axios;