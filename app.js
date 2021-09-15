// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

//NATASHA: Commented this out for now as can't get pet partial to work, Sept. 15.
//NOTE: In config index folder file anyway
//const path = require("path");

//testing
const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

//NATASHA: Commented this out for now as can't get pet partial to work, Sept. 15
//NOTE: In config index folder file anyway
//app.set("view engine", "hbs");
//app.set("views", path.join(__dirname, "views"));

//app.use(express.static(path.join(__dirname, "public")));

// default value for title local
const projectName = "host-a-pet";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

//NATASHA: change/addition added Sept. 15
//NATASHA: Commented this out for now as can't get pet partial to work, Sept. 15
// Register the location for handlebars partials here:
//hbs.registerPartials(path.join(__dirname, "/views/partials"));
//app.use(express.static(path.join(__dirname, "/public")));

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const profileRoutes = require("./routes/profile.routes");
app.use("/users", profileRoutes);

const petRoutes = require("./routes/pets.routes");
app.use("/pets", petRoutes);

//NATASHA: addition below made Sept. 15
const about = require("./routes/about");
app.use("/about", about);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
