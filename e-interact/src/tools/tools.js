
const regexArray = {
    'email': /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/,
    'userName': /^[a-zA-Z0-9,.'-]+$/,
    'password': /^[a-zA-Z0-9,.'-]+$/
    //^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$ : 
    //To check a password between 6 to 20 characters 
    //which contain at least one numeric digit, one uppercase and one lowercase letter
};

exports.cleanText = (objectFields) => {
    for(let field of Object.keys(objectFields)){
        if( (typeof objectFields[field]) === 'string' ){
            objectFields[field] = objectFields[field].replace(/<\/?[^>]+(>|$)/g, "");
        }        
    }
    return objectFields;
};

exports.checkInput = (input) => {
    let value = document.getElementById(input).value;
    if(!(regexArray[input].test(value))){
       return false;
    }
    return true;
};