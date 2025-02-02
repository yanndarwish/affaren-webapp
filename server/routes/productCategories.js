const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")

const {
	createProductCategory,
	getAllProductCategories,
	getProductCategoryById,
	updateProductCategory,
	deleteProductCategory,
} = require("../controllers/productCategories")

router.post("/", auth, createProductCategory)

router.get("/", auth, getAllProductCategories)

router.get("/:id", auth, getProductCategoryById)

router.put("/:id", auth, updateProductCategory)

router.delete("/:id", auth, deleteProductCategory)

module.exports = router
