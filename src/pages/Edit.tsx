import {useFacturas} from "../hooks/useFacturas"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { Flex } from "@chakra-ui/react"
import { FacturasForm } from "../components/FacturasForms";
import { Spinner } from "../components/Spinner";

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
                    <Flex h={'100vh'} w={'100vw'} alignItems={'center'} justifyContent={'center'}>
                        <Spinner/>
                    </Flex>
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