import {Table} from "../components/Table";
import {getFacturas } from "../api/apiFacturas";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from '@chakra-ui/react'

const Home = () => {

    const {isLoading,data ,isError } = useQuery({
        queryKey: ['facturas'],
        queryFn: () => getFacturas('/facturas'),
    })

    return (
        <>
            <h1 className="text-3xl font-bold">Home</h1>
            {isLoading ? (
                <p>Cargando...</p>
            ) : isError ? (
                <p>Ocurrió un error al cargar los datos.</p>
            ) : (
                <>
                     <Table facturas={data} />
                     <Button colorScheme='green'>
                        <Link to="/new">Agregar Factura</Link>
                     </Button>
                     
                </>
            )}
            
        </>
    )
}

export {Home}