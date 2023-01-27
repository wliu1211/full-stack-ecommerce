import React, { Component } from 'react'
import "./cart.css"
import {trimPayment} from "../shopping-screen/miscFunctions"

const tableHeaders = [' ','Product', 'Price', 'Size', 'Quantity', 'Total Price']
export default class Cart extends Component {
    constructor(props){
        super(props)
        this.state = {
            summaryItems: props.state.items,
        }
    }

    displayCartHeaders = (summaryItems, checkoutError) => {
        if (summaryItems.length !== 0) {
            return (
                <tr>
                    {tableHeaders.map(header => (
                        <th>{header}</th>
                    ))}
                </tr>
            ) 
        } else {
            return <p style={{color: `${checkoutError ? 'red' : 'black'}`}} className="empty-cart-text">There is nothing in your cart. Please add something in your cart.</p>
        }
    }
    displayCart = (state, handleCartQuantityChange) => {
        const {items} = state;
        if (items.length !== 0) {
            return (
                items.map(item => (
                    <tr className="cart-table-row" id={item.id}>
                        <td style={{width: '10%'}} id={item.id}>
                            <i onClick={this.props.deleteClick} id={item.id} value={item.name} base="cart" className="fas fa-times"></i>
                        </td>
                        <td className="product-data" id={item.id}>
                            <div id={item.id}>
                                <div className="cart-img-wrapper" id={item.id}>
                                    <img src={item.img} alt=""  id={item.id}/>
                                </div>
                                <h3 id={item.id}>{item.title}</h3>
                            </div>
                        </td>
                        <td id={item.id}>${item.price}</td>
                        <td>{item.clothesSize}</td>
                        <td id={item.id}>
                            <div className="cart-quant-switch-btn">
                                <p>{item.quantity}</p>
                                <div>
                                    <button className="quantity-switch-btn" onClick={handleCartQuantityChange} name={item.name} direction="increase" price={item.price} id={item.id}><i class="fas fa-angle-up"></i></button>
                                    <br />
                                    <button className="quantity-switch-btn" onClick={handleCartQuantityChange} name={item.name} direction="decrease" price={item.price} id={item.id}><i class="fas fa-angle-down"></i></button>
                                </div>
                            </div>
                        </td>
                        <td id={item.id}>${trimPayment(item.productTotal)}</td>
                    </tr>
                ))
            ) 
        } else {
            return null
        }
    }
    render() {
        const {state, handleBackToBrowseClick, checkoutError, quantityChange} = this.props
        const {items, quantity, subtotal} = state;
        return (
            <>
                <div className="cart-table-container">
                    <table className="cart-table">
                        <thead>
                            {this.displayCartHeaders(items, checkoutError)}
                        </thead>
                        <tbody>
                            {this.displayCart(state, quantityChange)}
                        </tbody>
                    </table>

                </div>
                <button className='back-to-browse-btn' onClick={handleBackToBrowseClick}>
                    <i  class="fas fa-long-arrow-alt-left "></i>
                    <span>Back to Browse</span>
                </button>
            </>
        )
    }
}
