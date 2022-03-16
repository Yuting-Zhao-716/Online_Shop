const session = require('express-session');
const mongodbStore = require('connect-mongodb-session');

function getSessionStore(){
    const MongodbStore = mongodbStore(session);
    const sessionStore=new MongodbStore({
        uri:'mongodb://localhost:27017',
        databaseName: 'SpeedfactoryNZ',
        collection:'sessions'});
    return sessionStore;
}
function getSessionConfig(){
    return {
        secret: 'SpeedfactoryNZ company',
        resave: false,
        saveUninitialized: false,
        store:getSessionStore(),
        cookie:{
            maxAge:2*24*60*60*1000
        }
    }
}

module.exports=getSessionConfig;