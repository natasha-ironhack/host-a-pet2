const router = require("express").Router();

const { isLoggedIn } = require("../middlewares/auth.middlewares");

router.get("/", isLoggedIn, (req, res, next) => {
  console.log("this is the session", req.session.loggedInUser);
  res.render("users/user-profile.hbs", { user: req.session.loggedInUser });
});
