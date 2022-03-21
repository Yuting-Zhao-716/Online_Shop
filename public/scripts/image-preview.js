const imagePreviewElement = document.getElementsByClassName('image-preview')[0];
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

imagePickerElement.addEventListener('change', addPreview);
