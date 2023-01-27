
export const emailCheck = (email) => {
    let last4Characters = email.slice(email.length - 4, email.length)
    let containsSymbol = email.includes('@')
    let symbolCount = 0
    for (let letters of email){
        if (letters === "@"){
            symbolCount++;
        }
    }
    if (last4Characters !== ".com") {
        return 'Please enter a valid email.'
    } else if (!containsSymbol) {
        return 'Please enter a valid email.'
    } else if (symbolCount > 1) {
        return 'Please enter a valid email.'
    } {
        return ''
    }
}

export const createPasswordCheck = (value) => {
    
    let uppercaseCheck = /[A-Z]/.test(value);
    if(!uppercaseCheck){
        return 'Your password must contain at least 1 uppercase letter'
    }
    if (value.length < 8) {
        return 'Your password contains less than 8 characters.'
    } else if (value.length > 20){
        return "Your password contains more than 20 characters."
    } else {
        return ''
    }
}
export const confirmPasswordCheck = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        return 'Password does not match.'
    } else {
        return ''
    }
}

export const firstNameCheck = (name) => {
    let regExp = /[0-9]/g;
    return regExp.test(name) ? 'Please enter a valid name.' : ''
}

export const postalCodeCheck = (postCode) => {
    let regExp = /[a-zA-Z]/g;
    if (postCode.length > 5 || postCode.length < 5){
        return 'Please enter a valid postal code.'
    } else if(regExp.test(postCode)) {
        return 'Please enter a valid postal code.'
    } else {
        return ''
    }
}