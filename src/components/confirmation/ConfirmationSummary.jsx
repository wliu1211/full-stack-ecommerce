import React, {Component} from 'react'
import './confirmation.css'


export default class ConfirmationSummary extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        const {cardType, totalPrice, cardImg} = this.props;
        
        return(
            <div style={{borderBottom: "1px solid black"}}>
                <div className="confirmation-summary-container">
                    <h3>Payment</h3>
                    <div className="card-detail-container">
                        {cardType.length > 1 ? <img src={cardImg} alt="card-img" /> : null}
                        
                        <h5>{cardType === "AMERICAN_EXPRESS" ? "AMERICAN EXPRESS" : cardType}</h5>
                    </div>
                    <p style={{fontSize: "1.25rem", marginTop: "10px"}}>Total Payment: <span style={{fontSize: "1.75rem"}}>${totalPrice}</span></p>

                </div>
            </div>
        )
    }





}