import { Flex } from "../../assets/styles/common.styles"
import OrdersList from "../../components/ORDERS/OrdersList/OrdersList"
import { useGetOrdersQuery } from "../../redux/services/orderApi"
const Orders = () => {
    const {data, error, isLoading} = useGetOrdersQuery()
  return (
    <Flex>
      <OrdersList />
      <div>other</div>
    </Flex>
  )
}

export default Orders
