'use client'
import { Table } from '@mantine/core';
import type { Orders } from '@/configs/types/types'
const TableOrders = ({orders}:{orders:Orders}) => {
  const tableHeaders = ['Order Id','Event Title','Buyer','Created','Amount']
  const bodyRows = orders.map(o=>{
    const currentPrice = o.events?.free ? 'Free':o.events?.price;
    return(
      <Table.Tr key={o.id} >
      <Table.Td></Table.Td>
      <Table.Td><p className='line-clamp-1'>{o.events?.title}</p></Table.Td>
      <Table.Td><p>{o.name}</p></Table.Td>
      <Table.Td><p>{o.created_at}</p> </Table.Td>
      <Table.Td><p>{currentPrice}</p> </Table.Td>
    </Table.Tr>
    )
    }
  )
  return (
    <Table horizontalSpacing={'lg'}>
    <Table.Thead>
      <Table.Tr>
        {tableHeaders.map(e=><Table.Th key={e}>{e}</Table.Th>)}
      </Table.Tr>
    </Table.Thead>
    <Table.Tbody>{bodyRows}</Table.Tbody>
  </Table>
  )
}

export default TableOrders

const NotFoundDetails=()=>{
  return(
    <p>not found</p>
  )
}
