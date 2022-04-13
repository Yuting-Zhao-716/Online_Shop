const session = require('express-session');
const mongodbStore = require('connect-mongodb-session');

function getSessionStore(){
    let mongodbUrl='mongodb://localhost:27017';
    if(process.env.MONGODB_URL){
        mongodbUrl=process.env.MONGODB_URL;
    }
    const MongodbStore = mongodbStore(session);
    const sessionStore=new MongodbStore({
        uri:mongodbUrl,
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