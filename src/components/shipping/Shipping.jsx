import React, { Component } from 'react'
import "./shipping.css"
import ShippingInput from './ShippingInput';

const shippingPropsStarter = [
    {divClass: 'shipping-name', label: 'Surname*', inputName: "name", inputClass: 'starter-input'},
    {divClass: 'shipping-address', label: 'Address*', inputName: "address", inputClass: 'starter-input'},
    {divClass: 'shipping-room-num', label: 'Apt/Suite #', inputName: "roomNum", inputClass: 'starter-input address'},
]
const shippingPropsMiddle = [
    {divClass: 'shipping-zip-code', label: 'Zip Code', inputName: "zipCode", inputClass: 'zip-code'},
    {divClass: 'shipping-country', label: 'Country', inputName: "country", inputClass: 'mid-input country-or-state-btn'},
    {divClass: 'shipping-country-code', label: 'Country Code', inputName: "countryCode", inputClass: 'mid-input country-code '},
    {divClass: 'shipping-state', label: 'State', inputName: "state", inputClass: 'mid-input state country-or-state-btn'},
    {divClass: 'shipping-city', label: 'City', inputName: "city", inputClass: 'mid-input city'},
]
const shippingPhoneProps = [
    {divClass: 'shipping-cell', label: 'Cell Phone', areaInputName: "areaCellNum", inputName: "cellNum", areaInputClass: "area-num", inputClass: 'phone-num'},
    {divClass: 'shipping-tel', label: 'Telephone (optional)', areaInputName: "areaTelNum", inputName: "telNum", areaInputClass: "area-num", inputClass: 'phone-num'},
]
export default class Shipping extends Component {
    constructor(){
        super();
        this.state = {

        }

    }
    render() {
        const {valueChange, handleBlur, locationBtnClicked, handleCountryOrStateClick, shipMethod} = this.props.functions
        const {inputValues, shippingMethod, shipMethodError} = this.props.state;
        const btnFunctions = {
            locationBtnClicked: locationBtnClicked,
            locationTextClicked: handleCountryOrStateClick,
        }
        return (
            <section className="shipping-section">
                <div className="form-container">
                    <form className="shipping-form">
                        <h2>Shipping Information</h2>
                        {shippingPropsStarter.map(prop => (
                            <ShippingInput 
                                prop={prop}
                                onChange={valueChange}
                                onBlur={handleBlur}
                                inputValues={inputValues}
                                autoComplete="off"
                                state={this.props.state}

                                
                            />
                        ))}
                        <div className="shipping-location">
                            {shippingPropsMiddle.map(prop => (
                                <ShippingInput 
                                    prop={prop}
                                    onChange={valueChange}
                                    onBlur={handleBlur}
                                    inputValues={inputValues}
                                    autoComplete="off"
                                    functions={btnFunctions}
                                    state={this.props.state}

                                />
                            ))}
                        </div>
                        {shippingPhoneProps.map(prop => (
                            <ShippingInput 
                                prop={prop}
                                onChange={valueChange}
                                onBlur={handleBlur}
                                inputValues={inputValues}
                                autoComplete="off"
                                state={this.props.state}


                            />
                        ))}
                    </form>
                    <form className="shipping-method">
                            <h2 style={{color: `${shipMethodError ? "red" : "black"}`}}>Shipping Method</h2>
                            <label htmlFor="standard"><input type="radio" name="standard-express" value='standard' id="standard" onClick={shipMethod} checked={shippingMethod === "standard" ? true : false}/> Standard - Delivery in 4-6 Business Days - Free</label>
                            <br />
                            <label htmlFor="express"><input type="radio" name="standard-express" value='express' id="express" onClick={shipMethod} checked={shippingMethod === "express" ? true : false}/> Express - Delivery in 1-3 Business Days - $4.99</label>
                    </form>
                </div>
                <button className='back-to-browse-btn' onClick={this.props.handleBackToBrowseClick}>
                    <i  className="fas fa-long-arrow-alt-left "></i>
                    <span>Back to Browse</span>
                </button>
            </section>
        )
    }
}
