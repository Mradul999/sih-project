import Product from "../models/products.model.js";

export const addProduct = async (req, res) => {
  try {
    const { name, price, description, image, category,amount, userId } = req.body;

    const newProduct = new Product({
      userId,
      name,
      price,
      description,
      image,
      category,
      amount
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
