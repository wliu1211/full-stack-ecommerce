import React, { Component } from 'react'
import './shippingSummary.css'
import {trimPayment} from "../shopping-screen/miscFunctions"
export default class ShippingSummary extends Component {


    render() {
        const {total, subTotal, summaryItems, expressClicked, quantity, cartInfo} = this.props.state;
        return (
            <div>
                <div className="summary-item-list-container">
                    
                        {summaryItems.map(item => (
                            <ul className="shipping-summary-list" id={item.id}>
                            <div style={{marginRight: "20px"}}>
                                <img src={item.img} alt="product-img" />
                            </div>
                            <div>
                                <li id={item.id}><strong>{item.title}</strong></li>
                                <li id={item.id}>Quantity: {item.quantity}</li>
                                {item.clothesSize.length ? <li id={item.id}>Size: {item.clothesSize}</li> : null}
                                <li id={item.id}>Total Price: ${item.productTotal}</li>
                            </div>
                            </ul>
                        ))}

                    
                </div>
                <div style={{padding: '10px 0'}} className='cart-price-summary'>
                    <div className='cart-price-item'>
                        <p>Cart Subtotal: </p>
                        <p>${subTotal}</p>
                    </div>
                    <div className='cart-price-item'>
                        <p>Shipping and Handling: </p>
                        <p>{!expressClicked ? '--' : '$4.99'}</p>
                    </div>
                    <div className='cart-price-item'>
                        <p>Discount: </p>
                        <p>{subTotal === 0 || cartInfo.discountActivated === false ? '--' : `- $${cartInfo.discountPrice}`}</p>
                    </div>
                    <div className='cart-price-item'>
                        <p>Cart Total: </p>
                        <p>{subTotal === 0 ? '--' : `$${total}`}</p>
                    </div>
                </div>
            </div>
        )
    }
}
