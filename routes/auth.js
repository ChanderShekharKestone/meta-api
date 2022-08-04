const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");
const User = require("../model/User");
const {
  registerValidation,
  loginValidation,
} = require("../validation/validation");
router.post("/register", async (req, res, next) => {
  const { error } = await registerValidation(req.body);
  if (error) {
    const err = new Error(error.details[0].message);
    err.statusCode = 400;
    return next(err);
  }
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    const err = new Error(
      `An account with email ${req.body.email} already exists.`
    );
    err.statusCode = 400;
    return next(err);
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    isActive: req.body.isActive,
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    age: req.body.age,
    gender: req.body.gender,
    role: req.body.role,
  });
  try {
    await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

//login
router.post("/login", async (req, res, next) => {
  const { error } = loginValidation(req.body);
  if (error) {
    const err = new Error(error.details[0].message);
    err.statusCode = 400;
    return next(err);
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    const err = new Error(
      `An account with email ${req.body.email} not exists.`
    );
    err.statusCode = 400;
    return next(err);
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    const err = new Error("The password you entered is incorrect.");
    err.statusCode = 400;
    return next(err);
  }
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
  res.send({ token: token });
});

router.post("/getUsers", verify, async (req, res) => {
  try {
    const data = await User.find();
    res.send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/editUser/:id", verify, async (req, res) => {
  const { isActive, name, email, password, age, role, gender, avatar } =
    req.body;
  const user = {
    isActive,
    name,
    email,
    password,
    age,
    gender,
    role,
    avatar,
  };
  try {
    const updateItem = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: user },
      { new: true }
    );
    res.send(updateItem);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.post("/deleteUser/:id", verify, async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.send({ deleteId: req.params.id });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
