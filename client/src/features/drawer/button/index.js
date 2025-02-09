import { Computer } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { cn } from "../../../lib/utils"

export const DrawerButton = ({ className, onClick = () => null, ...props }) => {
	return (
		<Button
			onClick={onClick}
			className={cn("", className)}
			{...props}
		>
			<Computer />
		</Button>
	)
}
