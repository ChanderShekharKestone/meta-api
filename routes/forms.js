const router = require("express").Router();
const verify = require("./verifyToken");
const Forms = require("../model/Forms");

// Get all
router.post("/getForms", verify, async (req, res) => {
  if (req.body.userId) {
    try {
      const data = await Forms.find({ userId: req.body.userId });
      res.send(data);
    } catch (err) {
      res.status(400).send(err);
    }
    return;
  }
  try {
    const data = await Forms.find();
    res.send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Create
router.post("/addForm", verify, async (req, res) => {
  const { userId, isActive, storeId, storeName, formName, formData } =
    req.body.values;
  const data = new Forms({
    userId,
    isActive,
    storeId,
    storeName,
    formName,
    formData,
  });
  try {
    const savedData = await data.save();
    res.send(savedData);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get Single
router.post("/getForm/:id", verify, async (req, res) => {
  try {
    const data = await Forms.findById(req.params.id);
    res.send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update
router.post("/editForm/:id", verify, async (req, res) => {
  const { userId, isActive, storeId, storeName, formName, formData } =
    req.body.values;
  const item = {
    userId,
    isActive,
    storeId,
    storeName,
    formName,
    formData,
  };

  try {
    const updateItem = await Forms.findOneAndUpdate(
      { _id: req.params.id },
      { $set: item },
      { new: true }
    );
    res.send(updateItem);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete
router.post("/deleteForm/:deleteId", verify, async (req, res) => {
  try {
    const deleteItem = await Forms.deleteOne({ _id: req.params.deleteId });
    res.send({ deleteId: req.params.deleteId });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
