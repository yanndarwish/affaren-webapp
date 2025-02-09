import { useState } from "react"

import { useSale } from "../../../lib/providers/sale"
import { useNotify } from "../../../lib/hooks/useNotify"
import { useModal } from "../../../components/shared/modal"

export const useBookmarks = ({ onBookmark = () => null }) => {
	const [selectedBookmark, setSelectedBookmark] = useState(null)

	const sale = useSale()
	const modalBookmark = useModal()
	const modalDeleteBookmarks = useModal()
	const { notifyInfo, notifySuccess } = useNotify()

	const handleSaveToBookmarks = (name, number) => {
		sale.saveToBookmarks({ name, number })
		notifyInfo("Sale saved to bookmarks")
		onBookmark()
		sale.resetSale()
	}

	const handleApplyBookmark = () => {
		sale.applyBookmark(selectedBookmark)
		notifySuccess("Bookmark applied")
	}

	const handleRemoveBookmark = (bookmarkId) => {
		sale.removeBookmark(bookmarkId)
		notifySuccess("Bookmark removed")
	}

	const handleClearBookmarks = () => {
		modalDeleteBookmarks.openModal()
	}

	const handleConfirmClearBookmarks = () => {
		sale.clearBookmarks()
		notifySuccess("Bookmarks cleared")
		modalDeleteBookmarks.closeModal()
	}

	const handleSelectBookmark = (bookmarkId) => {
		if (selectedBookmark === bookmarkId) {
			setSelectedBookmark(null)
		} else {
			setSelectedBookmark(bookmarkId)
		}
	}

	return {
		selectedBookmark,
		modalBookmark,
		modalDeleteBookmarks,
		handleSaveToBookmarks,
		handleApplyBookmark,
		handleRemoveBookmark,
		handleClearBookmarks,
		handleSelectBookmark,
		handleConfirmClearBookmarks,
	}
}
