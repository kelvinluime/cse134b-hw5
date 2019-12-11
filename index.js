const accessToken = "4JcWSiQFhILFcg5FPFBClAw4a8dcXTmhu8GknTFbiKud1ogk1lhIzXdiatYMm7Lj";

const getAccessToken = () => {
    return accessToken;
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

        switch (input.id) {
            case 'input-dialog-name-input':
                data['item'] = input.value;
                break;
            case 'input-dialog-category-input':
                data['category'] = input.value;
                break;
            case 'input-dialog-price-input':
                data['price'] = input.value;
                break;
            case 'input-dialog-comment':
                data['comment'] = input.value;
                break;
            default:
        }
    }

    const image = document.querySelector('info-dialog-image');
    if (image.getAttribute('src')) {
        data['image'] = image.getAttribute('src');
    }

    addNewItem(getAccessToken(), data);

    const infoDialogContainer = document.querySelector('#info-dialog-container');
    document.body.removeChild(infoDialogContainer);
    hideGreyOut();
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
    const infoDialogContainer = infoDialogContainerTemplate.content.cloneNode(true);
    document.body.appendChild(infoDialogContainer);
    const submitButton = document.querySelector('#info-dialog-submit-button');
    submitButton.disabled = true;
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