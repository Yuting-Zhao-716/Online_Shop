const db = require('../database/database');
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
}

module.exports = Order;