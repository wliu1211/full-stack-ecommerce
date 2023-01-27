import React, { Component } from 'react'
import Input from '../create-account/Input';
import '../create-account/createAccount.css'
import './SignIn.css'
import ShoppingScreen from '../shopping-screen/ShoppingScreen';
import CreateAccount from '../create-account/CreateAccount';
const loginInputs = {
    loginEmail: '',
    loginPassword: '',
}


export default class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            loginValues: loginInputs,
            direction: 'cart-screen', //props.direction(initially), cart-screen
            error: ''
        }
    }
    handleChange = (e) => {
        this.setState( prevState => ({
            loginValues: {
                ...prevState.loginValues,
                [e.target.name]: e.target.value, 
            }
        }))
    }
    handleSwitchClick = (e) => {
    this.setState({direction: e.target.className})
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const {loginEmail, loginPassword} = this.state.loginValues;
        const {newEmail, newPassword} = this.props

        if (newEmail.length > 1 && loginEmail === newEmail && loginPassword === newPassword) {
            this.setState({direction: 'cart-screen'})
        } else if (!newEmail.length && !newPassword.length){
            this.setState({error: 'Information not found. You must create an account first.'})

        } else {
            this.setState({error: 'Incorrect email and or password.'})
        }
    }
    handleBackToHomeClick = (e) => {
        this.setState({direction: 'sign-in'})

    }

    displayForm = (loginInputProps, switchBtnHtml) => {
        switch (this.state.direction) {
            case 'sign-in':
                return (
                    <div className="outer-container">
                        <div className="logIn-container">
                            {switchBtnHtml}
                        </div>
                        <div className="inner-container">
                            <form onSubmit={this.handleSubmit}>
                                {loginInputProps.map(prop => (
                                    <Input
                                        name={prop.name}
                                        type={prop.type} 
                                        label={prop.label}
                                        onChange={this.handleChange}
                                        autoComplete="off"
                                        onBlur={this.handleBlur}
                                        value={this.state.loginValues[prop.name]}
                                    />
                                ))}
                                <p className="login-error-text">{this.state.error}</p>
                                <input id="sign-in" type="submit" value="Sign In" />
                            </form>
                        </div>
                    </div>
                )
                
                break;
            case 'cart-screen':
                return <ShoppingScreen 
                    backToHome={this.handleBackToHomeClick}
                />
                break;
            default:
                break;
        }
    }
    render() {
        const loginInputProps = [
            {name: "loginEmail", type: "text", label: " E-Mail Address"},
            {name: "loginPassword", type: 'password', label: " Password"},
        ]
        const {switchBtnHtml} = this.props
        return this.displayForm(loginInputProps, switchBtnHtml)
    }
}
