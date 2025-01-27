import { useSidebar } from "../../ui/sidebar"
import { useEffect, useState } from "react"

export const PageContainer = ({ className, children }) => {
	const { open } = useSidebar()
	const [windowHeight, setWindowHeight] = useState(window.innerHeight)

	useEffect(() => {
		const handleResize = () => {
			setWindowHeight(window.innerHeight)
		}

		window.addEventListener("resize", handleResize)
		// Also handle orientation changes on mobile
		window.addEventListener("orientationchange", handleResize)

		return () => {
			window.removeEventListener("resize", handleResize)
			window.removeEventListener("orientationchange", handleResize)
		}
	}, [])

	return (
		<div
			className={`transition-all duration-300 overflow-hidden ${className}`}
			style={{
				height: `${windowHeight - (open ? 80 : 64)}px`,
			}}
		>
			{children}
		</div>
	)
}

export const FixedContainer = ({ className, children }) => {
	const { open } = useSidebar()
	const [windowHeight, setWindowHeight] = useState(window.innerHeight)

	useEffect(() => {
		const handleResize = () => {
			setWindowHeight(window.innerHeight)
		}

		window.addEventListener("resize", handleResize)
		window.addEventListener("orientationchange", handleResize)

		return () => {
			window.removeEventListener("resize", handleResize)
			window.removeEventListener("orientationchange", handleResize)
		}
	}, [])

	return (
		<div
			className={`transition-all duration-300 overflow-hidden ${className}`}
			style={{
				height: `${windowHeight - (open ? 80 : 64)}px`,
			}}
		>
			<div className="h-full scroll-smooth overflow-y-auto">{children}</div>
		</div>
	)
}
