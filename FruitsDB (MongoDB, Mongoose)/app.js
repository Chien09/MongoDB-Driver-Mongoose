/*
Integrating MongoDB with Node.js, database of fruits using Mongoose! 

Install npm --> npm init

Install mongoose --> npm install mongoose

Before running this project MongoDB server must be up and running!

After running this project go to the MongoDB shell ternimal and type --> show dbs 
You will see the database 'fruitsDB' created 

*/

const mongoose = require('mongoose');

//connect to MongoDB server, and create or look for and link to the 'fruitsDB' 
mongoose.connect('mongodb://localhost:27017/fruitsDB', {useNewUrlParser: true});

//create schema, includes "validator" or requirment for rating to be between (0 - 10) inorder to be inserted
//as well as name is required 
//reference for "validator" https://mongoosejs.com/docs/validation.html
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Check Data Entry']
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
    },
    review: String, 
}); 

//model, creating a new collection Fruit and follow the fruitSchema
//"Fruit" will be automatically change name into "fruits" when collection stored
//EXAMPLE if it is --> const Person = mongoose.model("Person", personSchema) 
//then it will automatically be stored as "people" collection 
const Fruit = mongoose.model("Fruit", fruitSchema)

//creating the fruit doc to inserted into DB 
const Apple = new Fruit({
    name: "Apple",
    rating: 5,
    review: "Netural flavor fruit"
}); 

//saving the fruit into a Fruit collection and then saving into the fruitsDB
Apple.save(); 


//inserting many fruits 
const Kiwi = new Fruit({
    name: "Kiwi",
    rating: 7,
    review: "Beautiful and Sour"
});

const Banana = new Fruit({
    name: "Banana",
    rating: 8,
    review: "Long and yellow"
});

//insert all fruit docs ----------------------------
Fruit.insertMany([Kiwi, Banana], function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Successfully saved all fruits to fruitsDB!"); 
    }
});


//find() with callback function if found or not ----------------------------
Fruit.find(function(err, fruits){
    if(err){
        console.log(err);
    } else{

        //print all data. which is return as a array of fruits objects
        console.log(fruits); 

        //print all fruit names
        fruits.forEach(function(element){
            console.log(element.name); 
        }); 

        //close the connection or else it will not close the program 
        //mongoose.connection.close(); 
    }
});


//Upate rating of object, you can check object id by printing on console using find() -------------
Fruit.updateOne({_id: "61dc2dc37e827acd6428ea70"}, {rating: 6}, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Successfully updated document!"); 
    }
}); 


//Delete One--------------------------
Fruit.deleteOne({name: "Apple"}, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Delete successfully!"); 
    }
}); 

//Delete Many -------------------------
Fruit.deleteMany({rating: 0}, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Delete successfully!"); 
    }
});



//Esthablish relationships we create a new person data -------------------
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Check Data Entry']
    },
    favoriteFruit: fruitSchema,   //binds a relationship with fruit 
}); 


const Person = mongoose.model("Person", personSchema); 

const person1 = new Person({
    name: "Jack",
    favoriteFruit: Apple
});

person1.save(); 

Person.find(function(err, people){
    if(err){
        console.log(err);
    } else{
        console.log(people); 

        //close the connection or else it will not close the program 
        //mongoose.connection.close(); 
    }
});




