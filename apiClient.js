const createXHR = () => {
    try { return new XMLHttpRequest(); } catch (e) {}
    try { return new ActiveXObject("Msxm12.XMLHTTP.6.0"); } catch (e) {}
    try { return new ActiveXObject("Msxm12.XMLHTTP.3.0"); } catch (e) {}
    try { return new ActiveXObject("Msxm12.XMLHTTP"); } catch (e) {}
    try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {}
    alert("XMLHttpRequest not supported");
    return null;
}

/**
 * Sign up 
 * @param {string} username 
 * @param {string} email 
 * @param {string} password 
 * @param {*} handler 
 */
const signUp = (username, email, password, handler) => {
    const url = "http://fa19server.appspot.com/api/users";
    const data = {
        username,
        email,
        password
    };
    const params = Object.keys(data).map((k) => {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&');
    const xhr = createXHR();
    if (xhr) {
        xhr.open("POST", url);
        xhr.onreadstatechange = () => handler(xhr);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);
    }
}

const login = () => {

}

const logout = () => {

}

const retrieveAllMovies = () => {

}

const addNewMovie = () => {

}

const getMoviesByMovieId = () => {

}

const deleteTargetMovie = () => {

}

const updateMovie = () => {

}