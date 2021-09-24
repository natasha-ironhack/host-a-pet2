const mongoose = require("mongoose");
const Pet = require("../models/Pets.model");

require("../db");

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
  {
    name: "Esme, Gytha and Magrat",
    breed: "Mouse",
    age: 0.5,
    photoUrl: "https://i.ibb.co/FnWBxF5/010821-cw-pain-mice-feat-1030x580.jpg",
    description:
      "Our three young girls are looking for a home together. They are always up to some mischief and are so much fun to watch. They love flying round their cage sniffing out their favourite berries then having a friendly squabble over who gets to sit on top of who.",
    available: true,
  },
  {
    name: "Ginnerva",
    breed: "Hamster",
    age: 0.5,
    photoUrl:
      "https://i.ibb.co/SKBnFSD/Screen-Shot-2021-09-14-at-6-49-10-PM.png",
    description:
      "Ginnerva is a teenager that likes to run and explore her surroundings. While she does not mind the occasional pet from her owner, she appreciates them much more when there are carrots involved. Looking for an owner that can keep up with her energy and demands.",
    available: true,
  },
  {
    name: "Mas and Menos",
    breed: "Gerbil",
    age: 0.5,
    photoUrl: "https://i.ibb.co/fx9xPfj/Mongolische-Wuestenrennmaus.jpg",
    description:
      "Mas and Menos are energetic teenagers that love to run around as fast as they can. When they're not running around, they're wrestling with each other for the last carrot in their bowl. Both get along well together, as well as with their owner. Looking for a forever home.",
    available: true,
  },
  {
    name: "Mince and Chopper",
    breed: "Gerbil",
    age: 2,
    photoUrl:
      "https://i.ibb.co/gZWg5hC/Screen-Shot-2021-09-14-at-7-00-05-PM.pngg",
    description:
      "Two boys that never get tired. Along with wheel runs and playtime in the grass, they enjoy apples and fennel. Chopper is a little blind in his left eye, but has no problem navigating around his surroundings. Looking for an owner that will give them love and attention.",
    available: false,
  },
  {
    name: "Cloudy",
    breed: "Hamster",
    age: 1,
    photoUrl:
      "https://i.ibb.co/DYXcLZ5/hamster-held-hands-Thinkstock-Photos-514298845.jpg",
    description:
      "Cloudy is a spunky little man. While he might not like long pets, he does appreciate play time with his owner. Likes almond nuts and running on his wheel.",
    available: false,
  },
  {
    name: "Herbert",
    breed: "Rat",
    age: 2,
    photoUrl: "https://i.ibb.co/cFw1C7h/download.jpg",
    description:
      "Herbert is an elderly gentleman who's looking for a nice retirement home. He's not always had company so he would do well with other rats or only humans who can give him a lot of attention. He Likes to cuddle and snuggle up alongside and watch TV.",
    available: true,
  },
  {
    name: "Onyx and Lady",
    breed: "Gerbil",
    age: 1,
    photoUrl: "https://i.ibb.co/0C4XZ9H/9a1e7836d5ff45572c80ec8ace37aa2c.jpg",
    description:
      "Onyx and Lady are sisters that love pets and rubs from their owner. When they’re not running around their cage, they can be seen chatting with each other over an afternoon fruit salad. Looking for an owner that will shower them with love and affection.",
    available: false,
  },
  {
    name: "Patrick and Tom",
    breed: "Guinea Pig",
    age: 3,
    photoUrl: "https://i.ibb.co/QH4tkk4/Get-To-Know-Guinea-Pigs.jpg",
    description:
      "Patrick and Tom are brothers that get along very well with each other. Both are quite reserved in nature, but love a good head rub every now and then. Their favorite snacks are romaine lettuce and cherry tomatoes. Looking for a careful, mature owner.",
    available: true,
  },
  {
    name: "Buttercup",
    breed: "Hamster",
    age: 1,
    photoUrl:
      "https://i.ibb.co/GFbSHWm/Screen-Shot-2021-09-14-at-6-49-40-PM.png",
    description:
      "Buttercup is a sweet, lovely hamster that is looking for a new owner. She likes sunflower seeds, pets from her owner, and exercise.",
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
