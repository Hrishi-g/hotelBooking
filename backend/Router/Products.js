const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// GET all products from MongoDB
router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch products from MongoDB
    console.log("Sending Product");
    res.json(products); // Send the products as JSON response
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

module.exports = router;
