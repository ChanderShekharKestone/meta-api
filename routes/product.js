const router = require("express").Router();
const verify = require("./verifyToken");
const Product = require("../model/Product");

// Get all Prod
router.post("/getProducts", verify, async (req, res) => {
  if (req.body.userId) {
    try {
      const allProducts = await Product.find({ userId: req.body.userId });
      res.send(allProducts);
    } catch (err) {
      res.status(400).send(err);
    }
    return;
  }

  try {
    const allProducts = await Product.find();
    res.send(allProducts);
  } catch (err) {
    res.status(400).send(err);
  }
});
// Create product
router.post("/createProduct", verify, async (req, res) => {
  const {
    userId,
    categoryId,
    categoryName,
    categoryType,
    childCategory,
    coverImage,
    shortDescription,
    fullDescription,
    images,
    isActive,
    price,
    product3d,
    storeId,
    storeName,
    subCategory,
    title,
  } = req.body.productData;

  const product = new Product({
    userId,
    categoryId,
    categoryName,
    categoryType,
    childCategory,
    coverImage,
    shortDescription,
    fullDescription,
    images,
    isActive,
    price,
    product3d,
    storeId,
    storeName,
    subCategory,
    title,
  });
  try {
    const savedProduct = await product.save();
    res.send(savedProduct);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get Single
router.post("/getProduct/:id", verify, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.send(product);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete
router.post("/deleteProduct", verify, async (req, res) => {
  try {
    const deleteProduct = await Product.deleteOne({ _id: req.body.id });
    res.send({ deleteId: req.body.id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update
router.post("/updateProduct/:id", verify, async (req, res) => {
  const {
    userId,
    categoryId,
    categoryName,
    categoryType,
    childCategory,
    coverImage,
    shortDescription,
    fullDescription,
    images,
    isActive,
    price,
    product3d,
    storeId,
    storeName,
    subCategory,
    title,
  } = req.body.productData;
  const product = {
    userId,
    categoryId,
    categoryName,
    categoryType,
    childCategory,
    coverImage,
    shortDescription,
    fullDescription,
    images,
    isActive,
    price,
    product3d,
    storeId,
    storeName,
    subCategory,
    title,
  };

  try {
    const updateProduct = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { $set: product },
      { new: true }
    );
    res.send(updateProduct);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
