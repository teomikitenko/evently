import { getOrderDetails } from "@/configs/db"
import TableOrders from "@/components/TableOrders"

const Orders = async({params}:{params:{id:string}}) => {
  const orders = await getOrderDetails(params.id)
  return (
    <section className="flex flex-col gap-4">
    <div className="dotted-bg py-14 px-10">
        <h3 className="text-4xl font-bold">Orders</h3> 
        </div>
    <div className="px-10 py-9 ">
      <TableOrders orders = {orders} />
    </div>
  </section>
  )
}

export default Orders