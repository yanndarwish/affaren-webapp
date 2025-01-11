export const getMonth = (currentView, viewedDate) => {
	return currentView === "dayGridMonth" && viewedDate.getDate() !== 1
		? viewedDate.getMonth() + 2 > 12
			? viewedDate.getMonth() + 2 - 12
			: viewedDate.getMonth() + 2
		: viewedDate.getMonth() + 1
}

export const getYear = (currentView, viewedDate) => {
	return currentView === "dayGridMonth" && viewedDate.getDate() !== 1
		? viewedDate.getMonth() + 2 > 12
			? viewedDate.getFullYear() + 1
			: viewedDate.getFullYear()
		: viewedDate.getFullYear()
}
