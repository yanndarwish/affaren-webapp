import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"

const Cart = () => {
	function createData(name, calories, fat, carbs, protein) {
		return { name, calories, fat, carbs, protein }
	}

	const rows = [
		createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
		createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
		createData("Eclair", 262, 16.0, 24, 6.0),
		createData("Cupcake", 305, 3.7, 67, 4.3),
		createData("Gingerbread", 356, 16.0, 49, 3.9),
		createData("Cupcake", 305, 3.7, 67, 4.3),
		createData("Gingerbread", 356, 16.0, 49, 3.9),
		createData("Cupcake", 305, 3.7, 67, 4.3),
		createData("Gingerbread", 356, 16.0, 49, 3.9),
	]

	return (
		<TableContainer component={Paper} sx={{ maxHeight: 280 }}>
			<Table
				stickyHeader
				sx={{ minWidth: 650 }}
				size="small"
				aria-label="simple table"
			>
				<TableHead>
					<TableRow>
						<TableCell>N°</TableCell>
						<TableCell>Name</TableCell>
						<TableCell align="right">Qty</TableCell>
						<TableCell align="right">Price</TableCell>
						<TableCell align="right">
							<DeleteOutlinedIcon />
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, i) => (
						<TableRow
							key={i}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{i+1}
							</TableCell>
							<TableCell>{row.name}</TableCell>
							<TableCell align="right">{row.calories}</TableCell>
							<TableCell align="right">{row.fat}</TableCell>
							<TableCell align="right">
								<DeleteOutlinedIcon />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default Cart
