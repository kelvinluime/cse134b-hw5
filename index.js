const getAccessToken = () => {
    if (localStorage.getItem('userId') === null) {
        window.open('login.html', '_self');
        return;
    }
    return localStorage.getItem('userId');
}

const displayGreyOut = (zIndex) => {
    const greyout = document.querySelector('#grey-out');
    greyout.style.zIndex = zIndex;
    greyout.style.display = 'block';
}

const hideGreyOut = () => {
    const greyout = document.querySelector('#grey-out');
    greyout.style.display = 'none';
}

const handleClickUrlDialogCancelButton = () => {
    const urlDialogContainer = document.querySelector('#url-dialog-container');
    document.body.removeChild(urlDialogContainer);
    displayGreyOut(99);
}

const handleInfoDialogInput = () => {
    let hasFieldEmpty = false;

    const infoDialogInputs = document.querySelectorAll('#info-dialog-info-container>input, #info-dialog-comment-container>textarea');
    for (let input of infoDialogInputs) {
        if (input.value === '') {
            hasFieldEmpty = true;
        }
    }

    if (hasFieldEmpty === false) {
        const submitButton = document.querySelector('#info-dialog-submit-button');
        submitButton.disabled = false;
    }
}

const handleInfoDialogSubmit = () => {
    const infoDialogInputs = document.querySelectorAll('#info-dialog-info-container>input, #info-dialog-comment-container>textarea');
    let data = {};
    for (let input of infoDialogInputs) {
        if (input.value === '') {
            console.error('Required fields are empty.');
            return;
        }

        switch (input.id.toString()) {
            case 'info-dialog-name-input':
                data['item'] = input.value;
                break;
            case 'info-dialog-category-input':
                data['category'] = input.value;
                break;
            case 'info-dialog-price-input':
                data['price'] = input.value;
                break;
            case 'info-dialog-comment':
                data['comment'] = input.value;
                break;
            default:
                break;
        }
    }

    const image = document.querySelector('#info-dialog-image');
    data['image'] = image.getAttribute('src') == 'camera.jpg' ? '' : image.getAttribute('src');

    const infoDialogContainer = document.querySelector('#info-dialog-container');
    if (infoDialogContainer.getAttribute('data-action') == 'create') {
        addNewItem(getAccessToken(), data).then(
            res => {
                res = JSON.parse(res.response);
                console.log(`Successfully created a new entry with id ${res.id}`);
                appendNewWishlistItem(res.id, res.item, res.image);
            },
            err => {
                console.error(`Encountered error when creating a entry: ${err}`);
            }
        );
    } else {
        const itemId = infoDialogContainer.getAttribute('data-id');
        updateItem(getAccessToken(), itemId, data).then(
            res => {
                res = JSON.parse(res.response);
                console.log(`Successfully updated an entry with id ${res.id}`);
                if (data.image !== '') {
                    const image = document.querySelector(`#id-${itemId} > img`);
                    image.setAttribute('src', data.image);
                }
                const name = document.querySelector(`#id-${itemId} p`);
                name.innerHTML = data.item;
            },
            err => {
                console.error(`Encountered error when creating a entry: ${err}`);
            }
        )
    }

    document.body.removeChild(infoDialogContainer);
    hideGreyOut();
}

const appendNewWishlistItem = (id, name, imageUrl) => {
    const wishlistItemTemplate = document.querySelector('#wishlist-item-template');
    let newWishlistItem = wishlistItemTemplate.content.cloneNode(true);

    const wishlist = document.querySelector('#wishlist');
    wishlist.appendChild(newWishlistItem);

    const items = document.querySelectorAll('#wishlist>li');
    newWishlistItem = items[items.length - 1];

    newWishlistItem.setAttribute('data-id', id);
    newWishlistItem.setAttribute('id', `id-${id}`);

    const newWishlistItemImage = newWishlistItem.querySelector(`img`);
    if (imageUrl !== '') {
        newWishlistItemImage.setAttribute('src', imageUrl);
    }
    const newWishlistItemName = newWishlistItem.querySelector(`p`);
    newWishlistItemName.innerHTML = name;
}

const handleClickUrlDialogSubmitButton = () => {
    const imageUrlInput = document.querySelector('#image-url-input');
    if (imageUrlInput.value === '') {
        const urlDialogContainer = document.querySelector('#url-dialog-container');
        document.body.removeChild(urlDialogContainer);
        displayGreyOut(99);
        return;
    }

    const infoDialogImage = document.querySelector('#info-dialog-image');
    infoDialogImage.setAttribute('src', imageUrlInput.value);

    const urlDialogContainer = document.querySelector('#url-dialog-container');
    document.body.removeChild(urlDialogContainer);
    displayGreyOut(99);
}

const handleClickInfoDialogCancelButton = () => {
    const infoDialogContainer = document.querySelector('#info-dialog-container');
    document.body.removeChild(infoDialogContainer);
    hideGreyOut();
}

const handleImageUrlInput = (input) => {
    const submitButton = document.querySelector('#url-dialog-submit-button');
    if (input.value !== '') {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

const handleClickAddButton = () => {
    if (document.querySelector('#info-dialog-container')) {
        console.error('There should only be 1 info dialog.')
        return;
    }

    displayGreyOut(99);
    const infoDialogContainerTemplate = document.querySelector('#info-dialog-container-template');
    let infoDialogContainer = infoDialogContainerTemplate.content.cloneNode(true);
    document.body.appendChild(infoDialogContainer);
    infoDialogContainer = document.querySelector('#info-dialog-container');
    infoDialogContainer.setAttribute('data-action', 'create');
    const submitButton = document.querySelector('#info-dialog-submit-button');
    submitButton.disabled = true;
}

const handleClickWishlistItemInfoButton = (button) => {
    if (document.querySelector('#info-dialog-container')) {
        console.error('There should only be 1 info dialog.')
        return;
    }
    displayGreyOut(99);
    const listitem = button.parentNode.parentNode;
    const itemId = listitem.getAttribute('data-id');
    const infoDialogContainerTemplate = document.querySelector('#info-dialog-container-template');
    let infoDialogContainer = infoDialogContainerTemplate.content.cloneNode(true);

    getItemByItemId(getAccessToken(), itemId).then(
        res => {
            res = JSON.parse(res.response);
            document.body.appendChild(infoDialogContainer);
            infoDialogContainer = document.querySelector('#info-dialog-container');
            infoDialogContainer.setAttribute('data-action', 'update');
            infoDialogContainer.setAttribute('data-id', itemId);
            const submitButton = document.querySelector('#info-dialog-submit-button');
            submitButton.disabled = true;
            const nameInput = document.querySelector('#info-dialog-name-input');
            nameInput.value = res.item;
            const categoryInput = document.querySelector('#info-dialog-category-input');
            categoryInput.value = res.category;
            const priceInput = document.querySelector('#info-dialog-price-input');
            priceInput.value = res.price;
            const commentTextarea = document.querySelector('#info-dialog-comment');
            commentTextarea.value = res.comment;
            if (res.image !== '') {
                const image = document.querySelector('#info-dialog-image');
                image.setAttribute('src', res.image);
            }
            submitButton.disabled = true;
        },
        err => {
            console.error(`error when getting item with id ${itemId}`);
            return;
        }
    )
}

const handleClickInfoDialogImage = () => {
    if (document.querySelector('#url-dialog-container')) {
        console.error('There should only be 1 url dialog.');
        return;
    }

    displayGreyOut(999);
    const urlDialogContainerTemplate = document.querySelector('#url-dialog-container-template');
    const urlDialogContainer = urlDialogContainerTemplate.content.cloneNode(true);
    document.body.appendChild(urlDialogContainer);
    const submitButton = document.querySelector('#url-dialog-submit-button');
    submitButton.disabled = true;
}

const handleClickWishlistItemDeleteButton = (button) => {
    const listitem = button.parentNode.parentNode;
    const deleteDialogContainerTemplate = document.querySelector('#delete-dialog-container-template');
    let deleteDialogContainer = deleteDialogContainerTemplate.content.cloneNode(true);
    document.body.appendChild(deleteDialogContainer);
    deleteDialogContainer = document.querySelector('#delete-dialog-container');
    deleteDialogContainer.setAttribute('data-id', listitem.getAttribute('data-id'));

    displayGreyOut(99);
}

const handleClickDeleteDialogYesButton = (button) => {
    const deleteDialogContainer = document.querySelector('#delete-dialog-container');
    const itemId = deleteDialogContainer.getAttribute('data-id');
    deleteTargetItem(getAccessToken(), itemId).then(
        res => {
            console.log(`Successfully deleted an item with id ${itemId}`);
            const deletedItem = document.querySelector(`#id-${itemId}`);
            const wishlist = document.querySelector('#wishlist');
            wishlist.removeChild(deletedItem);
        },
        err => {
            console.error(`error when deleting item: ${err}`);
        }
    )

    document.body.removeChild(deleteDialogContainer);
    hideGreyOut();
}

const handleClickDeleteDialogNoButton = () => {
    const deleteDialogContainer = document.querySelector('#delete-dialog-container');
    document.body.removeChild(deleteDialogContainer);
    hideGreyOut();
}

const handleClickExitButton = () => {
    logout(getAccessToken()).then(
        res => {
            window.open('login.html', '_self');
        },
        err => {

        }
    )
}

window.onload = () => {
    retrieveAllItems(getAccessToken()).then(
        res => {
            res = JSON.parse(res.response);
            const items = res.wishItems;
            for (let item of items) {
                appendNewWishlistItem(item.id, item.item, item.image);
            }
        },
        err => {
            console.error(`Error loading wish items: ${err}`);
        }
    )
}