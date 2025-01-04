import InventoryTable from "../../components/INVENTORY/InventoryTable/InventoryTable"
import { useState } from "react"
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { ModalCreateProduct } from "../../components/INVENTORY/modals/create"
import { useModal } from "../../components/shared/modal"
import { Stack } from "@mui/material"
import BarcodeSection from "../../components/POS/BarcodeSection/BarcodeSection"
import { PlusIcon } from "lucide-react"
import { Button } from "../../components/ui/button"
import { useQuery } from "../../lib/hooks/useQuery"
import { useNotify } from "../../lib/hooks/useNotify"
import { getProducts } from "../../lib/api"
import { Input } from "../../components/ui/input"
import {
	FixedContainer,
	PageContainer,
} from "../../components/shared/containers"
import { useConfig } from "../../lib/hooks/useConfig"

const Inventory = () => {
	const { notifyError } = useNotify()
	let [searchParams] = useSearchParams()
	const { isActiveComponent } = useConfig()
	const createProductController = useModal()

	const [name, setName] = useState("")
	const [products, setProducts] = useState([])
	const [pagination, setPagination] = useState({
		pageSize: 25,
		pageNumber: 1,
		pageTotal: 0,
	})

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
		<PageContainer className="grid gap-4 md:grid-cols-12 grid-rows-1 h-full">
			<FixedContainer className="col-span-12">
				<Stack className="space-y-4 h-full overflow-y-hidden">
					<Stack direction="row" spacing={2} justifyContent="space-between">
						<Stack direction="row" spacing={2}>
							{isActiveComponent("inventory", "search-barcode") && (
								<BarcodeSection onSuccess={setProducts} />
							)}
							{isActiveComponent("inventory", "search-name") && (
								<NameSection
									name={name}
									handleNameChange={handleNameChange}
									handleReset={handleReset}
								/>
							)}
						</Stack>
						<Button onClick={handleCreateProduct}>
							<PlusIcon />
						</Button>
					</Stack>
					{isActiveComponent("inventory", "table") && (
						<InventoryTable
							products={products}
							pagination={pagination}
							handlePreviousPage={handlePreviousPage}
							handleNextPage={handleNextPage}
							onSuccess={() => {
								queryGetProducts.send(pagination)
							}}
						/>
					)}
				</Stack>
				<ModalCreateProduct
					controller={createProductController}
					onSuccess={() => {
						queryGetProducts.send(pagination)
					}}
				/>
			</FixedContainer>
		</PageContainer>
	)
}

export default Inventory

const NameSection = ({
	name,
	handleNameChange = () => {},
	handleReset = () => {},
}) => {
	return (
		<div className="flex max-w-sm items-center space-x-2">
			<Input
				id="name-input"
				type="text"
				placeholder="Name"
				value={name}
				onChange={handleNameChange}
			/>
			<Button onClick={handleReset}>Reset</Button>
		</div>
	)
}
