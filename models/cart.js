class Cart{
    constructor(items=[],totalQuantity=0,totalPrice=0) {
        this.items=items;
        this.totalQuantity=totalQuantity;
        this.totalPrice=totalPrice;
    }
    add(product){
        const newItem={
            product:product,
            quantity:1,
            itemTotalPrice:product.price
        }
        for(let i=0;i<this.items.length;i++){
            const item=this.items[i];
            if(item.product._id===newItem.product._id){
                newItem.quantity=item.quantity+1;
                newItem.itemTotalPrice=item.itemTotalPrice+newItem.itemTotalPrice;
                this.totalQuantity++;
                this.totalPrice+=newItem.product.price;
                this.items[i]=newItem;

                return;
            }
        }
        this.items.push(newItem);
        this.totalQuantity++;
        this.totalPrice+=newItem.itemTotalPrice;
    }
    update(productId, newQuantity){
        /* The user wants to update the cart items */
        if(newQuantity>0){
            for(let i=0;i<this.items.length;i++){
                const item=this.items[i];
               if(item.product._id===productId){
                   this.items[i].quantity=newQuantity;
                   this.items[i].itemTotalPrice=newQuantity*item.product.price;
                   this.totalQuantity=this.totalQuantity-item.quantity+newQuantity;
                   this.totalPrice= this.totalPrice-item.itemTotalPrice+item.product.price*newQuantity;
                   return {newItemPrice:this.items[i].itemTotalPrice};
               }
            }
        }
        /* The user wants to delete item */
        else {
            for(let i=0;i<this.items.length;i++){
                const item=this.items[i];
                if(item.product._id===productId){
                    this.items.splice(i,1);
                    this.totalQuantity-=item.quantity;
                    this.totalPrice-=item.itemTotalPrice;
                    return {newItemPrice:0};
                }
            }
        }
    }
}
module.exports=Cart;