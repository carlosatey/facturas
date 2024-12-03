import {Table} from "../components/Table";
import {getFacturas } from "../api/apiFacturas";
import { useQuery } from "@tanstack/react-query";

const Home = () => {

    const {isLoading,data ,isError } = useQuery({
        queryKey: ['facturas'],
        queryFn: getFacturas
    })

    return (
        <>
            <h1>Home</h1>
            {isLoading ? (
                <p>Cargando...</p>
            ) : isError ? (
                <p>Ocurrió un error al cargar los datos.</p>
            ) : (
                <Table facturas={data} />
            )}
            
        </>
    )
}

export {Home}