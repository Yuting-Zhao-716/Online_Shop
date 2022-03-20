const Product = require('../models/product');

function getProductManagementPage(req,res){
    res.render('./adminViews/product-management');
}

function getNewProductPage(req,res){
    res.render('./adminViews/new-product');
}

async function postNewProduct(req, res,next){

    const newProduct=new Product({...req.body,image:req.file.filename})
    try{
        await newProduct.save();
    }catch (e) {
        next(e);
        return;
    }
    res.redirect('/product-management');
}

module.exports={
    getProductManagementPage:getProductManagementPage,
    getNewProductPage:getNewProductPage,
    postNewProduct:postNewProduct,
}