import { BookmarkX } from "lucide-react"

import { Stack } from "@mui/material"

import { useSale } from "../../../../lib/providers/sale"

import { Button } from "../../../../components/ui/button"
import { Separator } from "../../../../components/ui/separator"

import { Bookmark } from "../bookmark"
import { useBookmarks } from "../../hooks/use-bookmarks"
import { ModalDeleteAllBookmarks } from "../modals/delete"

export const BookmarkContainer = () => {
	const { bookmarks } = useSale()
	const {
		selectedBookmark,
		modalDeleteBookmarks,
		handleApplyBookmark,
		handleRemoveBookmark,
		handleClearBookmarks,
		handleSelectBookmark,
		handleConfirmClearBookmarks,
	} = useBookmarks({})

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
									isSelected={selectedBookmark === bookmarkId}
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
						disabled={selectedBookmark === null}
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
