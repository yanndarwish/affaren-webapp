import {
	Table,
	TableBody,
	TableHeader,
	TableRow,
	TableHead,
} from "../../../../../components/ui/table"
import { CartRow } from "./row"

const COLUMNS = [
	{ label: "Name", field: "name", className: "" },
	{ label: "Qty", field: "quantity", className: "text-center" },
	{ label: "Price", field: "price", className: "text-right" },
]

export const CartTable = ({
	sale,
	onSelect,
	onQuantityUpdate,
	onSelectedQuantityUpdate,
	onRemove,
	onAddToDiscount,
}) => (
	<div className="h-full flex flex-col relative">
		<Table>
			<TableHeader className="sticky top-0 bg-white z-10 border-b">
				<TableRow>
					<TableHead className="text-left">Select</TableHead>
					<TableHead className="text-left">N°</TableHead>
					{COLUMNS.map((column, index) => (
						<TableHead key={index} className={column.className}>
							{column.label}
						</TableHead>
					))}
					<TableHead className="text-right"></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody className="h-full overflow-y-auto">
				{sale.products.map((product, i) => (
					<CartRow
						key={i}
						index={i}
						product={product}
						sale={sale}
						onSelect={onSelect}
						onQuantityUpdate={onQuantityUpdate}
						onSelectedQuantityUpdate={onSelectedQuantityUpdate}
						onRemove={onRemove}
						onAddToDiscount={onAddToDiscount}
					/>
				))}
			</TableBody>
		</Table>
	</div>
)
