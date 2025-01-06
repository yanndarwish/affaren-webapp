export const getAmount = (products) => {
	const amount = products.reduce((acc, product) => {
		return acc + parseFloat(product.price * product.quantity)
	}, 0)
	return amount.toFixed(2)
}

export const updateTaxes = (products) => {
	let taxesDetails = {}
	products.forEach((product) => {
		let ht = (product.price / (1 + parseFloat(product.taxe) / 100)).toFixed(2)
		let tva = (product.price - ht).toFixed(2)
		switch (parseFloat(product.taxe)) {
			case 5.5:
				taxesDetails = {
					...taxesDetails,
					tva1: taxesDetails.tva1
						? (parseFloat(taxesDetails.tva1) + parseFloat(tva)).toFixed(2)
						: tva,
					ht1: taxesDetails.ht1
						? (parseFloat(taxesDetails.ht1) + parseFloat(ht)).toFixed(2)
						: ht,
					total1: taxesDetails.total1
						? (
								parseFloat(taxesDetails.total1) + parseFloat(product.price)
						  ).toFixed(2)
						: product.price,
					totalTva: taxesDetails.totalTva
						? (parseFloat(taxesDetails.totalTva) + parseFloat(tva)).toFixed(2)
						: tva,
					totalHt: taxesDetails.totalHt
						? (parseFloat(taxesDetails.totalHt) + parseFloat(ht)).toFixed(2)
						: ht,
				}
				break
			case 2.1:
				taxesDetails = {
					...taxesDetails,
					tva2: taxesDetails.tva2
						? (parseFloat(taxesDetails.tva2) + parseFloat(tva)).toFixed(2)
						: tva,
					ht2: taxesDetails.ht2
						? (parseFloat(taxesDetails.ht2) + parseFloat(ht)).toFixed(2)
						: ht,
					total2: taxesDetails.total2
						? (
								parseFloat(taxesDetails.total2) + parseFloat(product.price)
						  ).toFixed(2)
						: product.price,
					totalTva: taxesDetails.totalTva
						? (parseFloat(taxesDetails.totalTva) + parseFloat(tva)).toFixed(2)
						: tva,
					totalHt: taxesDetails.totalHt
						? (parseFloat(taxesDetails.totalHt) + parseFloat(ht)).toFixed(2)
						: ht,
				}
				break
			case 20:
				taxesDetails = {
					...taxesDetails,
					tva3: taxesDetails.tva3
						? (parseFloat(taxesDetails.tva3) + parseFloat(tva)).toFixed(2)
						: tva,
					ht3: taxesDetails.ht3
						? (parseFloat(taxesDetails.ht3) + parseFloat(ht)).toFixed(2)
						: ht,
					total3: taxesDetails.total3
						? (
								parseFloat(taxesDetails.total3) + parseFloat(product.price)
						  ).toFixed(2)
						: product.price,
					totalTva: taxesDetails.totalTva
						? (parseFloat(taxesDetails.totalTva) + parseFloat(tva)).toFixed(2)
						: tva,
					totalHt: taxesDetails.totalHt
						? (parseFloat(taxesDetails.totalHt) + parseFloat(ht)).toFixed(2)
						: ht,
				}
				break
			default:
		}
	})

	return taxesDetails
}

export const roundUpToTwoDecimals = (number) => {
	return (Math.round(number * 100) / 100).toFixed(2)
}

export const getTotalOriginalPrice = (sale) => {
	// Get all discounted product IDs for easier lookup
	const discountedProductIds = new Set(
		sale.discount.map((item) => item.productId)
	)

	// Sum up original prices from the discount array
	const sumOfDiscountedPrices = sale.discount.reduce((acc, product) => {
		// find quantity of product in sale.products
		const quantity = sale.products.find(
			(p) => p.id === product.productId
		)?.quantity || 0
		return acc + product.originalPrice * quantity
	}, 0)

	// Sum up prices of products that are NOT in the discount array
	const sumOfOriginalPrices = sale.products.reduce((acc, product) => {
		if (!discountedProductIds.has(product.id)) {
			const quantity = sale.products.find((p) => p.id === product.id)?.quantity || 0
			return acc + product.price * quantity
		}
		return acc
	}, 0)

	return roundUpToTwoDecimals(sumOfOriginalPrices + sumOfDiscountedPrices)
}

export const getTotalReduction = (sale) => {
	return roundUpToTwoDecimals(
		sale.discount.reduce((acc, product) => {
			const quantity = sale.products.find(
				(p) => p.id === product.productId
			)?.quantity || 0
			return acc + product.reduction * quantity
		}, 0)
	)
}

export const getTotalNewPrice = (products) => {
	return roundUpToTwoDecimals(
		products.reduce((acc, product) => acc + product.newPrice, 0)
	)
}

export const hasDiscount = (discount) => {
	return discount.some((item) => item.reduction !== 0)
}
