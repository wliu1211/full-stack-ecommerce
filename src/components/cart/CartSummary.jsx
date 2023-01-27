import React, { Component } from 'react'
import "./cartSummary.css"


export default class CartSummary extends Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    
    
    render() {    
        const {expressClicked, cartInfo, functions, subTotalPrice, totalPrice} = this.props;
        return (
            <div>
                <form onSubmit={this.props.functions.promoSubmit} className='promo-form'>
                    <label>Do you Have a Promo Code?</label>
                    <input type="text" onChange={functions.promoChange} value={this.state.promoValue} placeholder="Ex: 'Electronics' = 20% off"/>
                    <input className="apply-btn" type="submit" value="Apply" />
                </form>
                <div className='cart-price-summary'>
                    <div className='cart-price-item'>
                        <p>Cart Subtotal: </p>
                        <p>${subTotalPrice}</p>
                    </div>
                    <div className='cart-price-item'>
                        <p>Shipping and Handling: </p>
                        <p>{!expressClicked ? '--' : '$4.99'}</p>
                    </div>
                    <div className='cart-price-item'>
                        <p>Discount: </p>
                        <p>{!subTotalPrice|| cartInfo.discountActivated === false ? '--' : `- $${cartInfo.discountPrice}`}</p>
                    </div>
                    <div className='cart-price-item'>
                        <p>Cart Total: </p>
                        <p>{!subTotalPrice ? '--' : `$${totalPrice}`}</p>
                    </div>
                </div>
            </div>
        )
    }
}
