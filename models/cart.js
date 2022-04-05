const Product = require('./product.js');
class Cart{
    constructor(items=[],totalQuantity=0,totalPrice=0) {
        this.items=items;
        this.totalQuantity=totalQuantity;
        this.totalPrice=totalPrice;
    }
    add(product){
        const cartItem={
            product:product,
            quantity:1,
            itemTotalPrice:product.price
        }
        for(let i=0;i<this.items.length;i++){
            const item=this.items[i];
            if(item.product._id===product._id){
                cartItem.quantity=item.quantity+1;
                cartItem.itemTotalPrice=item.itemTotalPrice+cartItem.itemTotalPrice;
                this.totalQuantity++;
                this.totalPrice+=product.price;
                this.items[i]=cartItem;

                return;
            }
        }
        this.items.push(cartItem);
        this.totalQuantity++;
        this.totalPrice+=cartItem.itemTotalPrice;
    }
    update(productId, newQuantity){
        for(let i=0;i<this.items.length;i++){
            let item=this.items[i];
            if(item.product._id===productId && newQuantity>0){
                const cartItem={...item};
                const oldQuantity=cartItem.quantity;

                cartItem.quantity=newQuantity;
                cartItem.totalPrice=newQuantity * cartItem.product.price;
                this.items[i]=cartItem;
                this.totalQuantity=this.totalQuantity+newQuantity-oldQuantity;

                this.totalPrice=this.totalPrice+(newQuantity-oldQuantity)*cartItem.product.price;
                return cartItem.totalPrice;
            }
            else if(item.product._id===productId && newQuantity<=0){
                this.items.splice(i, 1);
                this.totalQuantity=this.totalQuantity-item.quantity;
                this.totalPrice = this.totalPrice - item.totalPrice;
                return 0;
            }
        }
    }
    async updatePrices() {
        const productIds = this.items.map(function (item) {
            return item.product._id;
        });

        const products = await Product.findMultiple(productIds);

        const deletableCartItemProductIds = [];

        for (const cartItem of this.items) {
            const product = products.find(function (prod) {
                return prod._id === cartItem.product._id;
            });

            if (!product) {
                // product was deleted!
                // "schedule" for removal from cart
                deletableCartItemProductIds.push(cartItem.product._id);
                continue;
            }

            // product was not deleted
            // set product data and total price to latest price from database
            cartItem.product = product;
            cartItem.itemTotalPrice = cartItem.quantity * cartItem.product.price;
        }

        if (deletableCartItemProductIds.length > 0) {
            this.items = this.items.filter(function (item) {
                return deletableCartItemProductIds.indexOf(item.product._id) < 0;
            });
        }

        // re-calculate cart totals
        this.totalQuantity = 0;
        this.totalPrice = 0;

        for (const item of this.items) {
            this.totalQuantity = this.totalQuantity + item.quantity;
            this.totalPrice = this.totalPrice + item.itemTotalPrice;
        }
    }
}
module.exports=Cart;