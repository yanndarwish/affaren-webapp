import { useState, useRef, useEffect } from "react"
import { BookmarkX, Trash2Icon } from "lucide-react"

import { Stack } from "@mui/material"
import { Button } from "../../ui/button"
import { SaleDetails } from "../../SALES/details"

import { useSale } from "../../../lib/providers/sale"
import { useNotify } from "../../../lib/hooks/useNotify"
import { Separator } from "../../ui/separator"
import { Modal, useModal } from "../../shared/modal"
import { useConfig } from "../../../lib/hooks/useConfig"
import { Typography } from "../../ui/typography"

export const CardBookmark = () => {
	const { notifySuccess } = useNotify()
	const [selected, setSelected] = useState(null)
	const { bookmarks, applyBookmark, clearBookmarks, removeBookmark } = useSale()
	const modalDeleteBookmarks = useModal()

	const handleApplyBookmark = () => {
		applyBookmark(selected)
		notifySuccess("Bookmark applied")
	}

	const handleRemoveBookmark = (bookmarkId) => {
		removeBookmark(bookmarkId)
		notifySuccess("Bookmark removed")
	}

	const handleClearBookmarks = () => {
		modalDeleteBookmarks.openModal()
	}

	const handleConfirmClearBookmarks = () => {
		clearBookmarks()
		notifySuccess("Bookmarks cleared")
		modalDeleteBookmarks.closeModal()
	}

	const handleSelectBookmark = (bookmarkId) => {
		if (selected === bookmarkId) {
			setSelected(null)
		} else {
			setSelected(bookmarkId)
		}
	}

	return (
		<>
			<div className="flex flex-col h-full p-4 space-y-2 justify-between overflow-hidden">
				{Object.keys(bookmarks).length === 0 ? (
					<div className="flex flex-col items-center justify-center space-y-8 h-full">
						<BookmarkX className="w-10 h-10 text-gray-200" />
						<p className="text-md text-gray-500">No bookmarks</p>
					</div>
				) : (
					<Stack className="space-y-2 h-full overflow-y-auto">
						{Object.keys(bookmarks).map((bookmarkId, i) => (
							<Stack key={bookmarkId} className="space-y-4">
								<Bookmark
									bookmark={bookmarks[bookmarkId]}
									isSelected={selected === bookmarkId}
									onSelect={() => handleSelectBookmark(bookmarkId)}
									onRemove={() => handleRemoveBookmark(bookmarkId)}
								/>
								{i !== Object.keys(bookmarks).length - 1 && <Separator />}
							</Stack>
						))}
					</Stack>
				)}
				<Stack direction="row" className="w-full pt-2 space-x-4">
					<Button
						onClick={handleClearBookmarks}
						variant="destructive"
						className="w-full"
						disabled={Object.keys(bookmarks).length === 0}
					>
						Clear all
					</Button>
					<Button
						className="w-full"
						onClick={handleApplyBookmark}
						disabled={selected === null}
					>
						Apply Bookmark
					</Button>
				</Stack>
			</div>
			<ModalDeleteAllBookmarks
				controller={modalDeleteBookmarks}
				onConfirm={handleConfirmClearBookmarks}
			/>
		</>
	)
}

const Bookmark = ({ bookmark, isSelected, onSelect, onRemove }) => {
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

const ModalDeleteAllBookmarks = ({ controller, onConfirm = () => null }) => {
	return (
		<Modal
			open={controller.open}
			handleClose={controller.closeModal}
			title="Clear all bookmarks"
		>
			<Stack direction="column" spacing={4}>
				<p className="text-center text-lg font-medium text-gray-900">
					Are you sure you want to clear all bookmarks ?
				</p>
				<Stack direction="row" spacing={2}>
					<Button
						onClick={controller.closeModal}
						variant="outline"
						className="w-full"
					>
						Cancel
					</Button>
					<Button onClick={onConfirm} variant="destructive" className="w-full">
						Delete
					</Button>
				</Stack>
			</Stack>
		</Modal>
	)
}
