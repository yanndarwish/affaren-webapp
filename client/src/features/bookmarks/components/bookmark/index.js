import { useState, useRef, useEffect } from "react"
import { Trash2Icon } from "lucide-react"

import { Stack } from "@mui/material"

import { useConfig } from "../../../../lib/hooks/useConfig"

import { Button } from "../../../../components/ui/button"
import { Typography } from "../../../../components/ui/typography"
import { SaleDetails } from "../../../../components/SALES/details"

export const Bookmark = ({ bookmark, isSelected, onSelect, onRemove }) => {
	const { config } = useConfig()
	const contentRef = useRef(null)
	const [contentHeight, setContentHeight] = useState(0)

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (contentRef.current) {
				setContentHeight(contentRef.current.scrollHeight)
			}
		}, 50)

		return () => clearTimeout(timeoutId)
	}, [bookmark, isSelected])

	return (
		<Stack spacing={1} className="rounded-md overflow-hidden">
			<Stack
				direction="row"
				className={`justify-between items-center text-slate-700 ${
					isSelected ? "bg-slate-900 rounded-md" : ""
				}`}
				onClick={onSelect}
			>
				<Stack
					direction="row"
					className={`items-center space-x-2 ${isSelected ? "text-white" : ""}`}
				>
					<p
						className={`text-sm p-2 font-medium ${
							isSelected ? "bg-slate-900" : "bg-slate-100"
						} rounded-full w-8 h-8 flex items-center justify-center`}
					>
						{bookmark.number}
					</p>
					{bookmark.name && (
						<p className="text-sm p-2 truncate text-ellipsis max-w-[100px]">
							{bookmark.name}
						</p>
					)}
				</Stack>
				<Stack
					direction="row"
					className="justify-between items-center space-x-2 "
				>
					<Stack
						direction="row"
						className={`items-center ${isSelected ? "text-white" : ""}`}
					>
						<Typography variant="large">{bookmark.sale.amount}</Typography>
						<config.general.currency.symbol className="w-4 h-4" />
					</Stack>
					<Button size="icon" onClick={onRemove}>
						<Trash2Icon />
					</Button>
				</Stack>
			</Stack>

			<Stack
				className="transition-all duration-300 overflow-hidden"
				style={{
					height: isSelected ? `${contentHeight}px` : "0px",
					marginTop: isSelected ? "10px" : "0px",
				}}
			>
				<div ref={contentRef}>
					<Stack
						direction="row"
						className="justify-between items-center space-x-2"
					>
						<Stack
							direction="row"
							className="justify-between items-center p-2 space-x-2 bg-slate-100 rounded-md w-full"
						>
							<p className="text-sm font-medium">Products</p>
							<p className="text-sm font-medium">
								{bookmark.sale.products.length}
							</p>
						</Stack>
						<Stack
							direction="row"
							className="justify-between items-center p-2 space-x-2 bg-slate-100 rounded-md w-full"
						>
							<p className="text-sm font-medium">Items</p>
							<p className="text-sm font-medium">
								{bookmark.sale.products.reduce(
									(acc, product) => acc + product.quantity,
									0
								)}
							</p>
						</Stack>
					</Stack>
					<SaleDetails sale={bookmark.sale} readOnly />
				</div>
			</Stack>
		</Stack>
	)
}
