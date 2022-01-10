/*
Integrating MongoDB with Node.js, database of fruits using Node.js Driver!

Install npm --> npm init

Install node.js driver --> npm install mongodb

Before running this project MongoDB server must be up and running!

After running this project go to the MongoDB shell ternimal and type --> show dbs 
You will see the database 'fruitsDB' created 

Reference for coding Query to the MongoDB 
https://docs.mongodb.com/drivers/node/current/

*/


const { MongoClient } = require("mongodb");
const assert = require("assert");

//connection URL
const url = 'mongodb://localhost:27017'; 

//Database Name, which will be created in MongoDB 
const dbName = "fruitsDB"; 

//Create a new MongoClient
const client = new MongoClient(url, {useNewUrlParser: true}); 

//Use connect method to connect db to server 
//NOTE: Your MongoDB server needs to be up and running 
client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected Successfully to server");

    const db = client.db(dbName); 

    //inserting docs 
    insertDoc(db, function(){
        client.close(); //once done close client 
    }); 

    //find docs, this will print all the records in the database to console
    // findDocs(db, function(){
    //     client.close(); //once done close client 
    // }); 
}); 


//insert or create collections function used above
const insertDoc = function(db, callback){

    //get the docs collection
    const collection = db.collection('fruits');

    //insert some docs into fruitsDB 
    collection.insertMany([
        {
            name: "Apple",
            rating: 5
        },
        {
            name: "Banana",
            rating: 7
        },
        {
            name: "Orange",
            rating: 2
        }
    ], function(err, result){
        assert.equal(err, null);  //check no error 
        assert.equal(3,result.insertedCount); //check all 3 inserted 
        assert.equal(3,Object.keys(result.insertedIds).length); //check all 3 inserted 
        console.log("Inserted 3 documents into the collection"); 
        callback(result); 
    }
    
    )
}


//function to find (query) the insert data 
const findDocs = function(db, callback){
    //get docs collection 
    const collection = db.collection('fruits');

    //find docs and append it to an array, and console log it to see that the inserted data 
    collection.find({}).toArray(function(err,fruits){
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(fruits); 
        callback(fruits); 
    });
}