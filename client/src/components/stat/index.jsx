export const Stat = ({ icon, value, border = true }) => {
	return (
		<article
			className={`flex items-center gap-4 ${
				border ? "border border-gray-100 bg-white p-4" : ""
			}`}
		>
			<span className="rounded-md">{icon}</span>

			<div>
				<p className="text-xl font-medium text-gray-900">{value}</p>
			</div>
		</article>
	)
}
