const router = require("express").Router();

const { isLoggedIn } = require("../middlewares/auth.middlewares");

// GET '/users/profile'
router.get("/profile", isLoggedIn, (req, res, next) => {
  // console.log("this is the session", req.session.loggedInUser);
  res.render("users/user-profile.hbs", { user: req.session.loggedInUser });
});

module.exports = router;
