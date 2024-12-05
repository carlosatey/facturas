import {Table} from "../components/Table";
import {getFacturas } from "../api/apiFacturas";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from '@chakra-ui/react'

const Home = () => {

    const {isLoading, data ,isError, refetch } = useQuery({
        queryKey: ['facturas'],
        queryFn: () => getFacturas(),
        refetchInterval: 1000
    })

    return (
        <>
            <h1 className="text-3xl font-bold mb-8">Home</h1>
            {isLoading ? (
                <p>Cargando...</p>
            ) : isError ? (
                <p>Ocurrió un error al cargar los datos.</p>
            ) : (
                <>
                     <Table facturas={data} refetch={refetch} />
                     <Button colorScheme='green'>
                        <Link to="/new">Agregar Factura</Link>
                     </Button>
                     
                </>
            )}
            
        </>
    )
}

export {Home}