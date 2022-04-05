const Order = require('../models/order');

async function getOrderPage(req,res,next){
    try {
        const orders = await Order.findAll();
        res.render('customer/orders/all-orders', {
            orders: orders,
        });
    } catch (error) {
        next(error);
    }
    res.render('./orderViews/all-order.ejs');
}
async function postOrder(req,res,next){
    const cart=res.locals.cart;
    const user=req.body;
    const order= new Order(cart,user.name,user.email,user.detail);
    try{
        await order.save();
    }catch (e) {
        next(e);
        return;
    }
    req.session.cart=null;
    res.redirect('/order');
}

module.exports={
    postOrder:postOrder,
    getOrderPage:getOrderPage,
}