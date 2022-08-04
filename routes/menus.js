const mongoose = require("mongoose");
const router = require("express").Router();
const verify = require("./verifyToken");
const Menus = require("../model/Menus");

// Get all menus
router.post("/getMenus", verify, async (req, res, next) => {
  try {
    const menus = await Menus.find();
    res.send(menus);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Create menu
router.post("/addMenu", verify, async (req, res, next) => {
  var slug = req.body.menu.slug;
  var crid = req.body.menu.rid;
  if (slug === "custom") {
    var id = mongoose.Types.ObjectId();
    crid = id;
  }
  const menus = new Menus({
    name: req.body.menu.name,
    slug: slug,
    target: req.body.menu.target,
    rid: crid,
    iconName: "icon",
  });

  try {
    const savemenu = await menus.save();
    res.send(savemenu);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update Page
router.post("/updateMenu/:menuId", verify, async (req, res) => {
  const menu = {
    name: req.body.menu.name,
    slug: req.body.menu.slug,
    target: req.body.menu.target,
    iconName: req.body.menu.iconName,
  };
  try {
    const updateMenu = await Menus.findOneAndUpdate(
      { _id: req.params.menuId },
      { $set: menu },
      { new: true }
    );
    res.send(updateMenu);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete menu
router.post("/deleteMenu/:menuId", verify, async (req, res) => {
  try {
    const deleteMenu = await Menus.deleteOne({ _id: req.params.menuId });
    res.send({ menuId: req.params.menuId });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
