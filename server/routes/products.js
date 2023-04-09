const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")

const {
	getProducts,
	getProduct,
	createProduct,
	patchProduct,
	updateProduct,
	deleteProduct,
} = require("../controllers/products")

router.post("/", auth, createProduct)

router.get("/", auth, getProducts)

router.get("/:barcode", auth, getProduct)

router.patch("/:id", auth, patchProduct)

router.put("/:id", auth, updateProduct)

router.delete("/:id", auth, deleteProduct)

module.exports = router
