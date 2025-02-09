import { ReceiptText } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { cn } from "../../../lib/utils"

export const TicketButton = ({
	className,
	disabled,
	onClick = () => null,
	...props
}) => {
	return (
		<Button
			onClick={onClick}
			className={cn("bg-orange-400", className)}
			disabled={disabled}
			{...props}
		>
			<ReceiptText />
		</Button>
	)
}
