export const getAmount = (products) => {
	const amount = products.reduce((acc, product) => {
		return acc + parseFloat(product.price * product.quantity)
	}, 0)
	return amount.toFixed(2)
}

export const roundToTwo = (number) => {
	return Math.round((number + Number.EPSILON) * 100) / 100
}

const calculateTaxes = (details, product, taxRate) => {
	const totalProductPrice = roundToTwo(product.price * product.quantity)
	const taxRateMultiplier = 1 + taxRate / 100
	const ht = roundToTwo(totalProductPrice / taxRateMultiplier)
	const tva = roundToTwo(totalProductPrice - ht)

	const taxKey = `tva${getTaxIndex(taxRate)}`
	const htKey = `ht${getTaxIndex(taxRate)}`
	const totalKey = `total${getTaxIndex(taxRate)}`

	return {
		...details,
		[taxKey]: details[taxKey]
			? roundToTwo(details[taxKey] + tva)
			: roundToTwo(tva),
		[htKey]: details[htKey] ? roundToTwo(details[htKey] + ht) : roundToTwo(ht),
		[totalKey]: details[totalKey]
			? roundToTwo(details[totalKey] + totalProductPrice)
			: roundToTwo(totalProductPrice),
		totalTva: details.totalTva
			? roundToTwo(details.totalTva + tva)
			: roundToTwo(tva),
		totalHt: details.totalHt
			? roundToTwo(details.totalHt + ht)
			: roundToTwo(ht),
	}
}

const getTaxIndex = (taxRate) => {
	switch (taxRate) {
		case 5.5:
			return 1
		case 2.1:
			return 2
		case 20:
			return 3
		default:
			return 1
	}
}

export const updateTaxes = (products) => {
	let taxesDetails = {}

	products.forEach((product) => {
		const taxRate = parseFloat(product.taxe)
		if (taxRate === 5.5 || taxRate === 2.1 || taxRate === 20) {
			taxesDetails = calculateTaxes(taxesDetails, product, taxRate)
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
		const quantity =
			sale.products.find((p) => p.id === product.productId)?.quantity || 0
		return acc + product.originalPrice * quantity
	}, 0)

	// Sum up prices of products that are NOT in the discount array
	const sumOfOriginalPrices = sale.products.reduce((acc, product) => {
		if (!discountedProductIds.has(product.id)) {
			const quantity =
				sale.products.find((p) => p.id === product.id)?.quantity || 0
			return acc + product.price * quantity
		}
		return acc
	}, 0)

	return roundUpToTwoDecimals(sumOfOriginalPrices + sumOfDiscountedPrices)
}

export const getTotalReduction = (sale) => {
	return roundUpToTwoDecimals(
		sale.discount.reduce((acc, product) => {
			const quantity =
				sale.products.find((p) => p.id === product.productId)?.quantity || 0
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
