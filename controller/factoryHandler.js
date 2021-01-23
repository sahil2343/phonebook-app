const AppError = require("./../utils/appError");
const catchError = require("./../utils/errorHandler");

exports.deleteOne = (Model) =>
  catchError(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchError(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchError(async (req, res, next) => {
    console.log(req.body);
    const doc = await Model.create(req.body);
    // console.log(doc);
    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });
