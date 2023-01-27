import React, {Component} from 'react'
import "./paymentSummary.css"



export default class PaymentSummary extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    
    render(){
        const {inputValues, shippingMethod} = this.props
        return(
            <section className="payment-summary-section">
                <div className="payment-shipping-address">
                    <h3>Shipping Address</h3>
                    <div className="shipment-summary-container">
                        <p>{inputValues["name"]}</p>
                        <p>{inputValues["address"]}</p>
                        <p>{inputValues["city"]}{inputValues["state"].length ? `, ${inputValues["state"]}` : null} {inputValues["zipCode"]}</p>
                        <p>{inputValues["country"]}</p>

                    </div>
                </div>
                <div className="payment-shipping-address">
                    <h3>Shipping Method</h3>
                    <div className="shipment-summary-container">
                        <p>{shippingMethod === "standard" ? "Standard" : "Express"}</p>
                        <p>{shippingMethod === "standard" ? "Delivering in 1-3 Business Days" : "Delivering in 4-6 Business Days"}</p>
                    </div>
                </div>
            </section>
        )
    }





} 