const db = require('../database/database');
const mongodb = require('mongodb');

class Product {
    constructor(productData) {
        this.title=productData.title;
        this.category=productData.category;
        this.summary=productData.summary;
        this.price=+productData.price;
        this.description=productData.description;
        this.image=productData.image /* This is the image name */
        this.updateImageData();
        if(productData._id){
            this._id=productData._id.toString();
        }
    }

    /* Updating and Creating record */
    async save(){
        const productData={
            title:this.title,
            category:this.category,
            summary:this.summary,
            price:this.price,
            description:this.description,
            image:this.image
        }
        /* Check if it's updating or creating */
        /* It is updating */
        if(this._id){
            const productId = new mongodb.ObjectId(this._id);
            if(!this.image){
                delete productData.image;
            }
            await db.getDb().collection('products').updateOne({_id:productId},{$set:productData});
        }

        /* It is creating */
        else {
            await db.getDb().collection('products').insertOne(productData);
        }
    }

    static async findAllProducts(){
        const productList=await db.getDb().collection('products').find().toArray();
        return productList.map(function (product){
            return new Product(product);
        });
    }
    static async findAllProductsByCategory(category){
        const productList=await db.getDb().collection('products').find({category:category}).toArray();
        return productList.map(function (product){
            return new Product(product);
        });
    }

    static async findOneProduct(productId){
        let _id;
        try{
            _id = new mongodb.ObjectId(productId);
        }catch (e) {
            e.code=404;
            throw e;
        }

        const result= await db.getDb().collection('products').findOne({_id: _id});
        if(!result){
            const error = new Error('This product is not existed, please try another one');
            error.code=404;
            throw error;
        }
        return new Product(result);
    }

    static async deleteProduct(productId){
        let _id;
        try {
            _id = new mongodb.ObjectId(productId);
        }
        catch (e) {
            e.code=404;
            throw e;
            return;
        }

        await db.getDb().collection('products').deleteOne({_id:_id});
    }

    updateImageData(){
        this.imagePath = `product-data/images/${this.image}`;
        this.imageUrl = `/products/assets/images/${this.image}`;
    }

    replaceImageData(newImage){
        this.image=newImage;
        this.updateImageData();
    }
}
module.exports=Product;