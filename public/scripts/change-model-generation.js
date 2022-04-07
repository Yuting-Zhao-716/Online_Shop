const brandDropdownElement = document.getElementById('brand');
const modelDropdownElement = document.getElementById('model');
const generationDropdownElement = document.getElementById('generation');

async function chooseBrand() {
    const option = brandDropdownElement.value;
    let response;
    try{
        response = await fetch(`/find-model/${option}`);
    }catch (e) {
        alert('response failed');
        return;
    }
    const responseData=await response.json();

    modelDropdownElement.innerHTML = '<option value="">Please select a model</option>';
    for(let i=0;i<responseData.models.length;i++){
        let optionElement = document.createElement('option');
        optionElement.text=responseData.models[i];
        optionElement.value=responseData.models[i];
        modelDropdownElement.append(optionElement);
    }
}

brandDropdownElement.addEventListener('change', chooseBrand);

async function chooseGeneration() {
    const option = modelDropdownElement.value;
    let response;
    try{
        response = await fetch(`/find-generation/${option}`);
    }catch (e) {
        alert('response failed');
        return;
    }
    const responseData=await response.json();

    generationDropdownElement.innerHTML = '<option value="">Please select a generation</option>';

    for(let i=0;i<responseData.generations.length;i++){
        let optionElement = document.createElement('option');
        optionElement.text=responseData.generations[i];
        optionElement.value=responseData.generations[i];
        generationDropdownElement.append(optionElement);
    }
}

modelDropdownElement.addEventListener('change', chooseGeneration);