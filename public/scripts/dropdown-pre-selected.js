const optionsElements= document.querySelectorAll('#category option');
const cateResultElement = document.getElementById('cate-result');

const cateResult= cateResultElement.value;

for(const optionElement of optionsElements){
    if(optionElement.value===cateResult){
        optionElement.selected='selected';
    };
}

const materialOptionsElements= document.querySelectorAll('#material option');
const materialResultElement = document.getElementById('material-result');

const materialResult= materialResultElement.value;

for(const materialElement of materialOptionsElements){
    if(materialElement.value===materialResult){
        materialElement.selected='selected';
    };
}

