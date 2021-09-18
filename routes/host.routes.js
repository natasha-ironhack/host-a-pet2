//need pet and user
/*
JORGE'S STEPS ON WHAT TO DO
 1. when button clicked will need to have a route and pass as a param the ID of the pet. can say reserve/:id
inside the route will need to:
2. create the reservation object
    the reservation will have the pet id and user id
3. then need to go into pet .model and change that pet to be not available
*/

const { findByIdAndUpdate } = require("../models/Pets.model");

const router = require("express").Router();

//here we need to pass in the param ID of pet
router.post("/:petId/reserve", (req, res) => {
  const { petId } = req.params;
  //need userId
  const userId = req.session.loggedInUser._id;

  //create the reservation object
  //need another promise. need to edit one pet
  HostModel.create();
  findByIdAndUpdate(available).then((available) => {});
  //then do , and another findByIdAndUpdate
});

/*
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
*/
