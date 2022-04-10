const addCartButtonElement = document.querySelector('#product-info button');
const badgeElement = document.querySelector('span.badge');

async function addToCart() {
    const productId = addCartButtonElement.dataset.productid;
    const csrf = addCartButtonElement.dataset.csrf;
    let response;
    try {
        response = await fetch('/cart/items', {
            method: 'post',
            body: JSON.stringify({
                productId: productId,
                _csrf: csrf
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }catch (e) {
        alert('something went wrong');
        return;
    }
    if (!response.ok) {
        alert('response not ok');
        return;
    }
    const responseData= await response.json();
    badgeElement.textContent=responseData.newTotalItems;
}

addCartButtonElement.addEventListener('click', addToCart);