const router = require("express").Router();
const verify = require("./verifyToken");
const Stores = require("../model/Stores");
const { storeValidation } = require("../validation/validation");

// Get all Stores
router.post("/getStores", verify, async (req, res) => {
  if (req.body.userId) {
    try {
      const allStores = await Stores.find({ userId: req.body.userId });
      res.send(allStores);
    } catch (err) {
      res.status(400).send(err);
    }
    return;
  }
  try {
    const allStores = await Stores.find();
    res.send(allStores);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Create Store
router.post("/addStore", verify, async (req, res, next) => {
  const { error } = await storeValidation(req.body.values);
  if (error) {
    const err = new Error(error.details[0].message);
    err.statusCode = 400;
    return next(err);
  }
  //check if exist
  const storeExist = await Stores.findOne({
    storeName: req.body.values.storeName,
  });

  if (storeExist) {
    const err = new Error(
      `A store with name ${storeExist.storeName} already exists.`
    );
    err.statusCode = 400;
    return next(err);
  }

  const { userId, storeName, storeAddress, logo, category, branches } =
    req.body.values;
  const stores = new Stores({
    userId,
    storeName,
    storeAddress,
    logo,
    category,
    branches,
  });
  try {
    const savedStore = await stores.save();
    res.send(savedStore);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete Store
router.post("/deleteStore/:storeId", verify, async (req, res) => {
  try {
    const deleteStore = await Stores.deleteOne({ _id: req.params.storeId });
    res.send({ storeId: req.params.storeId });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update Store
router.post("/editStore/:storeId", verify, async (req, res) => {
  const store = {
    storeName: req.body.values.storeName,
    storeAddress: req.body.values.storeAddress,
    logo: req.body.values.logo,
    category: req.body.values.category,
    branches: req.body.values.branches,
  };
  try {
    const updateStore = await Stores.findOneAndUpdate(
      { _id: req.params.storeId },
      { $set: store },
      { new: true }
    );
    res.send(updateStore);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
