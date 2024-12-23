import { useState } from "react"
import { BookmarkX, Trash2Icon } from "lucide-react"

import { Stack } from "@mui/material"
import { Button } from "../../ui/button"
import { SaleDetails } from "../../SALES/details"
import { CardTitle, CardHeader, CardFooter, CardContent } from "../../ui/card"

import { useSale } from "../../../lib/providers/sale"
import { useNotify } from "../../../lib/hooks/useNotify"
import { Separator } from "../../ui/separator"

export const CardBookmark = () => {
	const { notifySuccess } = useNotify()
	const [selected, setSelected] = useState(null)
	const { bookmarks, applyBookmark, clearBookmarks, removeBookmark } = useSale()

	const handleApplyBookmark = () => {
		applyBookmark(selected)
		notifySuccess("Bookmark applied")
	}

	const handleRemoveBookmark = (bookmarkId) => {
		removeBookmark(bookmarkId)
		notifySuccess("Bookmark removed")
	}

	const handleClearBookmarks = () => {
		clearBookmarks()
		notifySuccess("Bookmarks cleared")
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
			<CardHeader>
				<CardTitle>
					<Stack direction="row" className="justify-between">
						Bookmarks
						{Object.keys(bookmarks).length > 0 && (
							<Button onClick={handleClearBookmarks} variant="destructive">
								<Trash2Icon />
							</Button>
						)}
					</Stack>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2">
				{Object.keys(bookmarks).length === 0 ? (
					<div className="flex flex-col items-center justify-center space-y-8 h-[55vh]">
						<BookmarkX className="w-10 h-10 text-gray-200" />
						<p className="text-md text-gray-500">No bookmarks</p>
					</div>
				) : (
					<div className="space-y-4 ">
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
					</div>
				)}
			</CardContent>
			<CardFooter className="flex justify-center absolute bottom-0 w-full">
				<Button
					className="w-full"
					onClick={handleApplyBookmark}
					disabled={selected === null}
				>
					Apply Bookmark
				</Button>
			</CardFooter>
		</>
	)
}

const Bookmark = ({ bookmark, isSelected, onSelect, onRemove }) => {
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
					<p className="text-sm p-2">{bookmark.sale.amount}€</p>
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
