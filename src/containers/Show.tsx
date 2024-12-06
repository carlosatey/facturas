import { useQuery } from "@tanstack/react-query";
import { useFacturas } from "../api/useFacturas";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { List, ListItem, ListIcon, Button, Flex, Center} from '@chakra-ui/react'
import { MdCheckCircle } from "react-icons/md";

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
                    <Flex alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
                        <List spacing={3} textAlign={"left"}>
                            <ListItem>
                              <ListIcon as={MdCheckCircle} color='green.500' />
                              Nombre del cliente: {data.client}
                            </ListItem>
                            <ListItem>
                              <ListIcon as={MdCheckCircle} color='green.500' />
                              Fecha de Pago: {data.createdAt}
                            </ListItem>
                            <ListItem>
                              <ListIcon as={MdCheckCircle} color='green.500' />
                              Pagado: {data.paid.toString()}
                            </ListItem>
                            {/* You can also use custom icons from react-icons */}
                            <ListItem>
                              <ListIcon as={MdCheckCircle} color='green.500' />
                              Numero: {data.number}
                            </ListItem>
                            <ListItem>
                              <ListIcon as={MdCheckCircle} color='green.500' />
                              Fecha de Pago: {data.paymentDate}
                            </ListItem>
                        </List>
                        <Button colorScheme='gray' className='mt-8'>
                            <Link to="/">Atras</Link>
                        </Button>
                    </Flex>
                    
                </>
            )}
        </>
    )
}

export{Show}