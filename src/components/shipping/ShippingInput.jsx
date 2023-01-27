import React from 'react'
const {countries} = require('countries-list')
const statesName = require( 'datasets-us-states-names' );

function ShippingInput({prop, inputValues, functions, state, ...props}) {
    const {locationClicked, locationBtnText, phoneAreaCode, errorTexts} = state
    const countriesList = []
    for(let index in countries){
        if (countries.hasOwnProperty(index)) {
            countriesList.push(countries[index])
        }
    }

    const countryAndStatesContainerElms = () => {
        if (prop.inputName === 'country') {
            return (
                <div style={{display: `${locationClicked[prop.inputName] ? 'block' : 'none' }`}} className='countries-outer-container'>
                    <div className="countries-container">
                        {countriesList.map(country => (
                            <p name={prop.inputName} onClick={functions.locationTextClicked} countryPhoneCode={country.phone} className="country-name">{country.name}</p>
                        ))}
                    </div>
                </div>
            )
        } 
        if (prop.inputName === 'state') {

            return (
                <div style={{display: `${locationClicked[prop.inputName] ? 'block' : 'none' }`}} className='states-outer-container'>
                    <div className="states-container">
                        {statesName.map(stateName => (
                            <p name={prop.inputName} onClick={functions.locationTextClicked} className="state-name">{stateName}</p>
                            
                        ))}
                    </div>
                </div>
            )
        }
    }
    return (
        <div style={{display: 'flex', alignItems: 'center', position: 'relative'}} className={prop.divClass}>
            
            {prop.inputName === 'country' || prop.inputName === 'state' ? null : <div className="label-spacer"><label>{prop.label}</label></div>  }
            
            {prop.inputName === 'cellNum' || prop.inputName === 'telNum' ?<div className="plusOne" style={{borderColor: `${errorTexts[prop.areaInputName] && prop.inputName !== 'telNum' ? "red" : "black"}`}}><p>+{phoneAreaCode}</p></div> : null}

            {prop.areaInputName === 'areaCellNum' || prop.areaInputName === 'areaTelNum' ? <input style={{borderColor: `${errorTexts[prop.areaInputName] && prop.inputName !== 'telNum' ? "red" : "black"}`}} name={prop.areaInputName} className={prop.areaInputClass} value={inputValues[prop.areaInputName]} type="text" maxLength="3" {...props}/> : null}

            {
            prop.inputName === 'country' || prop.inputName === 'state' ? 
            <button style={{borderColor: `${errorTexts[prop.inputName] && prop.inputName !== "roomNum" ? "red" : "black"}`}} onClick={functions.locationBtnClicked} name={prop.inputName} className={prop.inputClass} disabled={prop.inputName === 'state' && locationBtnText.country !== 'United States' ? true : false}>
                <p>{locationBtnText[prop.inputName]}</p>
                <i className="fas fa-angle-down"></i>
            </button>
            : 
            <input style={{borderColor: `${errorTexts[prop.inputName] && prop.inputName !== "roomNum" && prop.inputName !== 'telNum' && prop.inputName !== 'countryCode' ? "red" : "black"}`}} name={prop.inputName} className={prop.inputClass}  maxLength={prop.inputName === 'cellNum' || prop.inputName === 'telNum' ? '7' : null} type="text" {...props} value={inputValues[prop.inputName]}/>
            }

            {countryAndStatesContainerElms()}

        </div>
    )
}

export default ShippingInput
