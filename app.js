const express = require("express");
const userRouter = require("./routes/userRoutes");
const app = express();

app.use(express.json({ limit: "10kb" }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
// 1) ROUTES
// app.use("/", homeRouter);
app.use("/", userRouter);
module.exports = app;
