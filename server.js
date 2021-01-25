const express = require("express"),
  handlebars = require("express-handlebars"),
  bodyParser = require("body-parser"),
  logger = require("morgan"),
  connectDB = require("./db");
path = require("path");
contact = require("./routes/contact");
app = express();

//Connecting to the Database
connectDB();

app.use(logger("dev"));

//Setting views engine
app.set("view engine", "hbs");
app.engine(
  "hbs",
  handlebars({
    extname: "hbs",
    defaultLayout: null,
  })
);

app.use(express.static(path.resolve(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Added default and /contact route
app.get("/", (req, res) => {
  res.statusCode = 200;
  res.redirect("/contact/signup");
});

app.use("/contact", contact);

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("404");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
