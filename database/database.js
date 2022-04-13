const mongodb = require('mongodb');
const mongoClient=mongodb.MongoClient;
let database;

let mongodbUrl='mongodb://localhost:27017';
if(process.env.MONGODB_URL){
    mongodbUrl=process.env.MONGODB_URL;
}
async function connect(){
    const client = await mongoClient.connect(mongodbUrl);
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