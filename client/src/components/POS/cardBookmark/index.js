import { useState } from "react"
import { BookmarkX, Trash2Icon } from "lucide-react"

import { Stack } from "@mui/material"
import { Button } from "../../ui/button"
import { SaleDetails } from "../../SALES/details"
import { CardTitle, CardHeader, CardFooter, CardContent } from "../../ui/card"

import { useSale } from "../../../lib/providers/sale"
import { useNotify } from "../../../lib/hooks/useNotify"
import { Separator } from "../../ui/separator"
import { Modal, useModal } from "../../shared/modal"
import { useConfig } from "../../../lib/hooks/useConfig"

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

	return (
		<Stack spacing={2} className="rounded-md overflow-hidden">
			<Stack
				direction="row"
				className="justify-between items-center  text-slate-700"
				onClick={onSelect}
			>
				<Stack direction="row" className="items-center space-x-2">
					<p className="text-sm p-2 font-medium bg-slate-100 rounded-full w-8 h-8 flex items-center justify-center">
						{bookmark.number}
					</p>
					{bookmark.name && <p className="text-sm p-2">{bookmark.name}</p>}
				</Stack>
				<Stack
					direction="row"
					className="justify-between items-center space-x-2 "
				>
					<Stack direction="row" spacing={1} className="items-center">
						<p className="text-sm">{bookmark.sale.amount}</p>
						<config.general.currency.symbol className="w-4 h-4" />
					</Stack>
					<Button size="icon" onClick={onRemove}>
						<Trash2Icon />
					</Button>
				</Stack>
			</Stack>
			{isSelected && (
				<Stack>
					<SaleDetails sale={bookmark.sale} readOnly />
				</Stack>
			)}
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
