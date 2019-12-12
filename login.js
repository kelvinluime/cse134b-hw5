const handleClickSignin = () => {
    const loginInput = document.querySelector('#login-input');
    const loginCred = loginInput.value;
    const passwordInput = document.querySelector('#password-input');
    const password = passwordInput.value;

    if (login == '' || password == '') {
        displayDialog('One of the required field is empty, please try again.');
    } else {
        let data = {};
        if (loginCred.includes('@')) {
            data['email'] = loginCred;
        } else {
            data['username'] = loginCred;
        }
        data['password'] = password;
        login(data).then(
            res => {
                res = JSON.parse(res.response);
                console.log(res);
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