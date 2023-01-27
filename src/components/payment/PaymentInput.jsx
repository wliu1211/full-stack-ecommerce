import React from 'react'
import "./payment.css"
const expMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const expYear = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]; 
function PaymentInput({prop, paymentFunctions, state, cardImg, ...props}) {
    const {cardExpClick, dateClick} = paymentFunctions;
    const {cardExpClicked, paymentInputValue, paymentInputError, cardType} = state;
    const determineMaxLength = () => {
        if(prop.name === 'cvv'){
            return 3;
        } else if (prop.name === 'cardNum'){
            return 19
        } else{
            return null;
        }
    }

    return (
        <div>
            {
                prop.name === "cvv" ? 
                <div className="payment-input-container expire-container">
                    <div className="payment-label-container">
                        <h3>Exp. Date</h3>
                    </div>
                    <button className="payment-exp-btn" name="monthExpBtn" onClick={cardExpClick}>
                        <p>{paymentInputValue.expMonth}</p>
                        <i class="fas fa-angle-down"></i>
                        <div className="exp-list-container">
                            <ul style={{display: `${cardExpClicked["monthExpBtn"] ? "block" : "none" }`}} className="exp-month-list">
                                {expMonths.map(month => (
                                        <li onClick={dateClick} className="exp-month">{month}</li>
                                ))} 
                            </ul>
                        </div>
                    </button>
                    <button className="payment-exp-btn" name="yearExpBtn" onClick={cardExpClick}>
                        <p>{paymentInputValue.expYear}</p>
                        <i class="fas fa-angle-down"></i>
                        <div className="exp-list-container">
                            <ul style={{display: `${cardExpClicked["yearExpBtn"] ? "block" : "none" }`}} className="exp-year-list">
                                {expYear.map(year => (
                                        <li onClick={dateClick}className="exp-year">{year}</li>
                                ))} 
                            </ul>
                        </div>
                    </button>
                    <p className="payment-error-text">{paymentInputError["expDate"]}</p>

                </div>
                :
                null
            }
            <div className="payment-input-container">
                <div className="payment-label-container">
                    <h4>{prop.label}</h4>
                </div>
                <input type="text" value={paymentInputValue[prop.name]} name={prop.name} {...props} maxLength={determineMaxLength()}/>
                {prop.name === "cardNum" && cardType.length > 1 ? <img src={cardImg} alt="card-img" /> : null}
                
                <p className="payment-error-text">{paymentInputError[prop.name]}</p>
            </div>
        </div>
    )
}



export default PaymentInput;