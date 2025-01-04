import { Stack } from "@mui/material"

export const Stat = ({ icon, value, accent = false, border = true, extra }) => {
	return (
		<article
			className={`flex items-center gap-4 ${
				border ? "border border-gray-100 bg-white p-4" : ""
			}`}
		>
			<span className="rounded-full border border-gray-100 p-2">{icon}</span>

			<div>
				<Stack direction="row" alignItems="center" spacing={0.5}>
					<p
						className={`text-xl font-normal ${
							accent ? "text-slate-900" : "text-slate-400"
						}`}
					>
						{value}
					</p>
					{extra && extra}
				</Stack>
			</div>
		</article>
	)
}
