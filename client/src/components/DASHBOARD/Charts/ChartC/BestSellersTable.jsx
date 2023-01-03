import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material"

const BestSellersTable = ({ data }) => {
	return (
		<TableContainer component={Paper}>
			<Table id="detail-table" sx={{ minWidth: 350  }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Id</TableCell>
						<TableCell >Name</TableCell>
						<TableCell align="right" >N° of Sales</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data &&
						data.map((row) => (
							<TableRow
								key={row.product_id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{row.product_id}
								</TableCell>
								<TableCell >{row.product_name}</TableCell>
								<TableCell  align="right">{row.product_quantity}</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default BestSellersTable
