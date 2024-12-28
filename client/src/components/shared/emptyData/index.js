import { CircleOff } from "lucide-react"
import { TableCell, TableRow } from "../../ui/table"

export const EmptyData = ({ message, className, span }) => {
	return (
		<TableRow className="text-center w-full ">
			<TableCell
				colSpan={span + 1}
				className={`${className} text-center h-[50vh]`}
			>
				<div className="flex flex-col items-center justify-center space-y-8 h-full">
					<CircleOff className="w-10 h-10 text-gray-200" />
					<p className="text-md text-gray-500">{message}</p>
				</div>
			</TableCell>
		</TableRow>
	)
}
