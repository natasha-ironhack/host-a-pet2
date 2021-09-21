const router = require("express").Router();
const HostModel = require("../models/Host.model");
const { isLoggedIn } = require("../middlewares/auth.middlewares");

// GET '/users/profile'
router.get("/", isLoggedIn, (req, res, next) => {
  // console.log("this is the session", req.session.loggedInUser);
  res.render("users/user-profile.hbs", { user: req.session.loggedInUser });
}); //need to find info of host and pass to render
//need to find pet data of host, or pet data linked to host

module.exports = router;
