import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setDetailArray } from "../../../redux/features/dashboard"
import * as XLSX from "xlsx/xlsx.mjs"
import { SpaceHeader, SubTitle } from "../../../assets/common/common.styles"
import Button from "../../common/Button/Button.component"

const DetailTable = ({ data, months, month, year }) => {
	const detailArray = useSelector((state) => state.dashboard.detailArray)
	const dispatch = useDispatch()

	const exportToExcel = () => {
		let wb = XLSX.utils.table_to_book(document.getElementById("detail-table"))
		XLSX.writeFile(wb, `${year}-${month}.xlsx`)
	}

	const formatData = (data) => {
		let days = []
		let detail = []

		data?.forEach((item) => {
			if (!days.includes(item.sale_day)) {
				days.push(item.sale_day)
				let day = {
					day: item.sale_day,
					alimentation: item.sale_taxes.total1
						? parseFloat(item.sale_taxes.total1)
						: 0,
					magazine: item.sale_taxes.total2
						? parseFloat(item.sale_taxes.total2)
						: 0,
					decoAlcool: item.sale_taxes.total3
						? parseFloat(item.sale_taxes.total3)
						: 0,
					htAlimentation: item.sale_taxes.ht1
						? parseFloat(item.sale_taxes.ht1)
						: 0,
					htMagazine: item.sale_taxes.ht2 ? parseFloat(item.sale_taxes.ht2) : 0,
					htDecoAlcool: item.sale_taxes.ht3
						? parseFloat(item.sale_taxes.ht3)
						: 0,
					tvaAlimentation: item.sale_taxes.tva1
						? parseFloat(item.sale_taxes.tva1)
						: 0,
					tvaMagazine: item.sale_taxes.tva2
						? parseFloat(item.sale_taxes.tva2)
						: 0,
					tvaDecoAlcool: item.sale_taxes.tva3
						? parseFloat(item.sale_taxes.tva3)
						: 0,
					totalHt: item.sale_taxes.totalHt
						? parseFloat(item.sale_taxes.totalHt)
						: 0,
					totalTva: item.sale_taxes.totalTva
						? parseFloat(item.sale_taxes.totalTva)
						: 0,
					cash: item.sale_payment_methods.cash
						? parseFloat(item.sale_payment_methods.cash)
						: 0,
					carte: item.sale_payment_methods.card
						? parseFloat(item.sale_payment_methods.card)
						: 0,
					cheque: item.sale_payment_methods.check
						? parseFloat(item.sale_payment_methods.check)
						: 0,
					total: item.sale_amount ? parseFloat(item.sale_amount) : 0,
				}
				detail.push(day)
			} else {
				detail[detail.length - 1].alimentation += item.sale_taxes.total1
					? parseFloat(item.sale_taxes.total1)
					: 0
				detail[detail.length - 1].magazine += item.sale_taxes.total2
					? parseFloat(item.sale_taxes.total2)
					: 0
				detail[detail.length - 1].decoAlcool += item.sale_taxes.total3
					? parseFloat(item.sale_taxes.total3)
					: 0
				detail[detail.length - 1].htAlimentation += item.sale_taxes.ht1
					? parseFloat(item.sale_taxes.ht1)
					: 0
				detail[detail.length - 1].htMagazine += item.sale_taxes.ht2
					? parseFloat(item.sale_taxes.ht2)
					: 0
				detail[detail.length - 1].htDecoAlcool += item.sale_taxes.ht3
					? parseFloat(item.sale_taxes.ht3)
					: 0
				detail[detail.length - 1].tvaAlimentation += item.sale_taxes.tva1
					? parseFloat(item.sale_taxes.tva1)
					: 0
				detail[detail.length - 1].tvaMagazine += item.sale_taxes.tva2
					? parseFloat(item.sale_taxes.tva2)
					: 0
				detail[detail.length - 1].tvaDecoAlcool += item.sale_taxes.tva3
					? parseFloat(item.sale_taxes.tva3)
					: 0
				detail[detail.length - 1].totalHt += item.sale_taxes.totalHt
					? parseFloat(item.sale_taxes.totalHt)
					: 0
				detail[detail.length - 1].totalTva += item.sale_taxes.totalTva
					? parseFloat(item.sale_taxes.totalTva)
					: 0
				detail[detail.length - 1].cash += item.sale_payment_methods.cash
					? parseFloat(item.sale_payment_methods.cash)
					: 0
				detail[detail.length - 1].carte += item.sale_payment_methods.card
					? parseFloat(item.sale_payment_methods.card)
					: 0
				detail[detail.length - 1].cheque += item.sale_payment_methods.check
					? parseFloat(item.sale_payment_methods.check)
					: 0
				detail[detail.length - 1].total += item.sale_amount
					? parseFloat(item.sale_amount)
					: 0
			}
		})
		detail = detail.sort((a, b) => a.day - b.day)
		dispatch(setDetailArray({ detailArray: detail }))
	}

	useEffect(() => {
		formatData(data)
	}, [data])
	return (
		<>
			<SpaceHeader>
				<SubTitle>{months[month - 1]}'s Details</SubTitle>
				<Button title="Export" onClick={exportToExcel} />
			</SpaceHeader>
			<TableContainer component={Paper}>
				<Table
					id="detail-table"
					sx={{ minWidth: 650 }}
					aria-label="simple table"
				>
					<TableHead>
						<TableRow>
							<TableCell>Date</TableCell>
							<TableCell align="right">Alimentation</TableCell>
							<TableCell align="right">Magazine</TableCell>
							<TableCell align="right">Déco/Alcool</TableCell>
							<TableCell align="right">HT Alimentation</TableCell>
							<TableCell align="right">HT Magazine</TableCell>
							<TableCell align="right">HT Déco/Alcool</TableCell>
							<TableCell align="right">TVA Alimentation</TableCell>
							<TableCell align="right">TVA Magazine</TableCell>
							<TableCell align="right">TVA Déco/Alcool</TableCell>
							<TableCell align="right">Cash</TableCell>
							<TableCell align="right">Carte</TableCell>
							<TableCell align="right">Chèque</TableCell>
							<TableCell align="right">Total</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{detailArray &&
							detailArray.map((row) => (
								<TableRow
									key={row.day}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{row.day}
									</TableCell>
									<TableCell align="right">
										{row.alimentation.toFixed(2)}
									</TableCell>
									<TableCell align="right">{row.magazine.toFixed(2)}</TableCell>
									<TableCell align="right">
										{row.decoAlcool.toFixed(2)}
									</TableCell>
									<TableCell align="right">
										{row.htAlimentation.toFixed(2)}
									</TableCell>
									<TableCell align="right">
										{row.htMagazine.toFixed(2)}
									</TableCell>
									<TableCell align="right">
										{row.htDecoAlcool.toFixed(2)}
									</TableCell>
									<TableCell align="right">
										{row.tvaAlimentation.toFixed(2)}
									</TableCell>
									<TableCell align="right">
										{row.tvaMagazine.toFixed(2)}
									</TableCell>
									<TableCell align="right">
										{row.tvaDecoAlcool.toFixed(2)}
									</TableCell>
									<TableCell align="right">{row.cash.toFixed(2)}</TableCell>
									<TableCell align="right">{row.carte.toFixed(2)}</TableCell>
									<TableCell align="right">{row.cheque.toFixed(2)}</TableCell>
									<TableCell align="right">{row.total.toFixed(2)}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}

export default DetailTable
