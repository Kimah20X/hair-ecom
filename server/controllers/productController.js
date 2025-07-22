const Product = require('../models/Product.js');


// Create a new product (admin only, protected by middleware)
const addProduct = async (req, res) => {
  try {
    const { name, price, category, description, image, stock } = req.body;

    // Validate required fields
    if (!name || !price || !category || !stock) {
      return res.status(400).json({ message: 'Name, price, category, and stock are required' });
    }

    // Create new product
    const product = new Product({
      name,
      price,
      category,
      description,
      image,
      stock,
    });

    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// get product by id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getProducts, getProductById, addProduct };