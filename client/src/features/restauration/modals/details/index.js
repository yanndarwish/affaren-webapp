import { Modal } from "../../../../components/shared/modal"
import { TableDetails } from "../../table/details"

export const ModalTableDetails = ({ controller }) => {
	const { table, uuid } = controller.data

	return (
		<Modal
			title={`Table ${table?.id}`}
			open={controller.open}
			handleClose={controller.closeModal}
			className="!w-[90%] !h-full"
		>
			<TableDetails
				table={table}
				uuid={uuid}
				onSuccess={controller.closeModal}
			/>
		</Modal>
	)
}
