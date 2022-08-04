const router = require("express").Router();
const verify = require("./verifyToken");
const Resources = require("../model/Resources");

// Get all
router.post("/getResource", verify, async (req, res) => {
  if (req.body.userId) {
    try {
      const data = await Resources.find({ userId: req.body.userId });
      res.send(data);
    } catch (err) {
      res.status(400).send(err);
    }
    return;
  }

  try {
    const data = await Resources.find();
    res.send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get Single
router.post("/getResource/:id", verify, async (req, res) => {
  try {
    const data = await Resources.findById(req.params.id);
    res.send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Add
router.post("/addResource", verify, async (req, res) => {
  const {
    userId,
    storeId,
    storeName,
    isActive,
    iFrameURL,
    imageURL,
    pdfURL,
    resDes,
    resTitle,
    resType,
    videoType,
    videoURL,
  } = req.body.values;

  const data = new Resources({
    userId,
    storeId,
    storeName,
    isActive,
    iFrameURL,
    imageURL,
    pdfURL,
    resDes,
    resTitle,
    resType,
    videoType,
    videoURL,
  });
  try {
    const savedData = await data.save();
    res.send(savedData);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update
router.post("/editResource/:id", verify, async (req, res) => {
  const {
    userId,
    isActive,
    storeId,
    storeName,
    iFrameURL,
    imageURL,
    pdfURL,
    resDes,
    resTitle,
    resType,
    videoType,
    videoURL,
  } = req.body.values;

  const item = {
    userId,
    isActive,
    storeId,
    storeName,
    iFrameURL,
    imageURL,
    pdfURL,
    resDes,
    resTitle,
    resType,
    videoType,
    videoURL,
  };

  try {
    const updateItem = await Resources.findOneAndUpdate(
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
router.post("/deleteResource/:deleteId", verify, async (req, res) => {
  try {
    const deleteItem = await Resources.deleteOne({ _id: req.params.deleteId });
    res.send({ deleteId: req.params.deleteId });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
