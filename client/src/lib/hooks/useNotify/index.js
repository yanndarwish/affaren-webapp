import Toastify from "toastify-js"

const baseOptions = {
	duration: 2000,
	close: true,
	position: "center",
	style: {
		borderRadius: "5px",
	},
}

export const useNotify = () => {
	const notifySuccess = (message) => {
		Toastify({
			...baseOptions,
			text: message,
			className: "success",
			style: {
				...baseOptions.style,
				background: "#25C564",
			},
		}).showToast()
	}

	const notifyError = (message, onClick = () => null) => {
		Toastify({
			...baseOptions,
			text: message,
			className: "error",
			style: {
				...baseOptions.style,
				background: "#FB1B00",
			},
			onClick: onClick,
		}).showToast()
	}

	const notifyInfo = (message) => {
		Toastify({
			...baseOptions,
			text: message,
			className: "info",
			style: {
				...baseOptions.style,
				background: "#23A5EA",
			},
		}).showToast()
	}

	const notifyWarning = (message) => {
		Toastify({
			...baseOptions,
			text: message,
			className: "warning",
			style: {
				borderRadius: "5px",
				background: "#FB923B",
			},
		}).showToast()
	}

	return { notifySuccess, notifyError, notifyInfo, notifyWarning }
}
