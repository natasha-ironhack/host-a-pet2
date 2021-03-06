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
        res.redirect("/pets");
        //!! (`/pets/${pets._id} not working rn, switched to pets view for now)
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

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

router.get("/:breed", (req, res, next) => {
  const { breed } = req.params;
  console.log(breed); // => "Guinea-Pig"

  let cleanBreed = "";
  for (let char of breed) {
    if (char === "-") {
      cleanBreed += " ";
    } else {
      cleanBreed += char;
    }
  }

  // const cleanBreed = breed.replace("-", " ")
  // "Guinea Pig"

  Pet.find({ breed: cleanBreed })
    .then((pets) => {
      //console.log("All the pets:", pets);
      res.render("pets/pets-list", { pets });
    })
    .catch((err) => {
      console.log("Error listing all pets", err);
    });
});

module.exports = router;
