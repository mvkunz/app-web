const express = require("express");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, getProducts);
router.post("/", verifyToken, createProduct);
router.put("/:id", verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteProduct);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductDetail:
 *       type: object
 *       properties:
 *         brand:
 *           type: string
 *           description: The brand of the product
 *         model:
 *           type: string
 *           description: The model of the product
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the product
 *         color:
 *           type: string
 *           description: The color of the product
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The product ID
 *         name:
 *           type: string
 *           description: The name of the product
 *         details:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProductDetail'
 *           description: The detailed information of the product
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Returns a list of all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Creates a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: The product was successfully created
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Updates the product by the id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The product was updated
 *       404:
 *         description: The product was not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Deletes the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product id
 *     responses:
 *       204:
 *         description: The product was deleted
 *       404:
 *         description: The product was not found
 *       500:
 *         description: Internal Server Error
 */
