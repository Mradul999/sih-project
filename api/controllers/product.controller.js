import Product from "../models/products.model.js";

export const addProduct = async (req, res) => {
  try {
    const { name, price, description, image, category, userId } = req.body;

    const newProduct = new Product({
      userId,
      name,
      price,
      description,
      image,
      category,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
