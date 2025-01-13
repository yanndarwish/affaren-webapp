import { Stack } from "@mui/material"
import { useNotify } from "../../../lib/hooks/useNotify"
import { Typography } from "../../../components/ui/typography"
import { RestaurationSettingsForm } from "./form"

export const RestaurationSettings = ({ onSuccess = () => null }) => {
	const { notifySuccess } = useNotify()

	const handleSuccess = () => {
		notifySuccess("Restauration settings updated successfully")
		onSuccess()
	}

	return (
		<Stack direction="column" spacing={2}>
			<Typography variant="muted">
				Here you can manage the base settings of your restauration system. They
				will be used to display relevant information about your business
				capacity.
			</Typography>
			<Stack direction="column" spacing={2}>
				<RestaurationSettingsForm onSuccess={handleSuccess} />
			</Stack>
		</Stack>
	)
}
