const burgerButtonElement = document.getElementById('mobile-menu-btn');
const mobileMenuElement = document.getElementById('mobile-menu');

function switchPage(){
    if(mobileMenuElement.style.display=='flex'){
        mobileMenuElement.style.display = 'none';
    }else{
        mobileMenuElement.style.display = 'flex';
    }
}

burgerButtonElement.addEventListener('click', switchPage);
