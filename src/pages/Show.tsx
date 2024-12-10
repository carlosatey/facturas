import { useQuery } from "@tanstack/react-query";
import { useFacturas } from "../hooks/useFacturas";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { List, Button, Flex, Text} from '@chakra-ui/react'
import { MdCheckCircle } from "react-icons/md";
import { Spinner } from "../components/Spinner";
import { ListItem } from "../components/ListItem";

const Show = () => {    
    const {idFactura} = useParams();
    const {getFacturasById} = useFacturas();

    const {isLoading, data ,isError} = useQuery({
        queryKey: ['facturas_show'],
        queryFn: () => getFacturasById(`${idFactura}`)
    })

    return(
        <>
        {isLoading ? (
                <Flex h={'100vh'} w={'100vw'} alignItems={'center'} justifyContent={'center'}>
                  <Spinner/>
                </Flex>
            ) : isError ? (
                <Text>Ocurrió un error al cargar los datos.</Text>
            ) : (
                <>
                    <Flex alignItems={"center"} justifyContent={"center"} flexDirection={"column"} height={'100vh'}>
                      <h1 className="text-3xl font-bold mb-8">Detalles de la factura</h1>
                        <List spacing={3} textAlign={"left"}>
                            {Object.entries(data).map(([key, value]) => (
                              <ListItem 
                                key={key} 
                                icon={MdCheckCircle} 
                                text={`${key}: ${value}`}  
                              />
                            ))}
                        </List>
                        <Button colorScheme='gray' className='mt-8'>
                            <Link to="/home">Atras</Link>
                        </Button>
                    </Flex>
                    
                </>
            )}
        </>
    )
}

export{Show}