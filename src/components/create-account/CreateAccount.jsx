
// Hi Jason, before you review my code, I know it may look similar to the one you demonstrated but I promise you that this is exactly how I would do it too. I will be honest, I did go and look back at some parts because I was stuck 

import React, { Component } from 'react'
import Input from './Input'
import SignIn from '../sign-in/SignIn'
import { createPasswordCheck, confirmPasswordCheck, firstNameCheck, postalCodeCheck, emailCheck } from './InputCheck'
import './createAccount.css'

const uniqid = require('uniqid')
const inputNames ={
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    surname: '',
    postCode: '',
}
const errors ={
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    postCode: '',
}
const currentFormStyle = {
    backgroundColor: 'rgb(53,57,62)',
    color: 'white',
}
const buttonSwitchProps = [
    {className: 'sign-in', text: 'Sign In'},
    {className: 'register', text: 'Create Account'},
]


export default class CreateAccount extends Component {
    constructor(){
        super()
        this.state = {
            inputValues: inputNames,
            errorText: errors,
            eyeClicked: false,
            eyeIcon: <i onClick ={this.eyeClicked} className="fas fa-eye-slash"></i>,
            direction: 'sign-in',
            errorCount: 0,

        }
    }
    inputCheck = (name, value) => {
        let errorText;
        switch (name) {
            case 'email':
                errorText =emailCheck(this.state.inputValues.email)
                this.setState( prevState => ({errorText: {
                    ...prevState.errorText,
                    email: errorText
                }}))
                break;
            case 'password':
                errorText = createPasswordCheck(value);
                this.setState( prevState => ({errorText: {
                    ...prevState.errorText,
                    password: errorText
                }}))
                break;
            case 'confirmPassword':
                errorText = confirmPasswordCheck(this.state.inputValues.password, this.state.inputValues.confirmPassword);
                this.setState( prevState => ({errorText: {
                    ...prevState.errorText,
                    confirmPassword: errorText
                }}))
                break;
            case 'firstName':
                errorText = firstNameCheck(this.state.inputValues.firstName);
                this.setState( prevState => ({errorText: {
                    ...prevState.errorText,
                    firstName: errorText
                }}))
                break;
            case 'postCode':
                errorText = postalCodeCheck(this.state.inputValues.postCode);
                this.setState( prevState => ({errorText: {
                    ...prevState.errorText,
                    postCode: errorText
                }}))
                break;
        
            default:
                break;
        }
    }

    handleChange = e => {
        this.setState(prevState => ({ 
            inputValues: {
            ...prevState.inputValues,
            [e.target.name]: e.target.value
        }
    }
    ))
    }
    handleBlur = (e) => {
        let inputName = e.target.name
        let inputValue = e.target.value
        this.inputCheck(inputName, inputValue)
    }

    eyeClicked = () => {
        this.setState({ eyeClicked: !this.state.eyeClicked})
        if (this.state.eyeClicked){
            this.setState({eyeIcon: <i onClick ={this.eyeClicked} className="fas fa-eye-slash"></i>})
        } else {
            this.setState({eyeIcon: <i onClick ={this.eyeClicked} className="fas fa-eye"></i>})
        }
    }
    cancelClicked = () => {
        this.setState({direction: 'sign-in'})
    }
    handleSwitchClick = (e) => {
        this.setState({direction: e.target.className})
    }
    switchBtn = () => {
        let html = buttonSwitchProps.map(prop => (
            <button style={this.state.direction === `${prop.className}` ? currentFormStyle : null} className={prop.className} onClick={this.handleSwitchClick}>{prop.text}</button>
        ))
        return html
    }

    handleSubmit = e => {
        e.preventDefault();
        Object.keys(this.state.errorText).map((error) => {
            if (this.state.errorText[error] !== '') {
                if (this.state.errorCount > 0) {
                    this.setState({errorCount: 0});
                    this.setState({errorCount: this.state.errorCount++})
                } else {
                    this.setState({errorCount: this.state.errorCount++})
                }
            } else {
                this.setState({errorCount: 0});
            }
        } 
        );
        if (this.state.errorCount === 0){
            this.setState({direction: 'sign-in'})
        }

    }


    displayForm = (inputProps, switchBtnElm) => {
        if (this.state.direction === 'register'){
            return (
                <div className="outer-container">
                    <div className="logIn-container">
                        {switchBtnElm}
                    </div>
                    <div className="inner-container">
                        <form onSubmit={this.handleSubmit}>
                        {inputProps.map(prop => (
                            <Input
                            name={prop.name}
                            type={prop.type} 
                            label={prop.label}
                            onChange={this.handleChange}
                            autoComplete="off"
                            eyeIcon={this.state.eyeIcon}
                            onBlur={this.handleBlur}
                            error={this.state.errorText}
                            value={this.state.inputValues[this.name]}
                        />
                        ))}
                        <input id="submit-btn" type="submit" value="Save"/>
                        <p className="or">or</p>
                        <button className="fb-btn"><i style={{fontSize: "1rem", marginRight: "10px"}} className="fab fa-facebook-f"></i> Sign up with Facebook</button>
                        <br />
                        <br />
                        <p onClick={this.cancelClicked} className="cancel-register">Cancel</p>
                        <br />
                        <div className="form-footer">
                            <a href="#">Privacy Policy and Cookies</a>
                            <hr />
                            <a href="#">Terms of Sale and Use</a>
                        </div>
                    </form>
                    </div>
                </div>
            )
        } else if(this.state.direction === 'sign-in'){
            return <SignIn 
                    newEmail={this.state.inputValues.email}
                    newPassword={this.state.inputValues.password}
                    direction= {this.state.direction}
                    switchBtnHtml={this.switchBtn()}
                    onClick={this.handleSwitchClick}
                />
        }
    }
    render() {
        let peaked = this.state.eyeClicked ? 'type' : 'password'
        const inputProps = [
            {name: "email", type: "text", label: "Your E-Mail Address *"},
            {name: "password", type: `${peaked}`, label: "Create Password *"},
            {name: "confirmPassword", type: "password", label: "Confirm Password *"},
            {name: "firstName", type: "text", label: "First Name *"},
            {name: "surname", type: "text", label: "Surname *"},
            {name: "postCode", type: "text", label: "Postal Code *"},
        ]
        const switchBtnElm = this.switchBtn()


        return this.displayForm(inputProps, switchBtnElm)

    }
}

