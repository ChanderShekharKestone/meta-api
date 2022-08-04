const http = require("http");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const socket = require("./socket");
const cors = require("cors");
const { ExpressPeerServer } = require("peer");
//import routers
const authRoute = require("./routes/auth");
const uploadRoute = require("./routes/upload");
const pageRoute = require("./routes/page");
const menuRoute = require("./routes/menus");
const settingRoute = require("./routes/settings");
const productRoute = require("./routes/product");
const storesRoute = require("./routes/stores");
const resourceRoute = require("./routes/resources");
const formRoute = require("./routes/forms");
const submissionRoute = require("./routes/formSubmissions");
const widgetsRoute = require("./routes/widgets");
const messageRoute = require("./routes/message");
dotenv.config();
// connect database
// mongoose.connect(process.env.DB_PATH, {  keepAlive: true,useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,useFindAndModify: false, }, () =>
//   console.log("connected")
// );

mongoose.connect(process.env.DB_PATH, { useNewUrlParser: true }, () =>
  console.log("connected")
);

//static\
app.use(
  "/assets",
  express.static(__dirname + "/assets", {
    setHeaders: function setHeaders(res, path, stat) {
      res.header("Access-Control-Allow-Origin", "*");
    },
  })
);
// middleware
app.use(cors());
app.use(express.json());
//route middlware
app.use("/api/user", authRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/pages", pageRoute);
app.use("/api/menus", menuRoute);
app.use("/api/settings", settingRoute);
app.use("/api/products", productRoute);
app.use("/api/stores", storesRoute);
app.use("/api/resources", resourceRoute);
app.use("/api/forms", formRoute);
app.use("/api/submissions", submissionRoute);
app.use("/api/widgets", widgetsRoute);
app.use("/api/message", messageRoute);
app.all("*", (req, res, next) => {
  const err = new Error(`${req.path} not found`);
  err.statusCode = 404;
  next(err);
});
// error handler middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({
    success: 0,
    status: statusCode,
    message: err.message,
    // stack: err.stack,
  });
});

const server = http.createServer(app);
//setting up peerServer
const peerServer = ExpressPeerServer(server, {
  proxied: true,
  debug: true,
  path: "/peerjs",
});
app.use(peerServer);
server.listen(process.env.PORT, () => {
  socket(server);
  console.log("Server is listening at :", process.env.PORT);
});

// app.listen(5000, () => socket(server));
