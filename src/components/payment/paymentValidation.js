export const cardNumberValidations = (cardNum) => {
    const regexPattern = {
        MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
        VISA: /^4[0-9]{2,}$/,
        AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
        DISCOVER: /^6(?:011|5[0-9]{2,})[0-9]{3,}$/,
    }
    if(!cardNum){
        return "Please fill out this field."
    }
    for( const card in regexPattern){
        if (cardNum.replace(/[^\d]/g, '').match(regexPattern[card])){
            if(cardNum){
                return cardNum && /^[1-6]{1}[0-9]{14,15}$/i.test(cardNum.replace(/[^\d]/g, '').trim())
                ? ''
                : 'Enter a valid card.'
            } 
        }
    }
    return 'Enter a valid card.'; 
}