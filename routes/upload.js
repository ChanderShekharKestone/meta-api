const router = require("express").Router();
const fileUpload = require("express-fileupload");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const verify = require("./verifyToken");
router.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

router.post("/fileUpload", verify, async (req, res, next) => {
  try {
    if (!req.files) {
      const err = new Error("send atleast one file");
      err.statusCode = 400;
      return next(err);
    }
    const file = req.files.file;
    const extension = file.mimetype;
    const extensionvalue = extension.split("/")[1];
    let rootDirectory = path.join(__dirname, "../");
    let newFileName = `${uuidv4()}-${file.name}`;
    if (extensionvalue === "mp4" || extensionvalue === "wav") {
      newFileName = newFileName + ".mp4";
    }
    let uploadPath = path.resolve(
      rootDirectory,
      "assets/panofiles",
      newFileName
    );
    file.mv(uploadPath, (err) => {
      if (err) {
        throw err;
      } else {
        let path = `${process.env.SERVER_ADDRESS}/assets/panofiles/${newFileName}`;
        res.send({
          from: req.body.from,
          path,
          fileType: extensionvalue,
          name: file.name,
        });
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
