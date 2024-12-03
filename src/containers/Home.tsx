import {Table} from "../components/Table";
import Axios from "../axios/axios"

const Home = () => {
    const { Facturas, isLoading, error } = Axios();

    return (
        <>
            <h1>Home Facturas</h1>
            {isLoading ? (
                <p>Cargando...</p>
            ) : error ? (
                <p>Ocurrió un error al cargar los datos.</p>
            ) : (
                <Table facturas={Facturas} />
            )}
            
        </>
    )
}

export {Home}