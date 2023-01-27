import React from 'react'

function Input({name, type, label, eyeIcon, error, ...props}) {
    let passwordReqTxt = 'Password must be 8-20 characters, including at least one capital letter.'
    const determineError = (error) => {
        if (name === 'loginEmail' || name === 'loginPassword') {
            return null
        } else {
            return error[name]
        }
    }
    return (
        <div>
            <label>{label}</label>
            <br />
            {name === 'password' ? (
                <div className="passwordInput">
                    <input type={type} name={name} {...props}/>
                    {eyeIcon}
                </div>
            )
            : <input type={type} name={name} {...props}/>
            }
            <p className="error-text">{determineError(error)}</p>
            {name === 'password' && <p>{passwordReqTxt}</p>}
            {name === 'loginPassword' ? null : <br />}
        </div>
    )
}

export default Input