import React, {Component} from "react";
import './confirmation.css'
export default class ConfirmationScreen extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    
    render(){
        return(
            <div>
                <div className="confirmation-container">
                    <i class="far fa-check-circle"></i>
                    <h1 className="confirmation-header">Congratulations.<br/> Your order is accepted.</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</p>
                    <button className="track-order-btn">Track Order</button>
                    <button onClick={this.props.handleBackToHomeClick} className="back-to-home-btn">Back To Home Page</button>
                </div>
                
                <button className='back-to-browse-btn' onClick={this.props.handleBackToBrowseClick}>
                    <i  className="fas fa-long-arrow-alt-left "></i>
                    <span>Back to Shipping</span>
                </button>
            </div>
        )
    }






}