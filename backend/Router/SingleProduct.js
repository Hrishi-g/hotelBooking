const express = require('express');
const Product = require('../models/Product'); // Import the Product model
const router = express.Router();

// GET a single product by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params; // Get the product ID from the request parameters

  try {
    const product = await Product.findById(id); // Fetch product by ID
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product); // Send the product as a JSON response
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Error fetching product" });
  }
});

module.exports = router;
