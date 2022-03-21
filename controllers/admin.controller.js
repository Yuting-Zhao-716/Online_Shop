const Product = require('../models/product');


async function getProductManagementPage(req,res,next){
    let productList;
    try{
        productList=await Product.findAllProducts();
        res.render('./adminViews/product-management',{productList:productList});
    }catch (e) {
        next(e);
    }
}

async function getUpdateProductPage(req,res,next){
    const productId=req.params.id;
    console.log(productId);
    try{
        const result=await Product.findOneProduct(productId);
        console.log(result);
        res.render('./adminViews/update-product.ejs',{product:result});
    }catch (e) {
        next(e);
    }

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

async function postUpdatePage(req,res,next){
    const updatedProduct= new Product({...req.body,_id:req.params.id});
    console.log(updatedProduct);
    if(req.file){
        updatedProduct.replaceImageData(req.file.filename);
    }
    try{
        await updatedProduct.save();
        res.redirect('/product-management');
    }
    catch (e) {
        next(e);
    }
}

async function deleteProduct(req,res,next){
    const productId= req.params.id;
    try{
        await Product.deleteProduct(productId);
    }catch (e) {
        next(e);
        return;
    }
    res.json({message: 'Deleted Item'});
}

module.exports={
    getProductManagementPage:getProductManagementPage,
    getNewProductPage:getNewProductPage,
    postNewProduct:postNewProduct,
    getUpdateProductPage:getUpdateProductPage,
    postUpdatePage:postUpdatePage,
    deleteProduct:deleteProduct,
}