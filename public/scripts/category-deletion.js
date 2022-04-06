const deleteButtonElements = document.querySelectorAll('#deleteButton');

async function deleteCategory(event) {
    const element = event.target;
    let response;
    try {
        response = await fetch('/category-management', {
            method: 'post',
            body: JSON.stringify({
                _csrf: element.dataset.csrf,
                categoryId: element.dataset.categoryid
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (e) {
        alert('delete category failed');
        return;
    }
    if (!response.ok) {
        alert('response not successful');
        return;
    }
    const responseData = await response.json();
    element.parentElement.parentElement.parentElement.parentElement.remove();
}

for (const deleteButtonElement of deleteButtonElements) {
    deleteButtonElement.addEventListener('click', deleteCategory);
}

