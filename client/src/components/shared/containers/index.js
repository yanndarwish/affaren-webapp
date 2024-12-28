import { useSidebar } from "../../ui/sidebar"

export const PageContainer = ({ className, children }) => {
	const { open } = useSidebar()

	return (
		<div
			className={`transition-all duration-300 ${
				open ? "h-[calc(100vh-80px)]" : "h-[calc(100vh-64px)]"
			} overflow-hidden ${className}`}
		>
			{children}
		</div>
	)
}

export const FixedContainer = ({ className, children }) => {
	const { open } = useSidebar()

	return (
		<div
			className={`transition-all duration-300 ${
				open ? "h-[calc(100vh-80px)]" : "h-[calc(100vh-64px)]"
			} overflow-hidden ${className}`}
		>
			<div className="h-full scroll-smooth overflow-y-auto">{children}</div>
		</div>
	)
}
