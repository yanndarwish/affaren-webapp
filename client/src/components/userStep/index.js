import { Stack } from "@mui/material"
import { Typography } from "../ui/typography"

export const UserStep = ({ number, title, description, children }) => {
	return (
		<div className="rounded-md border border-gray-100 bg-white p-4 space-y-4 w-full">
			<article className="flex gap-4">
				<Typography
					variant="lead"
					className="p-2 w-12 h-12 flex items-center justify-center rounded-sm bg-slate-100 text-center"
				>
					{number}
				</Typography>
				<Stack
					alignItems="flex-start"
					justifyContent="space-between"
					className="h-full gap-2"
				>
					<Typography variant="h3" className="leading-none">
						{title}
					</Typography>
					<Typography variant="muted" className="text-md leading-none">
						{description}
					</Typography>
				</Stack>
			</article>
			<div>{children}</div>
		</div>
	)
}
