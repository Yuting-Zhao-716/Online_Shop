const Product = require('../models/product');

function getCartPage(req, res, next) {
    res.render('./cartViews/cart.ejs');
}

async function addItem(req, res, next) {
    let product;
    try {
        product = await Product.findOneProduct(req.body.productId);
        console.log(product);
    } catch (e) {
        next(e);
        return;
    }
    const cart = res.locals.cart;
    cart.add(product);
    req.session.cart = cart;

    res.status(201).json({
        message: 'item added',
        newTotalItems: cart.totalQuantity
    })
}

async function updateCartItem(req, res) {
    const cart = res.locals.cart;
    const updateData = cart.update(req.body.productId, Number(req.body.quantity));
    req.session.cart = cart;
    res.json({
        message: 'Updated item',
        updatedCartData: {
            newTotalQuantity: cart.totalQuantity,
            newTotalPrice: cart.totalPrice,
            newItemPrice: updateData
        }
    })
}

module.exports = {
    addItem: addItem,
    getCartPage: getCartPage,
    updateCartItem: updateCartItem,

}