import { Stack } from "@mui/material"

export const SaleTaxeSummary = ({ taxes, detailed = false }) => {
	if (!taxes) return null

	// Helper function to format numbers
	const formatNumber = (num) => Number(num).toFixed(2) + " €"

	// Group the tax data
	const groupedTaxes = {
		rate5_5: [
			{ label: "TVA 5.5%", value: taxes.tva1 },
			{ label: "HT 5.5%", value: taxes.ht1 },
			{ label: "Total 5.5%", value: taxes.total1 },
		].filter((tax) => tax.value),

		rate2_1: [
			{ label: "TVA 2.1%", value: taxes.tva2 },
			{ label: "HT 2.1%", value: taxes.ht2 },
			{ label: "Total 2.1%", value: taxes.total2 },
		].filter((tax) => tax.value),

		rate20: [
			{ label: "TVA 20%", value: taxes.tva3 },
			{ label: "HT 20%", value: taxes.ht3 },
			{ label: "Total 20%", value: taxes.total3 },
		].filter((tax) => tax.value),

		totals: [
			{ label: "Total HT", value: taxes.totalHt },
			{ label: "Total TVA", value: taxes.totalTva },
		].filter((tax) => tax.value),
	}

	return (
		<Stack direction="column" spacing={2}>
			{/* Total Section */}

			<Stack direction="column" spacing={2}>
				{/* 5.5% Section */}
				{detailed && groupedTaxes.rate5_5.length > 0 && (
					<Stack
						direction="row"
						spacing={2}
						justifyContent="space-between"
						className="border border-gray-100 rounded-lg p-2 w-full"
					>
						{groupedTaxes.rate5_5.map((tax) => (
							<Stack
								key={tax.label}
								spacing={1}
								alignItems="center"
								justifyContent="center"
								className="w-full"
							>
								<p className="text-sm text-gray-500">{tax.label}</p>
								<p className="text-sm font-medium">{formatNumber(tax.value)}</p>
							</Stack>
						))}
					</Stack>
				)}

				{/* 2.1% Section */}
				{detailed && groupedTaxes.rate2_1.length > 0 && (
					<Stack
						direction="row"
						spacing={2}
						justifyContent="space-between"
						className="border border-gray-100 rounded-lg p-2 w-full"
					>
						{groupedTaxes.rate2_1.map((tax) => (
							<Stack
								key={tax.label}
								spacing={1}
								alignItems="center"
								justifyContent="center"
								className="w-full"
							>
								<p className="text-sm text-gray-500">{tax.label}</p>
								<p className="text-sm font-medium">{formatNumber(tax.value)}</p>
							</Stack>
						))}
					</Stack>
				)}
			</Stack>

			{/* 20% Section */}
			{detailed && groupedTaxes.rate20.length > 0 && (
				<Stack
					direction="row"
					spacing={2}
					justifyContent="space-between"
					className="border border-gray-100 rounded-lg p-2 w-full"
				>
					{groupedTaxes.rate20.map((tax) => (
						<Stack
							key={tax.label}
							spacing={1}
							alignItems="center"
							justifyContent="center"
							className="w-full"
						>
							<p className="text-sm text-gray-500">{tax.label}</p>
							<p className="text-sm font-medium">{formatNumber(tax.value)}</p>
						</Stack>
					))}
				</Stack>
			)}

			{groupedTaxes.totals.length > 0 && (
				<Stack direction="row" spacing={2} >
					{groupedTaxes.totals.map((tax) => (
						<Stack
							key={tax.label}
							direction="row"
							spacing={1}
							justifyContent="space-between"
							className="border border-gray-100 rounded-lg p-2 w-full"
						>
							<p className="text-sm font-bold">{tax.label}</p>
							<p className="text-sm font-bold">{formatNumber(tax.value)}</p>
						</Stack>
					))}
				</Stack>
			)}
		</Stack>
	)
}
