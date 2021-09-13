const router = require("express").Router();
const Pet = require("../models/Pets.model");

router.get("/pets", (req, res, next) => {
  Pet.find()
    .then((pets) => {
      console.log("All the pets:", pets);
      res.render("pets/pets-list", { pets });
    })
    .catch((err) => {
      console.log("Error listing all pets", err);
    });
});

// needs auth to see
router.get("/pets/create", (req, res) => {
  res.render("pets/create");
});

// hostedby is object id, how to deconstruct

router.post("/pets/create", (req, res) => {
  console.log(req.body);
  const { name, breed, age, photoUrl, description, status, hostedby } =
    req.body;
  Pet.create({ name, breed, age, photoUrl, description, status, hostedby })
    .then((pet) => {
      console.log("Created pet:", pet);
      res.redirect("/pets-list");
    })
    .catch((err) => {
      console.log("Error creating pet", err);
    });
});

router.get("/pets/:id", (req, res, next) => {
  const { id } = req.params;
  Pet.findById(id)
    .then((pet) => {
      console.log("Here's your pet:", pet);
      res.render("pets/details", { pet });
    })
    .catch((err) => {
      console.log("Error finding pet", err);
    });
});

router.get("/pets/:id/edit", (req, res) => {
  const { id } = req.params;
  Pet.findById(id)
    .then((pet) => {
      console.log("Here's your pet:", pet);
      res.render("pets/edit", { pet });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/books/:id/edit", (req, res) => {
  const { id } = req.params;
  const { title, author, description, rating } = req.body;
  Pet.findByIdAndUpdate(
    id,
    { name, breed, age, photoUrl, description, status, hostedby },
    { new: true }
  )
    .then((pet) => {
      console.log("Here's the pet you edited:", pet);
      res.redirect(`/pets/${pet._id}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/pets/:id/delete", (req, res) => {
  const { id } = req.params;
  Pet.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/pets");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;