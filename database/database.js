const mongodb = require('mongodb');
const mongoClient=mongodb.MongoClient;
let database;
async function connect(){
    const client = await mongoClient.connect('mongodb://localhost:27017');
    database = client.db('SpeedfactoryNZ');
}
function getDb(){
    if(!database){
        throw new Error ('Database connection is not established yet');
    }
    return database;
}
module.exports={
    connectToDatabase:connect,
    getDb:getDb
}