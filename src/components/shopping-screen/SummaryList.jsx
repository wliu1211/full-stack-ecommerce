import React from 'react'
import './shoppingCart.css'
import { trimPayment } from './miscFunctions'
const uniqid = require('uniqid')
function SummaryList({state, deleteClick}) {
    const {items, quantity, subtotal} = state
    return (
        <div className='list-table'>
            <table className="browse-table">
                <thead>
                    <tr className="table-header">
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody className="cart-list-summary">
                    {items.map(item => (
                        <tr className='summary-item' key={uniqid()} id={item.id}>
                            <td key={uniqid()} style={{padding: '10px 0'}} id={item.id}>{item.title}</td>
                            <td key={uniqid()} id={item.id}>{item.quantity}</td>
                            <td key={uniqid()} id={item.id}>${trimPayment(item.productTotal)}</td>
                            <td key={uniqid()} id={item.id}>
                                <i key={uniqid()} id={item.id} value={item.name} base="summaryList" onClick={deleteClick} className="fas fa-times"></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default SummaryList
