const User = require("./../models/userModel");
const factory = require("./factoryHandler");

exports.createUser = factory.createOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
