export const Stat = ({ icon, value, accent = false,border = true }) => {
	return (
		<article
			className={`flex items-center gap-4 ${
				border ? "border border-gray-100 bg-white p-4" : ""
			}`}
		>
			<span className="rounded-full border border-gray-100 p-2">{icon}</span>

			<div>
				<p
					className={`text-xl font-normal ${
						accent ? "text-slate-900" : "text-slate-400"
					}`}
				>
					{value}
				</p>
			</div>
		</article>
	)
}
