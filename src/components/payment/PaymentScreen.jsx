import React, {Component} from 'react'
import "./payment.css"
import PaymentInput from './PaymentInput'

const paymentProps = [
    {label: "CardHolder Name", name: "cardName", placeholder: "First Last "},
    {label: "Card Number", name: "cardNum", placeholder: "0000 0000 0000 0000"},
    {label: "CVV", name: "cvv", placeholder: "000"},
]

export default class PaymentScreen extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    payValue = () => {
        return `PAY $${this.props.state.totalPrice}`
    }
    render(){
        const {paymentInputChange, paymentBlur, } = this.props.functions
        const {paymentInputValue, paymentInputError} = this.props.state
        return(
            <div>
                <form className="payment-container" >
                    {paymentProps.map(prop => (
                        <PaymentInput 
                            prop={prop}
                            onChange={paymentInputChange}
                            paymentFunctions={this.props.functions}
                            state={this.props.state}
                            placeholder={prop.placeholder}
                            onBlur={paymentBlur}
                            value={paymentInputValue[prop.name]}
                            cardImg={this.props.cardImg}
                            
                        />

                    ))}
                    {/* <input className="payment-pay-btn" type="submit" value={this.payValue()} /> */}

                </form>

                <button className='back-to-browse-btn' onClick={this.props.handleBackToBrowseClick}>
                    <i  className="fas fa-long-arrow-alt-left "></i>
                    <span>Back to Shipping</span>
                </button>
            </div>
        )
    }



}