export const UserStep = ({ number, title, description, children }) => {
	return (
		<div className="rounded-md border border-gray-100 bg-white p-4 space-y-4">
			<article className="flex items-center gap-4">
				<span className="p-2 w-10 h-10 rounded-sm bg-slate-100 text-black text-center">
					{number}
				</span>
				<div>
					<p className="text-xl font-medium text-gray-900">{title}</p>
					<p className="text-gray-500">{description}</p>
				</div>
			</article>
			<div>{children}</div>
		</div>
	)
}
