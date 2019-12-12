const handleClickSignup = () => {
    const usernameInput = document.querySelector('#username-input');
    const username = usernameInput.value;
    const emailInput = document.querySelector('#email-input');
    const email = emailInput.value;
    const passwordInput = document.querySelector('#password-input');
    const password = passwordInput.value;
    const confirmPasswordInput = document.querySelector('#confirm-password-input');
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
        displayDialog('Passwords do not match, please try again.')
    } else if (username === '' || email === '' || password === '' || confirmPassword === '') {
        displayDialog('One of the required field is empty, please try again.');
    } else {
        signUp({
            username,
            email,
            password
        }).then(
            res => {
                displayDialog('You have successfuly signed up for a new account. You may sign in now.');
            },
            err => {
                err = JSON.parse(err.response).error;
                displayDialog(`${err.name}: ${err.message}`)
            }
        )
    }
}

const displayDialog = (message) => {
    const dialogContainerTemplate = document.querySelector('#dialog-container-template');
    document.body.appendChild(dialogContainerTemplate.content.cloneNode(true));
    const p = document.querySelector('#dialog-container p');
    p.innerHTML = message;
    displayGreyOut(99);
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

const handleClickDialogOkButton = () => {
    const dialog = document.querySelector('#dialog-container');
    document.body.removeChild(dialog);
    hideGreyOut();
}