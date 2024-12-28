import { Card } from "../../ui/card"
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "../../ui/table"
import { EmptyData } from "../emptyData"

export const DataGrid = ({ id, columns, data, emptyMessage }) => {
	return (
		<Card className="flex flex-col h-full overflow-hidden">
			<Table id={id} className="h-full">
				{/* Fixed Header */}
				<TableHeader className="sticky top-0 bg-white z-10">
					<TableRow>
						{columns.map((column, index) => (
							<TableHead key={index} className={column.className}>
								{column.label}
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody className="overflow-auto w-full h-full">
					{!data || data.length === 1 ? (
						<EmptyData message={emptyMessage} span={columns.length + 1} />
					) : (
						data?.map(
							(row, i) =>
								i < data.length - 1 && (
									<TableRow key={i}>
										{columns.map((column, cellIndex) => (
											<TableCell
												key={cellIndex}
												className={`
													${column.align === "right" ? "text-right" : "text-left"}
													${column.highlight === "gray" ? "bg-gray-50 font-medium" : ""}
													${column.highlight === "dark" ? "bg-gray-100 font-bold" : ""}
												`}
											>
												{row[column.field]}
											</TableCell>
										))}
									</TableRow>
								)
						)
					)}
				</TableBody>
				{/* Fixed Footer */}
				<TableFooter className="py-2 sticky bottom-0 bg-white">
					{data && data.length > 1 && (
						<TableRow className="bg-gray-100 font-bold">
							{columns.map((column, index) => (
								<TableCell
									key={index}
									className={`
									${column.align === "right" ? "text-right" : "text-left"}
									${column.highlight === "dark" ? "bg-gray-100 font-bold" : ""}
								`}
								>
									{data[data.length - 1]?.[column.field]}
								</TableCell>
							))}
						</TableRow>
					)}
				</TableFooter>
			</Table>
		</Card>
	)
}
