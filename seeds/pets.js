const mongoose = require("mongoose");
const Pet = require("../models/Pets.model");

require("../db");

//added another pet as a test
const pets = [
  {
    name: "Cocoa (calico) and Pippy (beige)",
    breed: "Guinea Pig",
    age: 1,
    photoUrl: "https://i.ibb.co/jHVqkVd/IMG-4614-copy.jpg",
    description:
      "Two sisters that love pets and attention. Cocoa is a shy and reserved lady, but gets along famously with her energetic, social sister. Both are always up for vitamin C, romaine lettuce, and morning jogs around their cage. Looking for a loving owner that will give them plenty of attention and care.",
    available: true,
  },

  {
    name: "Brassy and Marshmallow",
    breed: "Guinea Pig",
    age: 1,
    photoUrl:
      "https://i.ibb.co/4P9ZWcF/a-pair-of-guinea-pigs-20851283776603-OPlo.jpg",
    description:
      "Brassy and Marshmallow are the best of friends. Both are social hyperactive teenagers that thrive on attention and bananas. Brassy can be a little dominant and bossy, with Marshallow being a bit more timid, but they always solve their problems within minutes. Looking for an owner that will shower them with love and attention.",
    available: true,
  },
];

Pet.create(pets)
  .then((createdPets) => {
    console.log(`Created ${createdPets.length} pets`);

    // once they're created, close the connection
    mongoose.connection.close();
  })
  .catch((error) =>
    console.log("An error occured on the book creation", error)
  );
