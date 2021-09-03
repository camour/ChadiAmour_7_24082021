
const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

exports.send = (url, method, headers, body = null) =>{

    const httpParameters = {
        method: method ? method : 'GET',
        headers: headers ? headers : defaultHeaders,
    };
    if(body != null) {
        httpParameters.body = body
    }
    return fetch(url,httpParameters);
};