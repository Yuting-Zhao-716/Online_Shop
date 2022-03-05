const express = require('express');
const app= express();
const path = require('path');
const baseRoute = require('./routes/base.route.js');

/* Setting up the template as EJS */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* This is the routes part */
app.use(baseRoute);

app.listen(3000);