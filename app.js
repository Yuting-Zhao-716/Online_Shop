const express = require('express');
const app= express();
const path = require('path');

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

app.listen(3000);