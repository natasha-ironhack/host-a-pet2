const router = require("express").Router();
const UserModel = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const mongoose = require("mongoose");

//const fileUploader = require("../middlewares/cloudinary.config");

//all our routes
//don't forget to add to app.js
router.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs");
});

router.post("/signup", (req, res, next) => {
  const { username, email, password } = req.body;
  // console.log("The form data: ", req.body);

  if (!email || !password || !username) {
    res.render("auth/signup.hbs", {
      errorMessage: "please fill out all fields",
    });
    return;
  }

  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(password, salt))
    .then((hashedPassword) => {
      console.log("email before creation", email);
      return UserModel.create({
        // username: username
        username,
        email,
        // passwordHash => this is the key from the User model
        //     ^
        //     |            |--> this is placeholder (how we named returning value from the previous method (.hash()))
        password: hashedPassword,
      });
    })
    .then((userFromDB) => {
      console.log("Newly created user is: ", userFromDB);
      res.redirect("/auth/login");
    })
    .catch((error) => {
      // copy the following if-else statement
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render("auth/signup", { errorMessage: error.message });
      } else {
        next(error);
      }
    }) // close .catch()
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render("auth/signup", { errorMessage: error.message });
      } else if (error.code === 11000) {
        res.status(500).render("auth/signup", {
          errorMessage:
            "Username and email need to be unique. Either username or email is already used.",
        });
      } else {
        next(error);
      }
    }); // close .catch()
}); // close router.post()

// the imports, get and post route remain untouched for now
router.get("user-profile.hbs", (req, res) =>
  res.render("user-profile", { userInSession: req.session.currentUser })
);

router.get("/login", (req, res, next) => {
  res.render("auth/login.hbs");
});

router.post("/login", (req, res, next) => {
  //console.log("SESSION =====> ", req.session);
  const { email, password } = req.body;

  if (!email || !password) {
    res.render("auth/login", {
      errorMessage: "Please enter both your email and password to login.",
    });
    return;
  }

  UserModel.findOne({ email })
    .then((user) => {
      //console.log("inside find model", password, user.password);
      if (!user) {
        res.render("auth/login", {
          errorMessage: "This email is not registered. Try with another email.",
        });
        return;
      } else if (bcryptjs.compareSync(password, user.password)) {
        // password not passwordHash?
        req.session.loggedInUser = user;
        //req.app.locals.isLoggedIn = true;
        res.redirect("/profile");
        //above changed to /profile b/c that's what it is in app.js
      } else {
        res.render("auth/login", { errorMessage: "Incorrect password." });
      }
    })
    .catch((error) => next(error));
});

router.post("/logout", (req, res, next) => {
  req.session.destroy(); // this removes the active session "req.session.loggedInUser" and also removes stored session from DB.
  //Problem: stored session still on DB
  res.redirect("/auth/login");
});

module.exports = router;
