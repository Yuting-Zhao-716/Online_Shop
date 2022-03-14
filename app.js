const express = require('express');
const app= express();
const path = require('path');

/* Importing Database */
const db = require('./database/database');

/* Importing middlewares */
const errorHandlingMiddleware = require('./middleware/errorHandling');

/* Importing Routes */
const baseRoute = require('./routes/base.route.js');
const authRoute = require('./routes/auth.routes');


/* Setting up the template as EJS */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* Setting up the public scripts and styles folder */
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}))

/* This is the routes part */
app.use(baseRoute);
app.use(authRoute);
app.use(errorHandlingMiddleware);


/* Connecting to DB and then listen to port 3000 */
db.connectToDatabase().then(function () {
    app.listen(3000);
}).catch(function (error) {
    console.log('Failed to connect to the database');
    console.log(error);
});