const express = require("express");
const userController = require("./../controller/userController");
const router = express.Router();
// var app = express();
// app.set("view engine", "ejs");
router.post("/contacts/create", userController.createUser);

router.delete("/contact/delete/:id", userController.deleteUser);
router.patch("/contacts/update/:id", userController.updateUser);

router.get("/", function (req, res) {
  res.render("home");
});
module.exports = router;
