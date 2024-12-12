import { Table as TablaChakra, Thead, Tbody, Tr, Th, Td, TableCaption,TableContainer, Box} from '@chakra-ui/react';
import { Facturas } from '../interfaces/Facturas';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFacturas } from '../hooks/useFacturas';
import { Modal } from './Modal';
import { FaRegEye } from "react-icons/fa";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";

interface TableProps  {
  items: Facturas[];
  columnOperation: boolean
};

const Table =  ({ items, columnOperation}: TableProps) => {
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
          <TablaChakra id='data-table-invoices' variant='simple'>
            <TableCaption placement='top' fontSize={22} marginBottom={5}>Número Total de Facturas: {items.length}</TableCaption>
            <Thead>
              <Tr>
              {Object.entries(items[0])
              .filter(([key]) => key !== "id")
              .map(([key]) => (
                <Th textAlign="center" key={key}>{key}</Th>
              ))}
              {columnOperation && <Th textAlign="center">Operations</Th>}
              </Tr>
            </Thead>
            <Tbody>
              {items.map((item) => (
                  <Tr key={item.id}>
                    {Object.entries(item).filter(([key]) => key !== "id").map(([key, value]) => (
                      <Td key={key} textAlign="center">{typeof value === "boolean" ? (value ? <Box textAlign='center' bg='green' color='white'>Yes</Box> : <Box textAlign='center' bg='red' color='white'>No</Box> ) : value}</Td>        
                    ))}

                    {columnOperation && 
                      <Td className='flex justify-between justify-center items-center'>
                      {<Modal loadingButton={isLoadingRequest} 
                        tittleModal={`Borrar Factura #${item.number}`} 
                        textModal='¿Estas seguro que deseas eliminar esta factura?' 
                        icon={<MdOutlineDeleteOutline color="red" size={20}/>} 
                        handleClick={()=>handleDelete(item.id)}
                      />}
                      <Link to={`/edit/${item.id}`}>{<FaEdit  color='blue'/>}</Link>
                      <Link to={`/show/${item.id}`}>{<FaRegEye />}</Link>
                    </Td>
                    }
                  </Tr>
              ))}

            </Tbody>
          </TablaChakra>
      </TableContainer>
  )
}


export {Table}