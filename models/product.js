const db = require('../database/database');
const mongodb = require('mongodb');

class Product {
    constructor(productData) {
        this.title=productData.title;
        this.summary=productData.summary;
        this.price=+productData.price;
        this.description=productData.description;
        this.image=productData.image /* This is the image name */
        if(productData._id){
            this._id=productData._id.toString();
        }
    }

    /* Updating and Creating record */
    async save(){
        const productData={
            title:this.title,
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


}
module.exports=Product;