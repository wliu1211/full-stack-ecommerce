import React, {Component} from 'react'
import './modal.css'
import { trimPayment } from '../shopping-screen/miscFunctions';
const Taxjar = require('taxjar');


export default class DetailModal extends Component{
    constructor(props){
        super(props);
        this.state={
            productList: []
        }


    }
    
    componentDidMount(){
        this.setState({productList: this.props.products})
    }
    render(){
        const {closeModal, modalQuantitySwitcher, modalAddProduct} = this.props.functions
        const {modalClicked, productIndex, quantity} = this.props.state
        const {products} = this.props
        // const {title, img, price, description} = this.state.productList
        if (products[productIndex]){
            let productDescription = products[productIndex].description.replace(/<[^>]+>/g, '');
            return(
                <div style={{display: `${modalClicked? "block" : "none"}`}} onClick={closeModal} className='modal-outter-container' clickAction="close-modal">
                    <div style={{display: `${modalClicked? "block" : "none"}`}} className="card-modal-section">
                        <div className='modal-header'>
                            <h3>Card Modal</h3>
                            <i onClick={closeModal} class="fas fa-times" clickAction="close-modal"></i>
                        </div>
                        <div className='modal-body'>
                            <div className='modal-left-container'>
                                <div className='modal-img-container'>
                                    <img src={products[productIndex].img} alt="" />
                                </div>
                                {products[productIndex].description.length ? <div>
                                    <p>Description:</p>
                                    <p className='modal-item-description'>{productDescription}</p>
                                </div> : null}
                            </div>
                            <div className='modal-right-container'>
                                <div className='modal-item-container'>
                                    <div className='modal-label-container'>
                                        <p>Name: </p>
                                    </div>
                                    <p>{products[productIndex].title}</p>
                                </div>
                                <div className='modal-item-container'>
                                    <div className='modal-label-container'>
                                        <p>Price: </p>
                                    </div>  
                                    <p>${products[productIndex].price}</p>
                                </div>
                                {products[productIndex].clothesSize.length ?
                                    <div className='modal-item-container'>
                                        <div className='modal-label-container'>
                                            <p>Size: </p>
                                        </div>
                                        <p>{products[productIndex].selectedSize}</p>
                                    </div>
                                    :
                                    <div></div>
                                }
                                <div className='modal-item-container'>
                                    <div className='modal-label-container'>
                                        <p>Quantity: </p>
                                    </div>
                                    <div className="modal-quantity-switcher">
                                        <button onClick={modalQuantitySwitcher} name={products[productIndex].name} type="button">-</button>
                                        <p>{quantity[products[productIndex].name]}</p>
                                        <button onClick={modalQuantitySwitcher} name={products[productIndex].name} type="button">+</button>
                                    </div>
                                </div>
                                <div className='modal-item-container'>
                                    <div className ='modal-label-container'>
                                        <p>Total: </p>
                                    </div>
                                    <p>${trimPayment(quantity[products[productIndex].name] * products[productIndex].price)}</p>
                                </div>
                                <button className="modal-add-to-cart-btn" onClick={modalAddProduct} name={products[productIndex].name} id={products[productIndex].id}>Add To Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            )
        } else {
            return null;
        }
    }
}