export const capitalize = (name) => {
        return name[0].toUpperCase() + name.slice(1);
       
     }

export const trimPayment = (amount) => {
        let stringify = amount.toString();
        let decimalIndex = stringify.indexOf('.');
        if (decimalIndex === -1) {
           return amount
       } else {
           let newAmount = ((Math.round(amount * 100)) / 100)
            return newAmount
        }
    }
export const compareProductTitle = (a, b) => {
    if ( a.title < b.title ){
        return -1;
      }
      if ( a.title > b.title ){
        return 1;
      }
      return 0;
} 
export const compareProductPrice = (a, b) => {
    if ( a.price < b.price ){
        return -1;
      }
      if ( a.price > b.price ){
        return 1;
      }
      return 0;
} 