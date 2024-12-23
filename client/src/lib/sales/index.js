export function formatDailyTotals(payments) {
	// Initialize the result object with payment methods set to 0
	let dailyTotals = {
		card: 0,
		cash: 0,
		check: 0,
		total: 0,
	}

	if (!payments) return dailyTotals

	// Iterate over the array of payment objects
	payments.forEach((payment) => {
		// Iterate over the keys in the sale_payment_methods object
		for (const [method, amount] of Object.entries(
			payment.sale_payment_methods
		)) {
			// Check if the payment method exists in the dailyTotals object
			if (dailyTotals.hasOwnProperty(method)) {
				// Add the amount to the corresponding payment method total
				dailyTotals[method] += amount
			}
		}
	})

	
	dailyTotals.total = dailyTotals.card + dailyTotals.cash + dailyTotals.check
	
	dailyTotals = {
		card: Math.round(dailyTotals.card * 100) / 100,
		cash: Math.round(dailyTotals.cash * 100) / 100,
		check: Math.round(dailyTotals.check * 100) / 100,
		total: Math.round(dailyTotals.total * 100) / 100,
	}

	return dailyTotals
}

export const formatSale = (sale) => {
	return {
		id: sale.sale_id,
		amount: sale.sale_amount,
		day: sale.sale_day,
		discount: sale.sale_discount,
		month: sale.sale_month,
		paymentMethods: sale.sale_payment_methods,
		products: sale.sale_products,
		taxes: sale.sale_taxes,
		user: sale.sale_user,
		year: sale.sale_year,
	}
}

export const formatSaleProducts = (products) => {
	return products.map((product) => {
		return {
			product_id: product.id,
			product_name: product.name,
			product_price: product.price,
			product_quantity: product.quantity,
			product_taxe: String(product.taxe),
		}
	})
}