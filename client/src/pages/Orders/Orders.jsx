import { Container, Flex, FullFlex } from "../../assets/styles/common.styles"
import OrdersList from "../../components/ORDERS/OrdersList/OrdersList"
import { useGetOrdersQuery } from "../../redux/services/orderApi"
import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import AddOrder from "../../components/ORDERS/AddOrder/AddOrder"
import OrderContent from "../../components/ORDERS/OrderContent/OrderContent"

const Orders = () => {
	const theme = useSelector((state) => state.theme.theme)
	const [selectedOrderId, setSelectedOrderId] = useState("")
	const [selectedOrder, setSelectedOrder] = useState({})
	const [add, setAdd] = useState(false)

	const { data } = useGetOrdersQuery()

	const getTargetOrder = (orderId) => {
    const found = data?.find(order => order.order_id === parseInt(orderId))
    setSelectedOrder(found)
	}

	useEffect(() => {
		getTargetOrder(selectedOrderId)
	}, [selectedOrderId])

	return (
		<FullFlex>
			<OrdersList
				orders={data && data}
				selected={selectedOrderId}
				setSelected={setSelectedOrderId}
				setAdd={setAdd}
			/>
			{add ? <AddOrder theme={theme} /> : <OrderContent theme={theme} order={selectedOrder && selectedOrder} />}
		</FullFlex>
	)
}

export default Orders
