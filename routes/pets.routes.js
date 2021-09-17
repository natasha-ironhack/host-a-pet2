const router = require("express").Router();
const Pet = require("../models/Pets.model");

router.get("/", (req, res, next) => {
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
router.get("/create", (req, res) => {
  res.render("pets/create");
});

// hostedby is object id, how to deconstruct

router.post("/create", (req, res) => {
  console.log(req.body);
  //should be photo not photoUrl cuz name (in the const { } and create)
  const { name, breed, age, description, status } = req.body;
  Pet.create({ name, breed, age, description, status })
    .then((pet) => {
      console.log("Created pet:", pet);
      //not redirecting to pets-list
      res.redirect("pets/pets-list");
    })
    .catch((err) => {
      console.log("Error creating pet", err);
    });
});

router.get("/:id", (req, res, next) => {
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

router.get("/:id/edit", (req, res) => {
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

router.post("/:id/edit", (req, res) => {
  const { id } = req.params;
  const { name, breed, age, photoUrl, description, status, hostedby } =
    req.body;
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

//NATASHA: Host route added Sept. 17
router.get("/:id/host", (req, res) => {
  const { id } = req.params;
  Pet.findById(id)
    .then((pet) => {
      console.log("Here's your reservation page:", pet);
      res.render("pets/host", { pet });
    })
    .catch((err) => {
      console.log(err);
    });
});

//NATASHA: Added success route Sept. 17th
router.post("/:id/success", (req, res) => {
  const { id } = req.params;
  Pet.findById(id)
    .then((pet) => {
      res.render("pets/success", { pet });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/:id/delete", (req, res) => {
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
