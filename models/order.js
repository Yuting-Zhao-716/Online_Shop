const db = require('../database/database');
const mongodb = require("mongodb");
class Order {
    /* Status: submitted--> Replied */
    constructor(cart, name, email, detail, status = 'submitted', date, orderId) {
        this.productData = cart;
        this.name = name;
        this.email = email;
        this.detail = detail;
        this.status = status;
        this.date = new Date(date);
        if (this.date) {
            this.formattedDate = this.date.toLocaleDateString('en-UK', {
                weekday: 'short', day: 'numeric', month: 'long', year: 'numeric'
            });
        }
        this._id = orderId;
    }

    save(){
        /* if it's updating the order */
        if(this._id){
            const orderId = new mongodb.ObjectId(this._id);
            return db
                .getDb()
                .collection('orders')
                .updateOne({ _id: orderId }, { $set: { status: this.status } });
        }
        /* if it's creating new order */
        else{
         const orderDocument ={
             productData:this.productData,
             name :this.name,
             email :this.email,
             detail :this.detail,
             status :this.status,
             date : new Date()
         }
            return db.getDb().collection('orders').insertOne(orderDocument);
        }
    }
    static transformOrderDocument(orderDoc) {
        return new Order(
            orderDoc.productData,
            orderDoc.name,
            orderDoc.email,
            orderDoc.detail,
            orderDoc.status,
            orderDoc.date,
            orderDoc._id
        );
    }

    static transformOrderDocuments(orderDocs) {
        return orderDocs.map(this.transformOrderDocument);
    }
    static async findAll() {
        const orders = await db
            .getDb()
            .collection('orders')
            .find()
            .sort({ _id: -1 })
            .toArray();

        return this.transformOrderDocuments(orders);
    }
    static async findById(orderId) {
        const order = await db
            .getDb()
            .collection('orders')
            .findOne({ _id: new mongodb.ObjectId(orderId) });

        return this.transformOrderDocument(order);
    }
}

module.exports = Order;