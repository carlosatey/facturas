import {
    Table as TablaChakra,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react';
  import { Facturas } from '../types/Facturas';

  const Table =  ({ facturas }: IProps) => {
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
                </Tr>
              </Tfoot>
            </TablaChakra>
        </TableContainer>
    )
  }

  type IProps = {
    facturas: Facturas[];
  };

export {Table}