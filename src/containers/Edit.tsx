import {useFacturas} from "../api/useFacturas"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { Flex } from "@chakra-ui/react"
import { FacturasForm } from "../components/FacturasForms";

const Edit = () => {
    const {getFacturasById} = useFacturas();
    const {idFactura} = useParams();

    const { isLoading, data, isError } = useQuery({
        queryKey: ['facturas_edit'],
        queryFn: () => getFacturasById(`${idFactura}`),
    })
      

    return (
        <>
            <Flex display='flex' align='center' justifyContent='center'  height="100vh" >
                {isLoading ? (
                    <p>Cargando...</p>
                ) : isError ? (
                    <p>Ocurrió un error al cargar los datos.</p>
                ) : (
                    <>
                        <FacturasForm factura={data}/>
                    </>
                )}
            </Flex>
        </>
    )

}

export {Edit}