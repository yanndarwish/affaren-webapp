import { Card } from "../../ui/card"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../ui/table"
import { EmptyData } from "../../shared/emptyData"
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "../../ui/pagination"
import { Stack } from "@mui/material"
import { Button } from "../../ui/button"
import { Pencil, Trash2Icon } from "lucide-react"
import { useNotify } from "../../../lib/hooks/useNotify"
import { Modal, useModal } from "../../shared/modal"
import { useQuery } from "../../../lib/hooks/useQuery"
import { ModalEditProduct } from "../modals/edit"
import { deleteProduct } from "../../../lib/api"

const columns = [
	{
		label: "Id",
		field: "product_id",
		className: "text-left",
	},
	{
		label: "Name",
		field: "product_name",
		className: "text-left",
	},
	{
		label: "Price",
		field: "product_price",
		className: "",
	},
	{
		label: "Quantity",
		field: "product_quantity",
		className: "",
	},
	{
		label: "Taxe",
		field: "product_taxe",
		className: "",
	},
	{
		label: "Barcode",
		field: "product_barcode",
		className: "text-right",
	},
	{
		label: "Actions",
		field: "actions",
		className: "text-right",
	},
]

export default function InventoryTable({
	products,
	pagination,
	handlePreviousPage,
	handleNextPage,
	onSuccess = () => null,
}) {
	const { notifySuccess, notifyError } = useNotify()
	const editProductController = useModal()
	const modalDeleteProduct = useModal()

	const queryDeleteProduct = useQuery({
		queryFn: deleteProduct,
		onSuccess: () => {
			notifySuccess("Product deleted successfully")
			onSuccess()
		},
		onError: () => {
			notifyError("Failed to delete product")
		},
	})

	const handleClickEdit = (product) => {
		editProductController.setData(product)
		editProductController.openModal()
	}

	const handleClickDelete = (product) => {
		modalDeleteProduct.setData(product)
		modalDeleteProduct.openModal()
	}

	const handleConfirmDelete = (productId) => {
		queryDeleteProduct.send(productId)
	}

	return (
		<Card className="flex flex-col overflow-hidden">
			<div className="flex flex-col h-full relative">
				{/* Sticky Header */}
				<Table>
					<TableHeader className="sticky top-0 bg-white z-10 border-b">
						<TableRow>
							{columns.map((column, index) => (
								<TableHead key={index} className={column.className}>
									{column.label}
								</TableHead>
							))}
						</TableRow>
					</TableHeader>
				</Table>

				{/* Scrollable Body */}
				<div id="scrollable-body" className="flex-1 overflow-auto h-full">
					<Table>
						<TableBody>
							{/* Empty state rows to maintain height */}
							{!products || products.length === 0 ? (
								<EmptyData
									message="No products found"
									span={columns.length + 1}
									// className="h-[calc(100vh-300px)]"
								/>
							) : (
								products?.map((product) => (
									<TableRow key={product.product_id}>
										<TableCell component="th" scope="row">
											{product.product_id}
										</TableCell>
										<TableCell align="left">{product.product_name}</TableCell>
										<TableCell align="left">{product.product_price}</TableCell>
										<TableCell align="left">
											{product.product_quantity}
										</TableCell>
										<TableCell align="right">{product.product_taxe}</TableCell>
										<TableCell align="right">
											{product.product_barcode}
										</TableCell>
										<TableCell className="text-right">
											<Stack
												direction="row"
												justifyContent="flex-end"
												spacing={2}
											>
												<Button
													size="icon"
													onClick={() => handleClickEdit(product)}
												>
													<Pencil />
												</Button>
												<Button
													size="icon"
													variant="destructive"
													onClick={() => handleClickDelete(product)}
												>
													<Trash2Icon />
												</Button>
											</Stack>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>
				{/* Sticky Footer */}
				<div className="sticky bottom-0 bg-white border-t">
					<Pagination className="py-2">
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									onClick={handlePreviousPage}
									isActive={pagination.pageNumber >= 1}
									className={
										pagination.pageNumber === 1
											? "opacity-20 cursor-not-allowed"
											: ""
									}
								/>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink>{pagination.pageNumber}</PaginationLink>
							</PaginationItem>
							{pagination.pageTotal !== pagination.pageNumber &&
								pagination.pageTotal !== 0 && (
									<>
										<PaginationItem>
											<PaginationEllipsis />
										</PaginationItem>
										<PaginationItem>
											<PaginationLink>{pagination.pageTotal}</PaginationLink>
										</PaginationItem>
									</>
								)}
							<PaginationItem>
								<PaginationNext
									onClick={handleNextPage}
									isActive={pagination.pageNumber <= pagination.pageTotal}
									className={
										pagination.pageNumber >= pagination.pageTotal
											? "opacity-20 cursor-not-allowed"
											: ""
									}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</div>
			<ModalDeleteProduct
				controller={modalDeleteProduct}
				onConfirm={handleConfirmDelete}
			/>
			<ModalEditProduct
				controller={editProductController}
				onSubmit={onSuccess}
			/>
		</Card>
	)
}

export const ModalDeleteProduct = ({ controller, onConfirm = () => null }) => {
	const product = controller.data

	const handleConfirmDelete = () => {
		onConfirm(product.product_id)
		controller.closeModal()
	}

	return (
		<Modal
			open={controller.open}
			title={`Delete Product ${product.product_name}`}
			handleClose={controller.closeModal}
		>
			<Stack direction="column" spacing={4}>
				<p className="text-center text-lg font-medium text-gray-900">
					Are you sure you want to delete this product?
				</p>
			</Stack>

			<Stack direction="row" spacing={2}>
				<Button
					onClick={controller.closeModal}
					variant="outline"
					className="w-full"
				>
					Cancel
				</Button>
				<Button
					onClick={handleConfirmDelete}
					variant="destructive"
					className="w-full"
				>
					Delete
				</Button>
			</Stack>
		</Modal>
	)
}
