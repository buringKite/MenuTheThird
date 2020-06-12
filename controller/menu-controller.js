const express = require("express");
const passport = require("passport");
const router = express.Router();
const db = require("../models");

require("../config/passport")(passport);
router.use(passport.initialize());
router.use(passport.session());

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const data = await db.user.findAll({ include: [db.employee] });

      res.render("index", { table: data });
    } catch (error) {
      console.error(error);

      res.status(500).send();
    }
  }
);

router.post(
  "/employee/user_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const data = await db.employee.create({
        ...req.body,
        user_id: req.params.user_id,
      });
      res.redirect("/", { table: data });
    } catch (err) {
      console.error("err");
      res.status(500).send();
    }
  }
);

module.exports = router;
// router.post(
//   "/employee",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     const data = await db.user.create(req.body);

//     res.json(data);
//   }
// );
