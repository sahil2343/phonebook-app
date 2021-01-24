const express = require("express"),
  Contact = require("../models/contact"),
  userid = require("../api/randomStringGenerator");
router = express.Router();

router
  .route("/create")
  .get((req, res, next) => {
    res.statusCode = 200;
    res.render("create");
  })
  .post(async (req, res, next) => {
    try {
      const mobile = req.body.mobile;
      let contact = await Contact.findOne({ mobile });

      if (contact) {
        const err = new Error("Contact with same mobile number exists!");
        err.status = 401;
        return next(err);
      } else {
        let newContact = await Contact.create({
          name: req.body.name,
          email: req.body.email,
          mobile: req.body.mobile,
          user_id: userid(),
        });

        res.statusCode = 200;
        res.redirect("/contact/view");
      }
    } catch (err) {
      err.status = 500;
      return next(err);
    }
  });

router.route("/view").get(async (req, res, next) => {
  try {
    const limit = 10;
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const count = await Contact.countDocuments().exec();

    let nextPage = page + 1 < count ? page + 1 : page;

    let prevPage = page - 1 > 0 ? page - 1 : page;

    //Fetching contacts from database
    if (req.query.search) {
      let query = Contact.searchBuilder(req.query.search);
      // Get all campgrounds from DB
      let contacts = await Contact.find(query)
        .limit(limit)
        .skip(startIndex)
        .sort({ name: 1 })
        .lean();
      if (contacts) {
        res.statusCode = 200;
        res.render("view", { contacts, prevPage, nextPage });
      }
    } else {
      let contacts = await Contact.find()
        .limit(limit)
        .skip(startIndex)
        .sort({ name: 1 })
        .lean();
      if (contacts) {
        res.statusCode = 200;
        res.render("view", { contacts, prevPage, nextPage });
      }
    }
  } catch (err) {
    err.status = 500;
    return next(err);
  }
});

//Handling POST and GET requests on the route @ /contact/update/:id

router
  .route("/update/:id")
  .get(async (req, res, next) => {
    try {
      let contact = await Contact.findOne({ user_id: req.params.id });
      res.statusCode = 200;
      res.render("update", {
        name: contact.name,
        email: contact.email,
        mobile: contact.mobile,
        path: `/contact/update/${contact.user_id}`,
      });
    } catch (err) {
      err.status = 500;
      return next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      let contact = await Contact.findOneAndUpdate(
        { user_id: req.params.id },
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
          },
        },
        { new: true }
      );

      res.statusCode = 200;
      res.redirect(`/contact/view`);
    } catch (err) {
      err.status = 500;
      return next(err);
    }
  });

//Handling request on the route @ /contact/delete/:id

router.route("/delete/:id").get(async (req, res, next) => {
  try {
    let resp = await Contact.findOneAndDelete({ user_id: req.params.id });

    if (resp) {
      res.statusCode = 200;
      res.redirect("/contact/view");
    }
  } catch (err) {
    err.status = 500;
    return next(err);
  }
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;
