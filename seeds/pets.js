const mongoose = require("mongoose");
const Pet = require("../models/Pets.model");

require("../db");

const pets = [
  {
    name: "Cocoa (calico) and Pippy (beige)",
    breed: "guinea pig",
    age: 1,
    photoUrl: "https://i.ibb.co/jHVqkVd/IMG-4614-copy.jpg",
    description:
      "Two sisters that love pets and attention. Cocoa is a shy and reserved lady, but gets along famously with her energetic, social sister. Both are always up for vitamin C, romaine lettuce, and morning jogs around their cage. Looking for a loving owner that will give them plenty of attention and care.",
    status: "Rented",
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
