const express = require('express');
const app= express();
const path = require('path');
const csrf = require('csurf');

/* Importing Database */
const db = require('./database/database');

/* Importing Sessions */
const session = require('express-session');
const getSessionConfig = require('./config/session');

/* Importing middlewares */
const errorHandlingMiddleware = require('./middleware/errorHandling');
const checkAuthenticationMiddleware = require('./middleware/checkAuthentication');
const addCSRFTokenMiddleware = require('./middleware/csrfToken');
const protectAdminRoutesMiddleware = require('./middleware/protect-admin-routes');
const cartInitializerMiddleware = require('./middleware/cartInitializer');
const updateCartPriceMiddleware = require('./middleware/update-cart-price');

/* Importing Routes */
const baseRoute = require('./routes/base.route.js');
const authRoute = require('./routes/auth.routes');
const adminRoute = require('./routes/admin.routes');
const productRoute = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');
const categoryRoutes = require('./routes/category.routes');

/* --------------Importing done ------------- */

/* Setting up the template as EJS */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* Setting up the public scripts and styles folder */
app.use(express.static('public'));
app.use('/products/assets',express.static('product-data'));
app.use(express.urlencoded({extended: false}))   // for handling form submission data.
app.use(express.json());                                // for handling AJAX submission data.

/* Using sessions on all incoming requests */
const sessionConfig=getSessionConfig();
app.use(session(sessionConfig));

/* Adding authentication to res.locals */
app.use(checkAuthenticationMiddleware);

/* Adding CSRF token to res.locals */
app.use(csrf());
app.use(addCSRFTokenMiddleware);

/* Adding Cart to res.locals */
app.use(cartInitializerMiddleware);
app.use(updateCartPriceMiddleware);

/* This is the routes part */
app.use(baseRoute);
app.use(authRoute);
app.use(productRoute);
app.use('/cart',cartRoutes);
app.use('/order', orderRoutes);
app.use(protectAdminRoutesMiddleware);
app.use(adminRoute);
app.use(categoryRoutes);
app.use(errorHandlingMiddleware);


/* Connecting to DB and then listen to port 3000 */
db.connectToDatabase().then(function () {
    app.listen(3000);
}).catch(function (error) {
    console.log('Failed to connect to the database');
    console.log(error);
});