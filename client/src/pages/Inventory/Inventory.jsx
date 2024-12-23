import { useSelector } from "react-redux"
import InventoryTable from "../../components/INVENTORY/InventoryTable/InventoryTable"
import { useState } from "react"
import { useGetProductsQuery } from "../../redux/services/productsApi"
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { ModalCreateProduct } from "../../components/INVENTORY/modals/create"
import { useModal } from "../../components/shared/modal"
import { ModalEditProduct } from "../../components/INVENTORY/modals/edit"
import { Stack } from "@mui/material"
import { PageTitle } from "../../components/shared/pageTitle"
import BarcodeSection from "../../components/POS/BarcodeSection/BarcodeSection"
import { PlusIcon } from "lucide-react"
import { Button } from "../../components/ui/button"
import { useQuery } from "../../lib/hooks/useQuery"
import { useNotify } from "../../lib/hooks/useNotify"
import { getProducts } from "../../lib/api"
import { Input } from "../../components/ui/input"

const Inventory = () => {
	const { notifyError } = useNotify()
	const loggedIn = useSelector((state) => state.login.loggedIn)
	const navigate = useNavigate()
	const theme = useSelector((state) => state.theme.theme)
	const [pageNumber, setPageNumber] = useState(1)
	const [searchString, setSearchString] = useState("")
	const [barcode, setBarcode] = useState("")
	const [barcodeValue, setBarcodeValue] = useState("")
	const [barcodeSearch, setBarcodeSearch] = useState(false)
	const [products, setProducts] = useState([])
	const [pagination, setPagination] = useState({
		pageSize: 25,
		pageNumber: 1,
		pageTotal: 0,
	})

	const createProductController = useModal()
	let [searchParams] = useSearchParams()
	const [name, setName] = useState("")

	const barcodeParam = searchParams.get("new")

	const queryGetProducts = useQuery({
		queryFn: getProducts,
		onSuccess: (data) => {
			setProducts(data.data)
			setPagination({
				...pagination,
				pageTotal: data.pageTotal,
			})
		},
		onError: () => {
			notifyError("Failed to fetch products")
		},
	})

	const handleCreateProduct = () => {
		createProductController.openModal()
	}

	const handlePreviousPage = () => {
		if (pagination.pageNumber > 1) {
			setPagination({
				...pagination,
				pageNumber: pagination.pageNumber - 1,
			})
		}
	}

	const handleNextPage = () => {
		if (pagination.pageNumber < pagination.pageTotal) {
			setPagination({
				...pagination,
				pageNumber: pagination.pageNumber + 1,
			})
		}
	}

	const handleReset = () => {
		setName("")
		queryGetProducts.send({ pagination })
	}

	const handleNameChange = (e) => {
		setName(e.target.value)
	}

	const scrollToTop = () => {
		const scrollableBody = document.getElementById("scrollable-body")
		scrollableBody.scrollTo({ top: 0, behavior: "smooth" })
	}

	useEffect(() => {
		if (barcodeParam) {
			createProductController.openModal()
		}
	}, [barcodeParam])

	useEffect(() => {
		queryGetProducts.send({ pagination, name })
		scrollToTop()
	}, [pagination.pageNumber, name])

	return (
		<Stack direction="column" spacing={2} className="w-full h-full">
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				spacing={2}
			>
				<PageTitle title="Inventory" />
				<Button onClick={handleCreateProduct}>
					<PlusIcon />
				</Button>
			</Stack>
			<Stack direction="row" spacing={2} justifyContent="space-between">
				<Stack direction="row" spacing={2}>
					<BarcodeSection onSuccess={setProducts} />
					<NameSection name={name} handleNameChange={handleNameChange} />
				</Stack>
				<Button onClick={handleReset}>Reset</Button>
			</Stack>
			<Stack className="space-y-8 h-full overflow-y-hidden">
				<InventoryTable
					products={products}
					pagination={pagination}
					handlePreviousPage={handlePreviousPage}
					handleNextPage={handleNextPage}
					onSuccess={() => {
						queryGetProducts.send(pagination)
					}}
				/>
			</Stack>
			<ModalCreateProduct
				controller={createProductController}
				onSuccess={() => {
					queryGetProducts.send(pagination)
				}}
			/>
		</Stack>
	)
}

export default Inventory

const NameSection = ({ name, handleNameChange }) => {
	return (
		<div className="flex max-w-sm items-center space-x-2">
			<Input
				id="name-input"
				type="text"
				placeholder="Name"
				value={name}
				onChange={handleNameChange}
			/>
		</div>
	)
}
