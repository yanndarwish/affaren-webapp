import { ErrorMessage, FullFlex } from "../../assets/common/common.styles"
import OrdersList from "../../components/ORDERS/OrdersList/OrdersList"
import { useGetOrdersMutation } from "../../redux/services/orderApi"
import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import AddOrder from "../../components/ORDERS/AddOrder/AddOrder"
import OrderContent from "../../components/ORDERS/OrderContent/OrderContent"
import { useNavigate } from "react-router-dom"
import { OrderButton } from "../../components/ORDERS/OrdersList/OrdersList.styles"
import { IconButton } from "@mui/material"
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined"

const Orders = () => {
	const [listIsOpen, setListIsOpen] = useState(true)
	const isMobile = window.innerWidth <= 820 ? true : false
	const loggedIn = useSelector((state) => state.login.loggedIn)
	const navigate = useNavigate()
	const theme = useSelector((state) => state.theme.theme)
	const orders = useSelector((state) => state.orders.orders)
	const ordersUpdate = useSelector((state) => state.orders.ordersUpdate)
	const [selectedOrderId, setSelectedOrderId] = useState("")
	const [selectedOrder, setSelectedOrder] = useState({})
	const [isEdit, setIsEdit] = useState(false)
	const [add, setAdd] = useState(false)
	const [newOrder, setNewOrder] = useState(false)
	const [getOrders, res] = useGetOrdersMutation()

	const getTargetOrder = (orderId) => {
		const found = orders?.find((order) => order.order_id === parseInt(orderId))
		setSelectedOrder(found)
	}

	const redirect = () => {
		!loggedIn && navigate("/login")
	}

	const focusNewOrder = () => {
		if (newOrder) {
			let sorted = [...orders]
			sorted = sorted.sort((a, b) => a.order_id - b.order_id)
			setSelectedOrder(sorted && sorted[sorted.length - 1])
		}
		setNewOrder(false)
	}

	const toggleList = () => {
		if (listIsOpen) {
			document.getElementById("order-sidebar").style.display = "none"
		} else {
			document.getElementById("order-sidebar").style.display = "block"
		}
		setListIsOpen(!listIsOpen)
	}

	useEffect(() => {
		getTargetOrder(selectedOrderId)
	}, [selectedOrderId])

	useEffect(() => {
		focusNewOrder()
	}, [orders])

	useEffect(() => {
		getOrders()
	}, [ordersUpdate])

	useEffect(() => {
		redirect()
		getOrders()
	}, [])

	return (
		<FullFlex theme={theme}>
			<OrderButton onClick={() => toggleList()}>
				<IconButton>
					<LibraryBooksOutlinedIcon />
				</IconButton>
			</OrderButton>
			<OrdersList
				orders={orders && orders}
				selected={selectedOrderId}
				setSelected={setSelectedOrderId}
				setAdd={setAdd}
				setIsEdit={setIsEdit}
				toggleList={isMobile && toggleList}
			/>
			{res.isError && <ErrorMessage>Failed to fetch orders</ErrorMessage>}
			{isMobile ? (
				add && !listIsOpen ? (
					<AddOrder theme={theme} setAdd={setAdd} setNewOrder={setNewOrder} />
				) : (
					!listIsOpen && (
						<OrderContent
							theme={theme}
							order={selectedOrder && selectedOrder}
							setSelected={setSelectedOrderId}
							isEdit={isEdit}
							setIsEdit={setIsEdit}
						/>
					)
				)
			) : add ? (
				<AddOrder theme={theme} setAdd={setAdd} setNewOrder={setNewOrder} />
			) : (
				<OrderContent
					theme={theme}
					order={selectedOrder && selectedOrder}
					setSelectedOrder={setSelectedOrder}
					setSelected={setSelectedOrderId}
					isEdit={isEdit}
					setIsEdit={setIsEdit}
				/>
			)}
		</FullFlex>
	)
}

export default Orders
