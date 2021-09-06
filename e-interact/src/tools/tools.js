
const regexArray = {
    'email': /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/,
    'userName': /^[a-zA-Z0-9,.'-]+$/,
    'password': /^[a-zA-Z,.'-]+$/
};

exports.checkInput = (input) => {
    let value = document.getElementById(input).value;
    if(!(regexArray[input].test(value))){
       return false;
    }
    return true;
};