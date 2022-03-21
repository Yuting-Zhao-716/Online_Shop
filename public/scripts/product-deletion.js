const deleteButtonElements = document.querySelectorAll('.product-item-actions button');

async function deleteProduct(event){
    const product=event.target;
    const productId=product.dataset.productid;
    const csrf=product.dataset.csrf;

    const response=await fetch('/delete-product/'+productId+'?_csrf='+csrf,{
        method:'DELETE'
    });
    if(!response.ok){
        alert('Oops! Delete is not succeeded');
        return;
    }
    product.parentElement.parentElement.parentElement.parentElement.remove();
}

for(const deleteButtonElement of deleteButtonElements){
    deleteButtonElement.addEventListener('click', deleteProduct);
}