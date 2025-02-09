import { Stack } from "@mui/material"
import { useConfig } from "../../../../../../lib/hooks/useConfig"
import { BadgePercent, Trash2Icon } from "lucide-react"
import { Button } from "../../../../../../components/ui/button"

export const ProductActions = ({
	product,
	disabled,
	onRemove,
	onAddToDiscount,
}) => {
	const { isActiveComponent } = useConfig()

	return (
		<Stack direction="row" justifyContent="flex-end" spacing={2}>
			{isActiveComponent("pos", "discount") && (
				<Button
					variant="outline"
					size="icon"
					onClick={() => onAddToDiscount([product])}
					disabled={disabled}
				>
					<BadgePercent />
				</Button>
			)}
			<Button
				size="icon"
				onClick={() => onRemove(product.id)}
				disabled={disabled}
			>
				<Trash2Icon />
			</Button>
		</Stack>
	)
}
