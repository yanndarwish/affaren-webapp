import { useState, useRef } from "react"

const PRESS_TIMEOUT = 600
const RESET_TIMEOUT = 500

export default function useLongPress() {
	const [action, setAction] = useState('none')
	const timerRef = useRef()

	function startPressTimer() {
		timerRef.current = setTimeout(() => {
			setAction('longpress')
			setTimeout(() => setAction('none'), RESET_TIMEOUT)
		}, PRESS_TIMEOUT)
	}

	function handleOnClick() {
		clearTimeout(timerRef.current)
		setAction('click')
	}

	function handleOnTouchStart() {
		startPressTimer()
	}

	function handleOnTouchEnd() {
		if (action === 'longpress') return
		clearTimeout(timerRef.current)
		setAction('none')
	}

	return {
		action,
		handlers: {
			onClick: handleOnClick,
			onTouchStart: handleOnTouchStart,
			onTouchEnd: handleOnTouchEnd,
			onMouseDown: handleOnTouchStart,
			onMouseUp: handleOnTouchEnd,
		},
	}
}
