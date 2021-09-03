

exports.send = (url, method = 'GET', body) =>{
    let defaultHeaders = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    });
    if(JSON.parse(localStorage.getItem('token'))){
        defaultHeaders.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('token')));
    }
    const httpParameters = {
        method: method,
        headers: defaultHeaders,
    };
    if(body != null) {
        httpParameters.body = JSON.stringify(body);
    }
    return fetch(url, httpParameters);
};