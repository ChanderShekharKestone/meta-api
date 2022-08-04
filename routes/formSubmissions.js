const router = require("express").Router();
const verify = require("./verifyToken");
const Submissions = require("../model/FormSubmissions");

// Create form
router.post("/addSubmission", verify, async (req, res) => {
  const data = new Submissions({
    formId: req.body.formId,
    formName: req.body.formName,
    formData: req.body.formData,
  });
  try {
    const savedData = await data.save();
    res.send(savedData);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get Single
router.post("/getSubmission/:id", verify, async (req, res) => {
  try {
    const data = await Submissions.find({ formId: req.params.id });
    res.send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
