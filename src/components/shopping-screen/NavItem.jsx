import React from 'react'
import { capitalize, } from './miscFunctions'
function NavItem({className, label, navStyle, direction}) {
        const separatorCheck = (label) => {
        if (label === 'browse') {
            return null
        } else if (label === "confirmation") {
            return <div style={navStyle[label]} className="separator confirmation"></div>
        } else {
            return <div style={navStyle[label]} className="separator"></div>
        }
    }

    return (
        <>
            {separatorCheck(label)}
            <div className="nav-item-container">
                <div style={navStyle[label]} className="nav-item">
                    <i className={className}></i>
                </div>
                <p>{capitalize(label)}</p>
            </div>
        </>
    )
}

export default NavItem
