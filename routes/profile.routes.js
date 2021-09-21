const router = require("express").Router();
const HostModel = require("../models/Host.model");
const { isLoggedIn } = require("../middlewares/auth.middlewares");

// GET '/users/profile'
router.get("/", isLoggedIn, (req, res, next) => {
  const userId = req.session.loggedInUser._id;
  // just trying some shit
  HostModel.find({ user: userId })
    .populate("pet")
    .then((hostsFromUserInfo) => {
      console.log(hostsFromUserInfo);
      //  if() // pet id from host? but also user? or if user?
      res.render("users/user-profile.hbs", { user: req.session.loggedInUser, hostsFromUserInfo});
    })
    .catch((err) => {});

  // console.log("this is the session", req.session.loggedInUser);
}); //need to find info of host and pass to render
//need to find pet data of host, or pet data linked to host
//need to define host, maybe something like  host: req.session.petId.available.false
//{{pet: req.session.petId}} or {{ pet: host.petId}}
module.exports = router;
