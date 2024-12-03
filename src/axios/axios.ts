import axios from "axios";
import { useState,useEffect } from "react"
import { Facturas } from "../types/Facturas";

const apiUrl ='https://674f1cd6bb559617b26e1595.mockapi.io/api/v1';

const Axios = () => {
    const [Facturas, setFacturas] = useState<Facturas[]>([]);

    const request = () => {
        axios.get(`${apiUrl}/facturas`).then(response => {
              console.log('Datos obtenidos:', response.data);
              setFacturas(response.data);
            })
            .catch(error => {
              console.error('Hubo un error con la solicitud GET:', error);
            });
        }

        useEffect(() => {
            request();
        }, []);

      return {Facturas };
    
    }

export default Axios;