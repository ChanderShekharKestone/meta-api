const router = require("express").Router();
const verify = require("./verifyToken");
const Settings = require("../model/Settings");

// Get Setting
router.post("/getSetting", async (req, res) => {
  try {
    const setting = await Settings.findOne();
    res.send(setting);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get getAppSettings
router.post("/getAppSettings", async (req, res) => {
  try {
    const setting = await Settings.findOne();
    const appSettings = {
      animationImage: setting.animationImage,
      defaultPageSlug: setting.defaultPageSlug,
      defaultPageId: setting.defaultPageId,
    };
    res.send(appSettings);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Add / Update Setting
router.post("/addSetting", verify, async (req, res) => {
  const {
    defaultPageId,
    defaultPageSlug,
    animationImage,
    newPageAutoAdd,
    addCustomMenuOption,
    defaultLandingPage,
    githubLogin,
  } = req.body.globalSetting;
  const setting = {
    defaultPageId,
    defaultPageSlug,
    animationImage,
    newPageAutoAdd,
    addCustomMenuOption,
    defaultLandingPage,
    githubLogin,
  };
  try {
    const savedSetting = await Settings.findOneAndUpdate(
      { globalSetting: "globalSetting" },
      { $set: setting },
      { new: true, upsert: true }
    );
    res.send(savedSetting);
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = router;
