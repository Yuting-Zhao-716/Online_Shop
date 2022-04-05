/*const imagePreviewElement = document.getElementsByClassName('image-preview')[0];
const imagePickerElement = document.getElementById('image');

function addPreview(){
    const files=imagePickerElement.files;

    if(!files||files.length===0){
        imagePreviewElement.style.display = 'none';
        return;
    }
    const pickedFile = files[0];
    imagePreviewElement.src = URL.createObjectURL(pickedFile);
    imagePreviewElement.style.display = 'block';

}

imagePickerElement.addEventListener('change', addPreview);*/

const imagePreviewElements = document.getElementsByClassName('image-preview');
const imagePickerElement = document.getElementById('image');

function addPreview(){
    const files=imagePickerElement.files;

    if(!files||files.length===0){
        for(const imagePreviewElement of imagePreviewElements){
            imagePreviewElement.style.display = 'none';
        }
        return;
    }
    const pickedFile = files;
    for(let i=0;i<pickedFile.length;i++){
        imagePreviewElements[i].src = URL.createObjectURL(pickedFile[i]);
        imagePreviewElements[i].style.display = 'block';
    }
}

imagePickerElement.addEventListener('change', addPreview);