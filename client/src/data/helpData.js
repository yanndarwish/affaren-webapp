export const help = [
	{
		id: "pos",
		title: "Point of Sale",
		subtitle: "Find how to master the point of sale.",
		sections: [
			{
				id: "pos-1",
				name: "Presentation",
				content: [
					"The Point of Sale is the main page of the application. It's in there that you will spend most of your time so it is very important that you understand all the functionnalities and quickly master them.",
					"The page is divided in 6 sections that covers all the possible use cases that you can possibly encounter. All the sections are : Barcode, Cart, Cards, Discount, Payment and Edit. We will cover them all in the following paragraphs.",
				],
			},
			{
				id: "pos-2",
				name: "Barcode",
				tags: ["add product", "without barcode", "barcode"],
				content: [
					"The Barcode section is composed of 2 elements : the Barcode input field, and the No Barcode section that you can toggle by clicking on the 'No Barcode' button.",
					"The first, the Barcode input field is the main element here, where you can simply add a product by scanning it's barcode and it will be added to the cart. Before scanning a barcode, make sure that the input field is on focus!",
					"The second element is useful when you have to add a product that doesn't have a barcode, like 'lösgodis' for example. In that situation, click on the 'No Barcode' button. The 'No Barcode' section should appear and you can now enter the different values. You have 3 values to enter here: the category of the product (Alimentation, Magazine or Décoration/Alcool), the quantity and the price (Note that all 3 values are required, you won't be able to add a product if you missed one value). To enter the numeric values, you have to use the numeric keypad at your disposal. When you are done, you can simply click on the 'Add Product' button and the product will be added to the cart.",
				],
			},
			{
				id: "pos-2",
				name: "Add a product with barcode",
				tags: ["add product", "with barcode", "barcode"],
				content: [
					"To add a product with barcode, you simply have to click on the barcode input to focus on it, and scan the desired product.",
				],
			},
			{
				id: "pos-2",
				name: "Update product quantity",
				tags: ["update product", "quantity", "cart"],
				content: [
					"When a product is visible in the cart, you can update it's quantity by clicking on the '+' and '-' icons, next to its quantity number.",
				],
			},
			{
				id: "pos-2",
				name: "Delete product from cart",
				tags: ["delete product", "delete", "remove", "cart"],
				content: [
					"When a product is visible in the cart, you can delete it by clicking on the trash icon that you can find on the far right of the product's line.",
				],
			},
			{
				id: "pos-2",
				name: "Add a product without barcode",
				tags: ["add product", "without barcode", "barcode"],
				content: [
					"To add a product without barcode, first, you have to click on the 'No Barcode' button.",
					"You should now see the 'No Barcode' section.",
					"Now, you just have to fill the inputs with the desired informations.",
					"Finally, click on 'Add Product'.",
					"And that's it, the product has been added to the cart!",
				],
			},
			{
				id: "pos-2",
				name: "Add a product from a card",
				tags: ["add product", "card", "cards"],
				content: [
					"To add a product from a card, you just have to click on the desired card.",
				],
			},
			{
				id: "pos-2",
				name: "Create a card",
				tags: ["create card", "card", "cards", "new card"],
				content: [
					"To create a new card, first, you need to click on the card with the plus sign on it '+'.",
					"You should now see the 'Add Card' section.",
					"Now, you just have to fill the inputs with the desired informations.",
					"Finally, click on 'Add Card'.",
					"And that's it, the card has been created and you will now be able to use it!"
				],
			},
			{
				id: "pos-2",
				name: "Apply a discount",
				tags: ["apply discount", "discount", "reduction"],
				content: [
					"To apply a discount, first, you need to click on the 'Discount' button.",
					"You should now see the 'Discount' section.",
					"Now, you can select the products you want to apply a discount to, or select them all by clicking the top-left box.",
					"Then, you have to select the type of discount: it can be a percentage or plain cash.",
					"Now, you can type the desired amount.",
					"Finally, click on 'Apply Discount'.",
					"And that's it, the discount has been applied to the selected products!"
				],
			},
			{
				id: "pos-2",
				name: "Basic payment",
				tags: ["payment"],
				content: [
					"To confirm the sale and proceed to payment, first, you need to click on the 'Continue to Payment' button.",
					"You should now see the 'Payment' section.",
					"Now, you have to select the payment method by clicking on one of the tabs: Cash, Card or Check.", 
					"Finally, click on the 'Confirm Payment' button.",
					"And that's it, the payment has been confirmed!"
				],
			},
			{
				id: "pos-3",
				name: "Cart",
				tags: [
					"cart",
					"panier",
					"remove a product",
					"delete a product",
					"quantity",
					"modify quantity",
					"total",
					"number of items",
					"number of products",
				],
				content: [
					"The Cart section is the main section of the page.",
					"It lists all of the customer's items and enables you to update the quantity of a certain product or even delete it.",
					"It tells you the total number of items, the total amount to pay and gives you access to various functionnalities such as printing the receipt, opening the drawer, giving a discount or just simply confirm the payment.",
					"When you look at the cart table, you can see the number of the product, its name, its quantity, its price, and a trash icon.",
					"On both sides of the quantity number, you have a '-' and '+' icon. You guessed it, this is to modify the quantity of the product. If you decrease the quantity to 0, the product will be removed from the cart.",
					"The trash icon on the right is also pretty explicit: it is to remove the product from the cart directly, without having to modify the quantity number.",
					"Below the cart table, you can see on the left the total number of items, and on the right, the total amount of the cart.",
					"At the bottom left, you can see 3 buttons. The first one, 'Receipt', is to print the receipt of the sale. This won't be very useful except when editing a previous sale. The second one, 'Drawer', is to quickly open the drawer without having to confirm a payment. The third, 'Discount', is to apply a discount on one or more products of the cart, but this will be the topic af another section.",
					"Finally, at the bottom right, you have the 'Continue to Payment' button, that opens the Payment section to confirm the transaction, but this will be the topic af another section.",
				],
			},
			{
				id: "pos-4",
				name: "Cards",
				tags: [
					"cards",
					"card",
					"show cards",
					"hide cards",
					"add a card",
					"remove a card",
				],
				content: [
					"The Cards section is located on the right side of the page.",
					"This section is customizable and is here to help you to improve your workflow regarding some products.",
					"You can hide/show this section by clicking on the square button on the right side of the page.",
					"Imagine you want to sell a 'Kanelbulle'. As kanelbullar don't have barcodes, with what we have seen until now, you would have to open the 'No Barcode' section and manually enter values in order to add the product to the cart. This can be a very slow process, particularly with products that we sell as much as kanelbullar.",
					"To avoid all this repetition, we have cards that you can create and delete as you like.",
					"If you click on the '+' card, the 'Add Card' section will appear and enable you to create a new card.",
					"Simply enter the required informations and click on the 'Add Card' button to create the card.",
					"It will now be available and ready to use.",
					"From now on, you will be able to add the product simply by clicking on the card that you just created.",
					"Feel free to add as many as you want if you notice that some products could need it !",
				],
			},
			{
				id: "pos-5",
				name: "Discount",
				tags: ["discount", "reduction", "percentage", "percent"],
				content: [
					"To apply a discount, click on the 'Discount' button.",
					"The Discount section should appear and show you a list of all the products, similar to the cart.",
					"You can now check the box(es) of the desired product(s).",
					"To apply the discount to the entire cart, select all the products by clicking on the box at the top left of the table (the one in the left side of the table header). Now all the products should be selected.",
					"You can now choose the type of discount that you want to apply: percentage or plain cash. The icon next to the discount amount should match the desired type.",
					"Enter the desired amount. Make sure that the icon matches the type of discount that you want.",
					"Finally, you can apply the discount by clicking on the button 'Apply Discount'.",
				],
			},
			{
				id: "pos-6",
				name: "Payment",
				tags: [
					"payment",
					"split payment",
					"confirm payment",
					"payment method",
					"payment methods",
				],
				content: [],
			},
			{
				id: "pos-7",
				name: "Edit",
				tags: [
					"edit",
					"modify sale",
					"modify transaction",
					"correct sale",
					"correct transaction",
					"mistake",
					"correct mistake",
				],
				content: [],
			},
		],
	},
	{
		id: "das",
		title: "Dashboard",
		subtitle: "Understand how to exploit the dashboard.",
		sections: [
			{
				id: "das-1",
				name: "Presentation",
				content: [],
			},
		],
	},
	{
		id: "inv",
		title: "Inventory",
		subtitle: "Become an expert in Inventory management.",
		sections: [
			{
				id: "inv-1",
				name: "Presentation",
				content: [],
			},
		],
	},
	{
		id: "pro",
		title: "Profile",
		subtitle: "Get the maximum from your profile data.",
		sections: [
			{
				id: "pro-1",
				name: "Presentation",
				content: [],
			},
		],
	},
]
