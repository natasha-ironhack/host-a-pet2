module.exports = {
  isLoggedIn: (req, res, next) => {
    if (req.session.loggedInUser) {
      next();
    } else {
      res.redirect("/auth/login");
    }
  },

  isAdmin: (req, res, next) => {
    // if (req.session.loggedInUser && req.session.loggedInUser.isAdmin) {
    if (req.session.loggedInUser?.isAdmin) {
      // truthy value so === true isn't necessary
      next();
    } else {
      res.redirect("/auth/login");
    }
  },
};
