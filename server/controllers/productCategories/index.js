const pool = require("../../db")
const logger = require("../../logger")
const {
	queryGetAllProductCategories,
	queryGetProductCategoryById,
	queryCreateProductCategory,
	queryDeleteProductCategory,
	queryUpdateProductCategory,
} = require("./query")

const moduleName = "productCategories"

const createProductCategory = async (req, res) => {
	const fnLogger = logger.child({
		module: moduleName,
		method: queryCreateProductCategory.id,
	})

	try {
		fnLogger.debug("creating product category")
		const { name, color } = req.body

		if (!name || !color) {
			fnLogger.error("name and color are required")
			return res.status(400).send("Name and color are required")
		}

		const response = await pool.query(queryCreateProductCategory.statement, [
			name,
			color,
		])
		fnLogger.debug("product category created")
		return res.status(200).send(response.rows[0])
	} catch (error) {
		fnLogger.error(error)
		return res.status(500).send("Internal server error")
	}
}

const getAllProductCategories = async (req, res) => {
	const fnLogger = logger.child({
		module: moduleName,
		method: queryGetAllProductCategories.id,
	})

	try {
		fnLogger.debug("getting all product categories")
		const response = await pool.query(queryGetAllProductCategories.statement)
		fnLogger.debug("product categories retrieved")
		return res.status(200).send(response.rows)
	} catch (error) {
		fnLogger.error(error)
		return res.status(500).send("Internal server error")
	}
}

const getProductCategoryById = async (req, res) => {
	const fnLogger = logger.child({
		module: moduleName,
		method: queryGetProductCategoryById.id,
	})

	try {
		fnLogger.debug("getting product category by id")
		const { id } = req.params

		if (!id) {
			fnLogger.error("id is required")
			return res.status(400).send("Id is required")
		}

		const response = await pool.query(queryGetProductCategoryById.statement, [id])
		fnLogger.debug("product category retrieved")
		return res.status(200).send(response.rows[0])
	} catch (error) {
		fnLogger.error(error)
		return res.status(500).send("Internal server error")
	}
}

const updateProductCategory = async (req, res) => {
	const fnLogger = logger.child({
		module: moduleName,
		method: queryUpdateProductCategory.id,
	})

	try {
		fnLogger.debug("updating product category")
		const { id } = req.params
		const { name, color } = req.body

		if (!id || !name || !color) {
			fnLogger.error("id, name, and color are required")
			return res.status(400).send("Id, name, and color are required")
		}

		const response = await pool.query(queryUpdateProductCategory.statement, [
			id,
			name,
			color,
		])
		fnLogger.debug("product category updated")
		return res.status(200).send(response.rows[0])
	} catch (error) {
		fnLogger.error(error)
		return res.status(500).send("Internal server error")
	}
}

const deleteProductCategory = async (req, res) => {
	const fnLogger = logger.child({
		module: moduleName,
		method: queryDeleteProductCategory.id,
	})

	try {
		fnLogger.debug("deleting product category")
		const { id } = req.params

		if (!id) {
			fnLogger.error("id is required")
			return res.status(400).send("Id is required")
		}

		const response = await pool.query(queryDeleteProductCategory.statement, [id])
		fnLogger.debug("product category deleted")
		return res.status(200).send(response.rows[0])
	} catch (error) {
		fnLogger.error(error)
		return res.status(500).send("Internal server error")
	}
}

module.exports = {
	createProductCategory,
	getAllProductCategories,
	getProductCategoryById,
	updateProductCategory,
	deleteProductCategory,
}
