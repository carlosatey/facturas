import { Table as TablaChakra, Thead, Tbody, Tr, Th, Td, TableCaption,TableContainer, Box} from '@chakra-ui/react';
import { Facturas } from '../types/Facturas';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFacturas } from '../api/useFacturas';
import { Modal } from './Modal';
import { FaRegEye } from "react-icons/fa";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";

interface TableProps  {
  facturas: Facturas[];
};

const Table =  ({ facturas}: TableProps) => {
  const [isLoadingRequest, setLoadingRequest] = useState(false)
  const {deleteFactura} = useFacturas()
  const queryClient = useQueryClient();

  const delFactura = useMutation({
    mutationFn: deleteFactura,
    onSuccess: () => {
        queryClient.invalidateQueries(),
        setLoadingRequest(false)
    } 
  })

  const handleDelete = (id: string) => {
    setLoadingRequest(true);
    delFactura.mutate(id)
  }

  return (
      <TableContainer>
          <TablaChakra variant='simple'>
            <TableCaption placement='top' fontSize={22} marginBottom={5}>Número Total de Facturas: {facturas.length}</TableCaption>
            <Thead>
              <Tr>
                <Th>Cliente</Th>
                <Th>Numero</Th>
                <Th>fecha de Creacion</Th>
                <Th>Pagada</Th>
                <Th>Fecha de Pago</Th>
                <Th>Operaciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {facturas.map((factura) => (
                  <Tr key={factura.id}>
                      <Td>{factura.client}</Td>
                      <Td>{factura.number}</Td>
                      <Td>{new Date(factura.createdAt).toLocaleDateString()}</Td>
                      <Td>{factura.paid ? <Box textAlign='center' bg='green' color='white'>Si</Box> : <Box textAlign='center' bg='red' color='white'>No</Box> }</Td>
                      <Td>{new Date(factura.paymentDate).toLocaleDateString()}</Td>
                      <Td className='flex justify-between justify-center items-center'>
                        {<Modal loadingButton={isLoadingRequest} 
                          tittleModal={`Borrar Factura #${factura.number}`} 
                          textModal='¿Estas seguro que deseas eliminar esta factura?' 
                          icon={<MdOutlineDeleteOutline color="red" size={20}/>} 
                          handleClick={()=>handleDelete(factura.id)}
                        />}
                        <Link to={`/edit/${factura.id}`}>{<FaEdit  color='blue'/>}</Link>
                        <Link to={`/show/${factura.id}`}>{<FaRegEye />}</Link>
                      </Td>
                  </Tr>
              ))}

            </Tbody>
          </TablaChakra>
      </TableContainer>
  )
}


export {Table}