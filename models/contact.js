const mongoose = require("mongoose");
const validator = require("validator");
const plugin = require("mongoose-partial-search");

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, searchable: true },
  email: {
    type: String,
    required: true,
    unique: true,
    searchable: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  mobile: { type: Number, required: true, unique: true, searchable: true },
  user_id: { type: String, required: true, unique: true },
});

contactSchema.plugin(plugin);

module.exports = mongoose.model("Contact", contactSchema);
