const updateFormsElements=document.querySelectorAll('.cart-item-management');
const badgeElement= document.querySelector('span.badge');
const cartTotalPriceElement = document.getElementById('cart-total-price');

async function updateCart(event){
    event.preventDefault();
    const form=event.target;
    const productId=form.dataset.productid;
    const csrf=form.dataset.csrf;
    const newQuantity=form.firstElementChild.value;
    let response;

    try{
        response= await fetch('/cart/items',{
            method:'PATCH',
            body:JSON.stringify({
                productId:productId,
                _csrf:csrf,
                quantity:newQuantity
            }),
            headers:{
                'Content-Type':'application/json'
            }
        })
    }catch (e) {
        alert('response failed');
        return;
    }

    if(!response.ok){
        alert('update failed');
        return;
    }
    const responseData=await response.json();
    console.log(responseData);
    /* check if the item is totally removed */
    if(responseData.updatedCartData.newItemPrice===0){
        form.parentElement.parentElement.parentElement.remove();
    }else{
        const cartItemTotalPriceElement = event.target.parentElement.parentElement.querySelector('.cart-item-price');
        cartItemTotalPriceElement.textContent = responseData.updatedCartData.newItemPrice.toFixed(2);
    }

    cartTotalPriceElement.textContent = responseData.updatedCartData.newTotalPrice.toFixed(2);

    badgeElement.textContent=responseData.updatedCartData.newTotalQuantity;

}


for(const formElements of updateFormsElements){
    formElements.addEventListener('submit', updateCart);
}