import { Table as TablaChakra, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption,TableContainer} from '@chakra-ui/react';
import { Facturas } from '../types/Facturas';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { deleteFactura } from '../api/apiFacturas';
import { Modal } from './Modal';

  const Table =  ({ facturas, refetch }: TableProps) => {

    const handleDelete = (id: string) => {
      deleteFactura(id).then(() => refetch)
    }

    return (
        <TableContainer>
            <TablaChakra variant='simple'>
              <TableCaption></TableCaption>
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
                        <Td>{factura.paid ? 'Sí' : 'No'}</Td>
                        <Td>{new Date(factura.paymentDate).toLocaleDateString()}</Td>
                        <Td>
                          {<Modal icon={<MdOutlineDeleteOutline color="red" size={20}/>} handleClick={()=>handleDelete(factura.id)}/>}
                        </Td>
                    </Tr>
                ))}

              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Cliente</Th>
                  <Th>Numero</Th>
                  <Th>fecha de Creacion</Th>
                  <Th>Pagada</Th>
                  <Th>Fecha de Pago</Th>
                  <Th>Operaciones</Th>
                </Tr>
              </Tfoot>
            </TablaChakra>
        </TableContainer>
    )
  }

  interface TableProps  {
    facturas: Facturas[];
    refetch?: () => void;
  };

export {Table}