const router = require("express").Router();
const Pet = require("../models/Pets.model");
const { isAdmin } = require("../middlewares/auth.middlewares");

const fileUploader = require("../middlewares/cloudinary.config");

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
router.get("/create", isAdmin, (req, res) => {
  res.render("pets/create");
});

// hostedby is object id, how to deconstruct

router.post("/create", isAdmin, fileUploader.single("photoUrl"), (req, res) => {
  console.log(req.body);

  //should be photo not photoUrl cuz name (in the const { } and create)
  const { name, breed, age, description, available } = req.body;
  const photoUrl = req.file.path;
  Pet.create({ name, breed, age, photoUrl, description, available })
    .then((pet) => {
      console.log("Created pet:", pet);
      //need to redirect to pets route
      res.redirect("/pets");
    })
    .catch((err) => {
      console.log("Error creating pet", err);
    });
});

//changed from .get to .post sept. 19
router.post("/:id", (req, res, next) => {
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

router.get("/:id/edit", isAdmin, (req, res) => {
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

router.post(
  "/:id/edit",
  isAdmin,
  fileUploader.single("photoUrl"),
  (req, res) => {
    const { id } = req.params;
    const { name, breed, age, description, available } = req.body;
    const photoUrl = req.file.path;
    Pet.findByIdAndUpdate(
      id,
      { name, breed, age, photoUrl, description, available },
      { new: true }
    )
      .then((pet) => {
        console.log("Here's the pet you edited:", pet);
        res.redirect(`/pets/${pet._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

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
/*
router.post("/:id/success", (req, res) => {
  const { id } = req.params;
  Pet.findById(id)
    .then((pet) => {
      res.render("host/success", { pet });
    })
    .catch((err) => {
      console.log(err);
    });
});
*/

/*
 when button clicked will need to have a route and pass as a param the ID of the pet. can say reserve/:id
inside the route will need to:
create the reservation object
the reservation will have the pet id and user id
then need to go into pet .model and change that pet to be not available
*/

router.post("/:id/delete", isAdmin, (req, res) => {
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
