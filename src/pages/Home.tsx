import { Table } from "../components/Table";
import { useFacturas } from "../hooks/useFacturas";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button, Flex, Select, Box, Text } from '@chakra-ui/react';
import { useState } from "react";
import { Facturas } from "../interfaces/Facturas";
import { Spinner } from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/auth.context"; 

const Home = () => {
    const [filteredData, setFilteredData] = useState<Facturas[]>([]);
    const {getFacturas} = useFacturas();
    const navigate = useNavigate();
    const {logout} = useAuthContext()

    const {isLoading, data ,isError} = useQuery({
        queryKey: ['facturas'],
        queryFn: () => getFacturas(),
    })

    const handleFilter = (param:boolean) => {
        const facturasPagadas = data.filter((factura: Facturas) => factura.paid === param);
        setFilteredData(facturasPagadas)
    }

    return (
        <>
            <Flex alignItems={"center"} justifyContent={"center"}>
                <h1 className="text-3xl font-bold mt-5">Home</h1>
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
                            <Select placeholder='Todas las facturas' onChange={(e) => {
                                const value = e.target.value;
                                if (value === 'paid') {
                                    handleFilter(true);
                                } else if (value === 'notPaid') {
                                    handleFilter(false);
                                }else {
                                    setFilteredData([])
                                }
                            }}>
                                <option value='paid' >Pagada</option>
                                <option value='notPaid'>No Pagada</option>
                            </Select>
                            <Button colorScheme="green" px={8}>
                                <Link to="/new">Agregar Factura</Link>
                            </Button>
                            <Button onClick={ ()=> logout(navigate)} px={8}>
                                Cerrar Sesion
                            </Button>
                        </Box>
                        <Table facturas={filteredData.length ? filteredData: data}/>
                        
                    </Flex>    
                </>
            )}
            
        </>
    )
}

export {Home}