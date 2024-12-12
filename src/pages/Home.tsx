import { Table } from "../components/Table";
import { useFacturas } from "../hooks/useFacturas";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button, Flex, Box, Text } from '@chakra-ui/react';
import { useState } from "react";
import { Facturas } from "../interfaces/Facturas";
import { Spinner } from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/auth.context"; 
import { Select } from "../components/Select";

const Home = () => {
    const [filteredData, setFilteredData] = useState<Facturas[]>([]);
    const {getFacturas} = useFacturas();
    const navigate = useNavigate();
    const {logout} = useAuthContext()

    const {isLoading, data ,isError} = useQuery({
        queryKey: ['facturas'],
        queryFn: () => getFacturas(),
    })

    const handleFilter = (param:boolean|string) => {
        if( typeof param === "boolean"){
            const facturasPagadas = data.filter((factura: Facturas) => factura.paid === param);
            setFilteredData(facturasPagadas)
        }else{
            setFilteredData([])
        }
    }

    return (
        <>
            <Flex alignItems={"center"} justifyContent={"center"}>
                <Text mb='5' mt='5' fontWeight='bold' fontSize={24}>Home</Text>
            </Flex>
            {isLoading ? (
                <Flex h={'100vh'} w={'100vw'} alignItems={'center'} justifyContent={'center'}>
                    <Spinner/>
                </Flex>
            ) : isError ? (
                <Text>Ocurrió un error al cargar los datos.</Text>
            ) : (
                <>
                    <Flex flexDirection='column' width={'100%'} px={20}>
                        <Box w='100%' p={4} color='black' display={"flex"} gap={10}>
                            
                            <Select handleFilter={handleFilter}/>
                            
                            <Button id="addFactura_button" colorScheme="green" px={8}>
                                <Link to="/new">Agregar Factura</Link>
                            </Button>
                            
                            <Button id="logout_button" onClick={ ()=> logout(navigate)} px={8}>
                                Cerrar Sesion
                            
                            </Button>
                        </Box>

                        <Table items={filteredData.length ? filteredData: data} columnOperation={true}/>
                        
                    </Flex>    
                </>
            )}
            
        </>
    )
}

export {Home}