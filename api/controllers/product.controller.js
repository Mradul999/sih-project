import Product from "../models/products.model.js";

export const addProduct = async (req, res) => {
  try {
    const { name, price, description, image, category, quantity, userId } =
      req.body;

    const newProduct = new Product({
      userId,
      name,
      price,
      description,
      image,
      category,
      quantity,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(201).json(allProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findOne({ productId });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
