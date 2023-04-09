const pool = require("../db")

// create a dish
const createDish = async (req, res) => {
	try {
		const { dishName, dishIngredients, dishCategory, dishPrice, dishActive } =
			req.body
		const response = await pool.query(
			"INSERT INTO dishes (dish_name, dish_ingredients, dish_category, dish_price, dish_active, product_taxe) VALUES ($1, $2, $3, $4, $5, 5.5)",
			[dishName, dishIngredients, dishCategory, dishPrice, dishActive]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
}

// get all dishes
const getDishes = async (req, res) => {
	try {
		const response = await pool.query("SELECT * FROM dishes")
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
}

// get a specific dish by id
const getDish = async (req, res) => {
	try {
		const { id } = req.params
		const response = await pool.query(
			"SELECT * FROM dishes WHERE dish_id = $1",
			[id]
		)
		res.status(200).send(response.rows[0])
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
}

// update a dish
const updateDish = async (req, res) => {
	try {
		const { id } = req.params
		const {
			dishName,
			dishIngredients,
			dishCategory,
			dishPrice,
			dishActive,
			dishTaxe,
		} = req.body
		const response = await pool.query(
			"UPDATE dishes SET dish_name = $1, dish_ingredients = $2, dish_category = $3, dish_price = $4, dish_active = $5, product_taxe = $6 WHERE dish_id = $7",
			[
				dishName,
				dishIngredients,
				dishCategory,
				dishPrice,
				dishActive,
				dishTaxe,
				id,
			]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
}

const deleteDish = async (req, res) => {
	try {
		const { id } = req.params

		const response = await pool.query("DELETE FROM dishes WHERE dish_id = $1", [
			id,
		])
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
}

module.exports = { createDish, getDishes, getDish, updateDish, deleteDish }
