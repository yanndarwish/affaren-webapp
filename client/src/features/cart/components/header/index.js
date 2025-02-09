import { Stack } from "@mui/material"
import { BadgePercent, Trash2Icon, Undo2, BookmarkPlus } from "lucide-react"

import { useConfig } from "../../../../lib/hooks/useConfig"

import { Button } from "../../../../components/ui/button"
import { CardHeader, CardTitle } from "../../../../components/ui/card"

export const CartHeader = ({
	sale,
	onRefund,
	onBookmark,
	onDiscount,
	onClear,
}) => {
	const { isActiveComponent } = useConfig()

	return (
		<CardHeader className="sticky top-0">
			<Stack direction="row" className="space-x-4 justify-between">
				<CardTitle>Shopping Cart</CardTitle>
				<Stack direction="row" spacing={2}>
					{isActiveComponent("pos", "refund") && (
						<Button
							onClick={onRefund}
							variant="outline"
							disabled={sale.products.length > 0}
						>
							<Undo2 />
						</Button>
					)}
					{isActiveComponent("pos", "bookmarks") && (
						<Button
							onClick={onBookmark}
							variant="outline"
							disabled={sale.products.length === 0}
						>
							<BookmarkPlus />
						</Button>
					)}
					{isActiveComponent("pos", "discount") && (
						<Button
							onClick={onDiscount}
							disabled={sale.products.length === 0}
							variant="outline"
						>
							<BadgePercent />
						</Button>
					)}
					<Button onClick={onClear} variant="destructive">
						<Trash2Icon />
					</Button>
				</Stack>
			</Stack>
		</CardHeader>
	)
}
