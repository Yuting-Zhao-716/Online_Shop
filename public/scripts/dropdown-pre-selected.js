const optionsElements= document.querySelectorAll('#category option');
const cateResultElement = document.getElementById('cate-result');

const cateResult= cateResultElement.value;

for(const optionElement of optionsElements){
    if(optionElement.value===cateResult){
        optionElement.selected='selected';
    };
}
