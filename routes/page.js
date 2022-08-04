const router = require("express").Router();
const verify = require("./verifyToken");
const Page = require("../model/Page");
const Menus = require("../model/Menus");
const Settings = require("../model/Settings");
const { pageValidation } = require("../validation/validation");

// Get all Pages
router.post("/getPages", verify, async (req, res) => {
  try {
    const allPages = await Page.find();
    res.send(allPages);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Create page
router.post("/addPage", verify, async (req, res, next) => {
  const { error } = await pageValidation(req.body.finalData);
  if (error) {
    const err = new Error(error.details[0].message);
    err.statusCode = 400;
    return next(err);
  }
  const allPages = await Page.find();
  //check if exist
  const pageName = await Page.findOne({ slug: req.body.finalData.slug });
  if (pageName) {
    const err = new Error(`A page with name ${pageName.name} already exists.`);
    err.statusCode = 400;
    return next(err);
  }

  const { name, slug, newPageAutoAdd, sceneData } = req.body.finalData;
  const data = new Page({
    name,
    slug,
    newPageAutoAdd,
    sceneData,
  });
  try {
    const savepage = await data.save();
    res.send(savepage);
    if (savepage.newPageAutoAdd) {
      const menus = new Menus({
        name: savepage.name,
        slug: savepage.slug,
        iconName: "icon",
        rid: savepage._id,
        target: slug,
      });
      await menus.save();
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get Single Page
router.post("/getPage/:pageId", verify, async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.pageId });
    if (page) {
      res.send(page);
    } else {
      res.send();
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete Page
router.post("/deletePage/:pageId", verify, async (req, res) => {
  try {
    const globalSetting = await Settings.findOne({
      defaultPageId: req.params.pageId,
    });
    await Page.deleteOne({ _id: req.params.pageId });
    await Menus.deleteOne({ rid: req.params.pageId });
    res.send({ pageId: req.params.pageId });
    if (globalSetting) {
      Settings.findOne({}, function (err, item) {
        item.defaultPageId = undefined;
        item.defaultPageSlug = undefined;
        item.save();
      });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update Page
router.post("/updatePage/:pageId", verify, async (req, res) => {
  const page = {
    name: req.body.finalData.name,
    slug: req.body.finalData.slug,
    newPageAutoAdd: req.body.finalData.newPageAutoAdd,
    sceneData: req.body.finalData.sceneData,
  };
  const menu = {
    name: req.body.finalData.name,
    slug: req.body.finalData.slug,
    target: req.body.finalData.slug,
  };
  try {
    const updatePage = await Page.findOneAndUpdate(
      { _id: req.params.pageId },
      { $set: page },
      { new: true }
    );
    if (req.body.finalData.newPageAutoAdd) {
      await Menus.findOneAndUpdate(
        { rid: req.params.pageId },
        { $set: menu },
        { new: true, upsert: true }
      );
    }

    res.send(updatePage);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
