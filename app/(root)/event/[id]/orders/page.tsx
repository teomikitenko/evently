import { getOrderDetails } from "@/configs/db"
import TableOrders from "@/components/TableOrders"

export const dynamic = "force-dynamic";

const Orders = async({params}:{params:{id:string}}) => {
  const orders = await getOrderDetails(params.id)
  return (
    <section className="flex flex-col gap-4 min-w-[360px]">
    <div className="dotted-bg w-full flex justify-center sm:block md:py-14 py-10 sm:px-10">
        <h3 className="text-2xl md:text-4xl font-bold">Orders</h3> 
        </div>
    <div className="px-10 py-9 ">
      <TableOrders orders = {orders!} />
    </div>
  </section>
  )
}

export default Orders