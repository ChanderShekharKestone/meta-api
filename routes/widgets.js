const router = require("express").Router();
const verify = require("./verifyToken");
const Widgets = require("../model/Widgets");

// Get Setting
router.post("/getWidgets", async (req, res) => {
  try {
    const widgets = await Widgets.findOne();
    res.send(widgets);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/addWidgets", verify, async (req, res) => {
  const { chat, photoOp } = req.body.globalWidgets;
  const widgets = {
    chat,
    photoOp,
  };
  try {
    const savedWidgets = await Widgets.findOneAndUpdate(
      { globalWidgets: "globalWidgets" },
      { $set: widgets },
      { new: true, upsert: true }
    );
    res.send(savedWidgets);
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = router;
