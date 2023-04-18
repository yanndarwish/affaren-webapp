const ThermalPrinter = require("node-thermal-printer").printer
const PrinterTypes = require("node-thermal-printer").types
// print ticket
const printTicket = async (req, res) => {
	const {
		id,
		amount,
		day,
		month,
		year,
		paymentMethods,
		discount,
		products,
		taxes,
		user,
	} = req.body

	try {
		let printer = new ThermalPrinter({
			type: PrinterTypes.EPSON,
			interface: "tcp://192.168.1.71",
		})

		let isConnected = await printer.isPrinterConnected()

		if (isConnected) {
			const getTime = () => {
				const date = new Date()
				const time = date.toLocaleTimeString()
				return time
			}

			let sortedTaxe = Object.keys(taxes).sort()
			let cashDiscount = discount.filter(
				(product) => product.discountType === "cash"
			)
			let percentDiscount = discount.filter(
				(product) => product.discountType === "percent"
			)
			let cashDiscountAmount = 0
			let percentDiscountAmount = 0
			cashDiscount.forEach((discount) => {
				cashDiscountAmount += discount.reduction
			})
			percentDiscount.forEach((discount) => {
				percentDiscountAmount += discount.reduction
			})

			printer.alignCenter()
			printer.println("Bienvenue chez")
			printer.setTextSize(2, 2)
			printer.println("AFFÄREN")
			printer.setTextNormal()
			printer.println("Välkommen")
			printer.newLine()
			printer.println("80 rue de Saussure 75017 Paris")
			printer.println("svenskaaffarenparis@gmail.com")
			printer.println("0142819175")
			printer.println("Mardi au samedi de 11h à 18h30")
			printer.println("Dimanche de 12h à 17h")
			printer.newLine()
			printer.println(`Date: ${day}/${month}/${year} ${getTime()}`)
			printer.println(`Caissier: ${user}`)
			printer.println("--------------------------------------")
			printer.alignCenter()
			printer.bold(true)
			printer.println(id)
			printer.newLine()
			printer.alignLeft()
			printer.bold(false)
			printer.tableCustom([
				{ text: "n°", align: "LEFT", width: 0.1, bold: true },
				{ text: "Produit", width: 0.5, bold: true },
				{ text: "Qté", width: 0.1, bold: true },
				{ text: "Prix", align: "RIGHT", width: 0.2, bold: true },
			])
			products.forEach((product, i) => {
				printer.tableCustom([
					{ text: `${i + 1}`, align: "LEFT", width: 0.1 },
					{
						text: `${
							product.name.length > 20
								? product.name.slice(0, 19) + "..."
								: product.name
						} `,
						width: 0.5,
					},
					{ text: `${product.quantity}`, width: 0.1 },
					{ text: `${product.price}`, align: "RIGHT", width: 0.2 },
				])
			})
			printer.newLine()
			printer.alignCenter()
			printer.println("--------------------------------------")
			printer.newLine()
			printer.alignLeft()
			printer.tableCustom([
				{ text: "", align: "LEFT", width: 0.1, bold: true },
				{
					text: `${
						products.length > 1
							? products.length + " articles"
							: products.length + " article"
					}`,
					width: 0.5,
					bold: true,
				},
			])
			printer.newLine()
			if (cashDiscount.length > 0) {
				printer.tableCustom([
					{ text: "", align: "LEFT", width: 0.2, bold: true },
					{
						text: `Réduction: ${cashDiscountAmount.toFixed(2)} €`,
						width: 0.5,
						bold: true,
					},
				])
			}
			if (percentDiscount.length > 0) {
				printer.tableCustom([
					{ text: "", align: "LEFT", width: 0.2, bold: true },
					{
						text: `Réduction: ${percentDiscountAmount.toFixed(2)} €`,
						width: 0.5,
						bold: true,
					},
				])
			}
			printer.setTextSize(1, 1)
			printer.tableCustom([
				{ text: "", align: "LEFT", width: 0.1, bold: true },
				{
					text: `TOTAL ${amount} €`,
					width: 0.5,
					bold: true,
				},
			])
			printer.setTextNormal()
			{
				if (paymentMethods !== "none") {
					printer.tableCustom([
						{ text: "", align: "LEFT", width: 0.1, bold: true },
						{
							text: `Payé en ${
								Object.keys(paymentMethods).length > 1
									? Object.keys(paymentMethods)[0] === "cash"
										? "ESPÈCES: " +
										  paymentMethods[Object.keys(paymentMethods)[0]] +
										  " €"
										: Object.keys(paymentMethods)[0] === "card"
										? "CARTE: " +
										  paymentMethods[Object.keys(paymentMethods)[0]] +
										  " €"
										: "CHÈQUE: " +
										  paymentMethods[Object.keys(paymentMethods)[0]] +
										  " €"
									: Object.keys(paymentMethods)[0] === "cash"
									? "ESPÈCES"
									: Object.keys(paymentMethods)[0] === "card"
									? "CARTE"
									: "CHÈQUE"
							}`,
							width: 0.5,
							bold: true,
						},
					])
					if (Object.keys(paymentMethods).length > 1) {
						printer.tableCustom([
							{ text: "", align: "LEFT", width: 0.1, bold: true },
							{
								text: `Payé en ${
									Object.keys(paymentMethods)[1] === "cash"
										? "ESPÈCES: " +
										  paymentMethods[Object.keys(paymentMethods)[1]] +
										  " €"
										: Object.keys(paymentMethods)[1] === "card"
										? "CARTE: " +
										  paymentMethods[Object.keys(paymentMethods)[1]] +
										  " €"
										: "CHÈQUE: " +
										  paymentMethods[Object.keys(paymentMethods)[1]] +
										  " €"
								}`,
								width: 0.5,
								bold: true,
							},
						])
					}
				}
			}
			printer.alignCenter()
			printer.println("--------------------------------------")
			printer.newLine()
			printer.alignLeft()
			sortedTaxe.forEach((key) => {
				let prop
				if (key === "total1") {
					prop = "Total alimentation"
				} else if (key === "total2") {
					prop = "Total magazine"
				} else if (key === "total3") {
					prop = "Total décoration"
				}
				if (key === "ht1") {
					prop = "HT alimentation"
				} else if (key === "ht2") {
					prop = "HT magazine"
				} else if (key === "ht3") {
					prop = "HT décoration"
				}
				if (key === "tva1") {
					prop = "TVA 5.5%"
				} else if (key === "tva2") {
					prop = "TVA 2.1%"
				} else if (key === "tva3") {
					prop = "TVA 20%"
				}
				if (key === "totalTva") {
					prop = "Total TVA"
				}
				if (key === "totalHt") {
					prop = "Total HT"
				}
				printer.tableCustom([
					{ text: "", align: "LEFT", width: 0.1 },
					{ text: prop, width: 0.5 },
					{ text: taxes[key], width: 0.3 },
				])
			})
			printer.newLine()
			printer.alignCenter()
			printer.println("--------------------------------------")
			printer.println("Merci de votre visite et à bientôt !")
			printer.println("Hejdå !")

			printer.cut()

			try {
				let execute = printer.execute()
				console.error("Print done!")
				res.status(200).send()
			} catch (error) {
				console.log("Print failed:", error)
				res.status(400).send("Print failed")
			}
		} else {
			res.status(400).send("Printer not connected")
		}
	} catch (err) {
		console.log(err)
		res.status(400).send("Print failed")
	}
}

// print cash detail ticket
const printCashTicket = async (req, res) => {
	const { user } = req.body
	try {
		let printer = new ThermalPrinter({
			type: PrinterTypes.EPSON,
			interface: "tcp://192.168.1.71",
		})

		let isConnected = await printer.isPrinterConnected()

		if (isConnected) {
			const getTime = () => {
				const date = new Date()
				const time = date.toLocaleTimeString()
				return time
			}

			const timestamp = new Date()

			const day = timestamp.getDate()
			const month = timestamp.getMonth() + 1
			const year = timestamp.getFullYear()

			printer.setTextSize(1, 1)
			printer.println(`Caissier: ${user}`)
			printer.println(`Date: ${day}/${month}/${year} ${getTime()}`)
			printer.newLine()
			printer.println(`20€  X      =`)
			printer.println(`10€  X      =`)
			printer.println(`5€   X      =`)
			printer.println(`2€   X      =`)
			printer.println(`1€   X      =`)
			printer.println(`0.5€ X      =`)
			printer.newLine()
			printer.println(`TOTAL`)

			printer.cut()

			try {
				let execute = printer.execute()
				console.error("Print done!")
				res.status(200).send()
			} catch (error) {
				console.log("Print failed:", error)
				res.status(400).send("Print failed")
			}
		} else {
			res.status(400).send("Printer not connected")
		}
	} catch (err) {
		console.log(err)
		res.status(400).send("Print failed")
	}
}

// open drawer
const openDrawer = async (req, res) => {
	try {
		let printer = new ThermalPrinter({
			type: PrinterTypes.EPSON,
			interface: "tcp://192.168.1.71",
		})

		let isConnected = await printer.isPrinterConnected()

		if (isConnected) {
			printer.openCashDrawer()
			try {
				let execute = printer.execute()
				res.status(200).send()
			} catch (error) {
				console.log("Print failed:", error)
				res.status(400).send("Failed to open Drawer")
			}
		} else {
			console.log("Drawer not connected")
			res.status(400).send("Drawer not connected")
		}
	} catch (err) {
		console.log(err)
		res.status(400).send("Failed to open Drawer")
	}
}

module.exports = { printTicket, printCashTicket, openDrawer }
