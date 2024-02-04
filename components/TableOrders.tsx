"use client";
import { Table } from "@mantine/core";
import type { Orders } from "@/configs/types/types";
const TableOrders = ({ orders }: { orders: Orders }) => {
  const tableHeaders = [
    "Order Id",
    "Event Title",
    "Buyer",
    "Created",
    "Amount",
  ];
  const bodyRows = orders.map((o) => {
    const currentPrice = o.events?.free ? "Free" : o.events?.price;
    return (
      <Table.Tr className="w-full" key={o.id}>
        <Table.Td className="w-[calc(100%/5)]">
          <p className="line-clamp-1 break-words">{o.order_id}</p>
        </Table.Td>
        <Table.Td className="w-[calc(100%/5)]">
          <p className="line-clamp-1 break-words">{o.events?.title}</p>
        </Table.Td>
        <Table.Td className="w-[calc(100%/5)]">
          <p className="line-clamp-1 break-words">{o.name}</p>
        </Table.Td>
        <Table.Td className="w-[calc(100%/5)]">
          <p className="line-clamp-1 break-words">
            {o.created_at.split("T")[0]}
          </p>
        </Table.Td>
        <Table.Td className="w-[calc(100%/5)]">
          <p className="line-clamp-1 break-words">{currentPrice}</p>
        </Table.Td>
      </Table.Tr>
    );
  });
  return orders.length > 0 ? (
    <Table.ScrollContainer type="scrollarea" minWidth={1020}>
      <Table horizontalSpacing={"xl"} layout="fixed">
        <Table.Thead>
          <Table.Tr>
            {tableHeaders.map((e) => (
              <Table.Th key={e}>{e}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{bodyRows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  ) : (
    <p className="line-clamp-1 break-words">Not found details</p>
  );
};

export default TableOrders;
