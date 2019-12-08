const createXHR = () => {
    try { return new XMLHttpRequest(); } catch (e) {}
    try { return new ActiveXObject("Msxm12.XMLHTTP.6.0"); } catch (e) {}
    try { return new ActiveXObject("Msxm12.XMLHTTP.3.0"); } catch (e) {}
    try { return new ActiveXObject("Msxm12.XMLHTTP"); } catch (e) {}
    try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {}
    return null;
}

const handler = (xhr, resolve, reject) => {
    if(xhr.readyState == 4 && xhr.status == 200){
        resolve(xhr);
    }
    else if(xhr.readyState == 4 && xhr.status != 200){
        reject(xhr);
    }
}

const logoutHandler = (xhr, resolve, reject) => {
    if(xhr.readyState == 4 && xhr.status == 204){
        resolve(xhr);
    }
    else if(xhr.readyState == 4 && xhr.status != 204){
        reject(xhr);
    }
}

/**
 * Sign up 
 * @param {string} username 
 * @param {string} email 
 * @param {string} password 
 * @param {*} handler 
 */
const signUp = (data) => {
    return new Promise((resolve, reject) => {
        const url = "http://fa19server.appspot.com/api/users";
        const params = Object.keys(data).map((k) => {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
        }).join('&');
        const xhr = createXHR();
        if(xhr) {
            xhr.open("POST", url);
            xhr.onreadystatechange = () => handler(xhr, resolve, reject);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(params);
        } else {
            alert("XMLHttpRequest not supported");
            reject(null);
        }
    })
}

const login = (data) => {
    return new Promise((resolve, reject) => {
        const url = "http://fa19server.appspot.com/api/users/login";
        const params = Object.keys(data).map((k) => {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
        }).join('&');
        const xhr = createXHR();
        if(xhr) {
            xhr.open("POST", url);
            xhr.onreadystatechange = () => handler(xhr, resolve, reject);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(params);
        }
    })
}

const logout = (accessToken) => {
    return new Promise((resolve, reject) => {
        const url = "http://fa19server.appspot.com/api/users/logout?access_token=" + accessToken;
        const xhr = createXHR();
        if(xhr) {
            xhr.open("POST", url);
            xhr.onreadystatechange = () => logoutHandler(xhr, resolve, reject);
            xhr.send(null);
        }
    })
}

const retrieveAllItems = (accessToken) => {
    return new Promise((resolve, reject) => {
        const url = "http://fa19server.appspot.com/api/wishlists/myWishlist?access_token=" + accessToken;
        const xhr = createXHR();
        if(xhr) {
            xhr.open("GET", url);
            xhr.onreadystatechange = () => handler(xhr, resolve, reject);
            xhr.send(null);
        }
    })
}

const addNewItem = (accessToken, data) => {
    return new Promise((resolve, reject) => {
        const url = "http://fa19server.appspot.com/api/wishlists?access_token=" + accessToken;
        const params = Object.keys(data).map((k) => {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
        }).join('&');
        const xhr = createXHR();
        if(xhr) {
            xhr.open("POST", url);
            xhr.onreadystatechange = () => handler(xhr, resolve, reject);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(params);
        }
    })
}

const getItemByItemId = (accessToken, itemId) => {
    return new Promise((resolve, reject) => {
        const url = "http://fa19server.appspot.com/api/wishlists/" + itemId + "?access_token=" + accessToken;
        const xhr = createXHR();
        if(xhr) {
            xhr.open("GET", url);
            xhr.onreadystatechange = () => handler(xhr, resolve, reject);
            xhr.send(null);
        }
    })
}

const deleteTargetItem = (accessToken, itemId) => {
    return new Promise((resolve, reject) => {
        const url = "http://fa19server.appspot.com/api/wishlists/" + itemId + "?access_token=" + accessToken;
        const xhr = createXHR();
        if(xhr) {
            xhr.open("DELETE", url);
            xhr.onreadystatechange = () => handler(xhr, resolve, reject);
            xhr.send(null);
        }
    })
}

const updateItem = (accessToken, itemId, data) => {
    return new Promise((resolve, reject) => {
        const url = "http://fa19server.appspot.com/api/wishlists/" + itemId + "/replace?access_token=" + accessToken;
        const xhr = createXHR();
        const params = Object.keys(data).map((k) => {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
        }).join('&');
        if(xhr) {
            xhr.open("POST", url);
            xhr.onreadystatechange = () => handler(xhr, resolve, reject);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(params);
        }
    })
}