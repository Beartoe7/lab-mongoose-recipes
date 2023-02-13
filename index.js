const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data
 = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
      // Run your code here, after you have insured that the connection was made
    return Recipe.create({
            title: "Cheese Omelette",
            level: ["Easy Peasy"],
            ingredients: ["Eggs", "Cheese", "Butter"],
            cuisine: "American",
            dishType: "breakfast",
            image: "https://www.allrecipes.com/recipe/262696/cheese-omelette/",
            duration: 10,
            creator: "Roberto",
            created: "2023-02-10"

        })
      })
      .then(omeletteRecipe => {
        console.log(omeletteRecipe.title)
      })
      .then(()=> {
        return Recipe.insertMany(data)
      })

      .then(response =>{
        response.forEach(response=>{
          console.log(response.title)
        })
      })

        .then(()=>{
          return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovesse"}, {duration: 100}, {new:true})
        })

      .then(()=>{
          console.log("Success")
        })
      
        .then(()=> {
          return Recipe.deleteOne({title: "Carrot Cake"})
        })
        
      .then(()=>{
        console.log("Success")
      })
      .finally(()=>{
        mongoose.connection.close();
        console.log("Closed mongoose connection")
      })


      
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
