const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";
mongoose.set("strictQuery", true);
const data = require("./data.json");

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    const meat = {
      title: "meat",
      level: "Easy Peasy",
      ingredients: ["me", "water"],
      cuisine: "all",
    };
    const bread = {
      title: "bread",
      level: "Easy Peasy",
      ingredients: ["flower", "water"],
      cuisine: "all",
    };
    const pizza = {
      title: "pizza",
      level: "Easy Peasy",
      ingredients: ["flower", "tomato"],
      cuisine: "italian",
    };
    Recipe.create(pizza, bread, meat)
      .then(() => console.log(`Added Recipe: ${pizza.title} ${bread.title}`))
      .catch((error) => console.log("An error adding:", error));
  })
  .then(async () => {
    const newData = await Recipe.insertMany(data);
    newData.forEach((one) => {
      console.log(`Added Recipe: ${one.title}`);
    });
  })
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then((updatedRecipe) => {
    if (updatedRecipe) {
      console.log("Successfully updated ");
    } else {
      console.log(error);
    }
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((deletedRecipe) => {
    if (deletedRecipe) {
      console.log("Successfully deleted ");
    } else {
      console.log(error);
    }
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
