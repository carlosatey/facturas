import { useQuery } from "@tanstack/react-query";
import { useFacturas } from "../api/useFacturas";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import {Button} from "@chakra-ui/react"

const Show = () => {    
    const {idFactura} = useParams();
    const {getFacturasById} = useFacturas();

    const {isLoading, data ,isError} = useQuery({
        queryKey: ['facturas_by_id'],
        queryFn: () => getFacturasById(`${idFactura}`)
    })

    return(
        <>
        <h1 className="text-3xl font-bold mb-8">Detalles de la factura</h1>

        {isLoading ? (
                <p>Cargando...</p>
            ) : isError ? (
                <p>Ocurrió un error al cargar los datos.</p>
            ) : (
                <>
                     <p>Nombre del cliente: {data.client}</p>
                     <p>Fecha de Pago: {data.createdAt}</p>
                     <p>Pagado: {data.paid.toString()}</p>
                     <p>Numero: {data.number}</p>
                     <p>Fecha de Pago: {data.paymentDate}</p>
                     <Button colorScheme='gray' className='mt-8'>
                        <Link to="/">Atras</Link>
                    </Button>
                </>
            )}
        </>
    )
}

export{Show}