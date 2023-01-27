import React, { Component } from 'react';
import {
    browseSortClickObj, 
    browseBtnTextObj, 
    quantityChangeObj, 
    cardCheckoutLimit,
    productSubtotalObj,
    clothesSizeClickObj,
    clothesSizeSelectedObj
} from '../browse/browseConsts';
import NavItem from './NavItem';
import Cart from '../cart/Cart'
import CartSummary from '../cart/CartSummary'
import './shoppingCart.css'
import SummaryList from './SummaryList'
import Shipping from '../shipping/Shipping'
import ShippingSummary from '../shipping/ShippingSummary'
import { capitalize, trimPayment, compareProductTitle, compareProductPrice } from './miscFunctions'
import PaymentScreen from '../payment/PaymentScreen'
import {cardNumberValidations} from '../payment/paymentValidation'
import PaymentSummary from '../payment/PaymentSummary'
import ConfirmationScreen from '../confirmation/ConfirmationScreen'
import ConfirmationSummary from '../confirmation/ConfirmationSummary'

import VISA_ICON from '../assets/visa.png'
import AMERICAN_EXP_ICON from '../assets/amex.png'
import DISCOVER_ICON from '../assets/discover.png'
import MASTER_CARD_ICON from '../assets/masterCard.png'
import BrowseScreen from '../browse/BrowseScreen'
import { map } from 'datasets-us-states-names/lib';

const uniqid = require('uniqid')
const {countries} = require('countries-list')






let numOnlyCheck = new RegExp('^[0-9]+$')
const navFilledStyle = {
    backgroundColor: "rgb(82,82,82)",
    color: "white",

}

const navItemProps = [
    {class: 'fas fa-search', label: 'browse', navItemActivated: false},
    {class: 'fas fa-shopping-cart', label: 'cart', navItemActivated: false},
    {class: 'fas fa-truck', label: 'shipping', navItemActivated: false},
    {class: 'far fa-credit-card', label: 'payment', navItemActivated: false},
    {class: 'fas fa-check-circle', label: 'confirmation', navItemActivated: false},
]
const navDynamicStyleObj = {
    browse: navFilledStyle,
    cart: {},
    shipping: {},
    payment: {},
    confirmation: {}

}


// BROWSE AND CART STATES
const browseCardProps = []

const cartSummary = {
    discountActivated: false,
    discountPrice: 0,
    promoValue: '',
}
// SHIPPING STATES 

const shippingInputValuesObj = {
    name: '',
    address: '',
    roomNum: '',
    zipCode: '',
    countryCode: '',
    country: '',
    city: '',
    state: '',
    areaCellNum: '',
    areaTelNum: '',
    cellNum: '',
    telNum: '',
}
 const shippingErrorHolder = {
    name: false,
    address: false,
    roomNum: false,
    zipCode: false,
    country: false,
    city: false,
    state: false,
    areaCellNum: false,
    cellNum: false,
}
const locationBtnClicked = {
    country: false,
    state: false,
}
const buttonText = {
    country: 'Country',
    state: 'State',
}
// PAYMENT STATES
const paymentInputObj = {
    cardName: '',
    cardNum: '',
    expMonth: "Month",
    expYear: "Year",
    cvv: ''
}
const cardExpClickedObj = {
    monthExpBtn: false,
    yearExpBtn: false,

}
const paymentInputErrorObj = {
    cardName: '',
    cardNum: '',
    expDate: '',
    cvv: ''
}
const CARDICON = {
    VISA: VISA_ICON,
    MASTERCARD: MASTER_CARD_ICON,
    AMERICAN_EXPRESS: AMERICAN_EXP_ICON,
    DISCOVER: DISCOVER_ICON,
}

export default class ShoppingScreen extends Component {
    constructor(){
        super();
        this.state = {
            navDynamicStyle: navDynamicStyleObj, 
            browseSortClicked: browseSortClickObj,
            browseBtnText: browseBtnTextObj,
            productSubtotal: productSubtotalObj,
            clothesSizeClick: clothesSizeClickObj,
            clothesSizeSelected:clothesSizeSelectedObj,
            productSearchInput: '',
            summaryItems: [],
            productList: [],
            productLoading: false,
            productError: false,
            quantityChangeValues: quantityChangeObj,
            summaryItemsLength: 0,
            checkoutLimit: cardCheckoutLimit,
            direction: 'browse', // browse, cart, shipping, payment, confirmation
            cartSummaryInfo: cartSummary,
            subTotalCartPrice: 0,
            totalPrice: 0,
            checkoutError: false,
            // Shipping state holders
            shippingInputValues: shippingInputValuesObj,
            shippingErrorTexts: shippingErrorHolder,
            locationListActivated: locationBtnClicked,
            buttonText: buttonText,
            phoneCode: 0,
            shipMethod: "",
            expressClicked: false,
            shippingCheckoutError: false,
            shipMethodError: false,
            //Payment state holders
            paymentInputValues: paymentInputObj,
            cardExpClicked: cardExpClickedObj,
            paymentInputError: paymentInputErrorObj,
            paymentCardType: "",
            paymentCardImg: "",
        }
    }
    async componentDidMount() {
        this.setState({productLoading: true})
        const url = new URL(
            "https://api.chec.io/v1/products"
        );
        
        let params = {
            "limit": "25",
        };
        Object.keys(params)
            .forEach(key => url.searchParams.append(key, params[key]));
        
        let headers = {
            "X-Authorization": process.env.REACT_APP_COMMERCEJS_API,
            "Accept": "application/json",
            "Content-Type": "application/json",
        };
        const response = await fetch(url, { method: "GET", headers: headers })

        if(response.ok && response.status === 200){
            const {data} = await response.json();
            const setSizePrice = (product) => {
                let sizeObj = {}
                let sizesArr = product.variant_groups[1].options
                sizesArr.forEach(size => 
                    sizeObj = {
                        ...sizeObj,
                        [size.name]: size.price.raw,
                    }
                )
                return sizeObj;
            }
            const productData = data.map(product => ({
                id: product.id,
                title: product.name,
                name: product.variant_groups[0].options[0].name,
                img: product.image.url,
                price: product.price.raw,
                description: product.description,
                category: product.categories[0].slug,
                clothesSize: `${product.categories[0].slug === "clothes" ? product.variant_groups[1].options.map(size => ([size.name])) : ""}`,
                sizePrice: product.categories[0].slug === "clothes" ? setSizePrice(product) : {},
                selectedSize: 'M'
            }))
            this.setState({productList: productData})
            browseCardProps.push(...productData)
        } else {
            this.setState({productError: true})
        }
        this.setState({productLoading: false})

    }
    handleDropdownClick = (e) => {
        const {name} = e.target;
        this.setState(prevState => ({
            browseSortClicked: {
                ...prevState.browseSortClicked,
                [name]: !this.state.browseSortClicked[name]
            }
        }))
    }
    handleBrowseDropdownClick = (e) => {
        const {innerText} = e.target;
        const {value: nameValue} = e.target.attributes[0];
        const {value: sortValue} = e.target.attributes[1];
        if (nameValue === "category") {
            const categorySort = browseCardProps.filter(props => props.category === innerText.toLowerCase())
            if (innerText === "All") {
                this.setState({productList: browseCardProps})
            } else {
                this.setState({productList: categorySort})
            }
            this.setState(prevState => ({
                browseBtnText: {
                    ...prevState.browseBtnText,
                    categoryText: innerText,
                    sortText: "Select"
                },
                browseSortClicked: {
                    ...prevState.browseSortClicked,
                    category: false,
                    sort: false,
                },
                
            }))
            
        } else if (nameValue === "sort") {
            const {productList} = this.state
            let productSort;
            switch (sortValue) {
                case 'ascendingName':
                    productSort = productList.sort(compareProductTitle);
                    break;
                case 'descendingName':
                    productSort = productList.reverse(productList.sort(compareProductTitle));
                    break;
                case 'ascendingPrice':
                    productSort = productList.sort(compareProductPrice);
                    break;
                case 'descendingPrice':
                    productSort = productList.reverse(productList.sort(compareProductPrice));
                break;
                default:
                    break;
            }
            this.setState({productList: productSort})
            this.setState(prevState => ({
                browseBtnText: {
                    ...prevState.browseBtnText,
                    sortText: innerText,
                },
                browseSortClicked: {
                    ...prevState.browseSortClicked,
                    sort: false,
                    category: false,
                }
            }))
            
        }
    }
    handleBrowseSearchInput = (e) => {
        const {value} = e.target;
        this.setState({productSearchInput: value})
        onkeyup = (e) => {
            this.setState(prevState => ({
                productList: browseCardProps.filter(item => item.title.trim().toLowerCase().includes(value.trim().toLowerCase())),
                browseBtnText: {
                    ...prevState.browseBtnText,
                    categoryText: "All"
                }
            }))
        }
    }


    handleProductSearch = (e) => e.preventDefault();


    handleClothesSizeClick = (e) => {
        const {value:name} = e.target.attributes[1];
        const {value:labelValue} = e.target.attributes[2];
        const {innerText} = e.target
        if (labelValue === "size-switcher-btn") {
            this.setState(prevState => ({
                clothesSizeClick: {
                    ...prevState.clothesSizeClick,
                    [name]: !this.state.clothesSizeClick[name]
                }
            }))
        } else if(labelValue === "size-option"){
            const{value: productId} = e.target.attributes[3];
            const {productList} = this.state
            
            const productIndex = productList.findIndex(item => item.id === productId)
            let productsCloneList = [...productList]
            const {sizePrice} = productList[productIndex]
            productsCloneList[productIndex] = {...productsCloneList[productIndex], price: sizePrice[innerText], selectedSize: innerText}

            this.setState(prevState => ({
                clothesSizeSelected: {
                    ...prevState.clothesSizeSelected,
                    [name]: innerText,
                },
                clothesSizeClick: {
                    ...prevState.clothesSizeClick,
                    [name]: false,
                },
                productList: productsCloneList
            }))
        }
    }
    handleQuantityClick = (e) => {
        const {name, } = e.target;
        if (e.target.textContent === '-') {
            if (this.state.quantityChangeValues[e.target.name] > 0) {
                this.setState( prevState => ({
                    quantityChangeValues: {
                        ...prevState.quantityChangeValues,
                        [name]: this.state.quantityChangeValues[name] - 1,
                    }
                }))
            }
        } else if (e.target.textContent === '+') {
            this.setState( prevState => ({
                quantityChangeValues: {
                    ...prevState.quantityChangeValues,
                    [e.target.name]: this.state.quantityChangeValues[e.target.name] + 1,
                }
            }))
        }
    }


    getTotalPrice = (quantity, price) => {
        let sum = quantity * parseFloat(price)
        return trimPayment(sum)
    }

    handleAddToCartClick = (e) => {
        e.preventDefault();
        const {summaryItems} = this.state;
        const[cardTitle, cardImg, cardPrice, clothesSize, quantity, submit] = e.target.children;

        const name = submit.name;
        const cardProps = {
            title: cardTitle.innerText,
            id: submit.id,
            img: cardImg.firstChild.currentSrc,
            price: parseFloat(cardPrice.firstElementChild.innerText),
            quantity: parseInt(quantity.children[1].children[1].innerText),
            size: `${clothesSize.innerText.length ? clothesSize.children[1].children[0].textContent : ""}`
        }
        const {quantityChangeValues} = this.state
        const addedItem = {
            title: cardProps.title,
            id: `${clothesSize.innerText.length ? uniqid() : cardProps.id}`,
            name: name,
            price: trimPayment(cardProps.price),
            quantity: parseInt(cardProps.quantity),
            img: cardProps.img,
            clothesSize: cardProps.size,
            productTotal: trimPayment(cardProps.price) * parseInt(cardProps.quantity),
        }
        if (this.state.quantityChangeValues[name]) {
            if (this.state.checkoutLimit[name] < 1 && !clothesSize.innerText.length) {
                this.setState(state => ({
                    summaryItems: [...state.summaryItems, addedItem],
                    summaryItemsLength: state.summaryItemsLength + 1,
                    checkoutError: false,

                    checkoutLimit: {
                        ...state.checkoutLimit,
                        [name]: this.state.checkoutLimit[name] + 1
                    },
                }))
            } else if (clothesSize.innerText.length) {
                this.setState(state => ({
                    summaryItems: [...state.summaryItems, addedItem],
                    summaryItemsLength: state.summaryItemsLength + 1,
                    checkoutError: false,
                }))
            }else {
                let cardIndex = summaryItems.findIndex(elm => elm.id === submit.id)
                let productQuantityChangeArr = [...summaryItems]
                productQuantityChangeArr[cardIndex] = {...productQuantityChangeArr[cardIndex], quantity: productQuantityChangeArr[cardIndex].quantity + addedItem.quantity,productTotal: productQuantityChangeArr[cardIndex].productTotal + (productQuantityChangeArr[cardIndex].price * addedItem.quantity)}
                this.setState(prevState => ({
                    summaryItems: productQuantityChangeArr,
                    productSubtotal: {
                        ...prevState.productSubtotal,
                        [name]: prevState.productSubtotal[name] + this.getTotalPrice(quantityChangeValues[name], cardProps.price),
                    },
                }))
            }
            this.setState(prevState => ({
                quantityChangeValues: {...prevState.quantityChangeValues, [name]: 0},
            }))
        } else {
            return
        }
    }
    handleCartQuantityChange = (e) => {
        const {subTotalCartPrice, summaryItems} = this.state;
        const {id} = e.target;
        const {value: directionValue} = e.target.attributes[2] 
        const {value: price} = e.target.attributes[3] 
        let cardIndex = summaryItems.findIndex(elm => elm.id === id)
        let cartQuantityChangeArray = [...summaryItems]
        if (directionValue === "increase" && cartQuantityChangeArray[cardIndex].quantity >= 1) {
            cartQuantityChangeArray[cardIndex] = {...cartQuantityChangeArray[cardIndex], quantity: cartQuantityChangeArray[cardIndex].quantity + 1, productTotal: cartQuantityChangeArray[cardIndex].productTotal + cartQuantityChangeArray[cardIndex].price}
            this.setState(prevState => ({
                summaryItems: cartQuantityChangeArray,
                subTotalCartPrice: trimPayment(subTotalCartPrice + parseFloat(price)),
                totalPrice: prevState.cartSummaryInfo.discountActivated ? trimPayment((subTotalCartPrice + parseFloat(price)) * 0.8)  : trimPayment(subTotalCartPrice + parseFloat(price)),
                cartSummaryInfo:{
                    ...prevState.cartSummaryInfo,
                    discountPrice: prevState.cartSummaryInfo.discountActivated ? trimPayment((subTotalCartPrice + parseFloat(price)) * 0.2)  : 0,
                }
            }))
        } else if (directionValue === "decrease" && cartQuantityChangeArray[cardIndex].quantity > 1){
            cartQuantityChangeArray[cardIndex] = {...cartQuantityChangeArray[cardIndex], quantity: cartQuantityChangeArray[cardIndex].quantity - 1, productTotal: cartQuantityChangeArray[cardIndex].productTotal - cartQuantityChangeArray[cardIndex].price}
            this.setState(prevState => ({
                summaryItems: cartQuantityChangeArray,
                subTotalCartPrice: trimPayment(subTotalCartPrice - parseFloat(price)),
                totalPrice: prevState.cartSummaryInfo.discountActivated ? trimPayment((subTotalCartPrice - parseFloat(price)) * 0.8) : trimPayment(subTotalCartPrice - parseFloat(price)),
                cartSummaryInfo:{
                    ...prevState.cartSummaryInfo,
                    discountPrice: prevState.cartSummaryInfo.discountActivated ? trimPayment((subTotalCartPrice - parseFloat(price)) * 0.2) : 0,
                }
            }))   
        }
    }


    handleModalAddProduct = (e) => {
        const [cardName, cardPrice, cardSize, cardQuantity] = e.target.parentElement.children;
        const {name, id} = e.target;
        const {summaryItems, quantityChangeValues} = this.state
        const cardProps = {
            title: cardName.children[1].innerText,
            id: id,
            img: e.target.parentElement.parentElement.children[0].children[0].firstElementChild.currentSrc,
            price: parseFloat(cardPrice.children[1].innerText.slice(1, cardPrice.children[1].innerText.length)),
            quantity: parseInt(cardQuantity.children[1].children[1].textContent),
            size: `${cardSize.innerText.length ? cardSize.children[1].textContent : ""}`
        }
        const addedItem = {
            title: cardProps.title,
            id: `${cardSize.innerText.length ? uniqid() : cardProps.id}`,
                name: name,
            price: trimPayment(cardProps.price),
            quantity: parseInt(cardProps.quantity),
            img: cardProps.img,
            clothesSize: cardProps.size,
            productTotal: trimPayment(cardProps.price) * parseInt(cardProps.quantity),
        }
        if (this.state.quantityChangeValues[name]) {
            if (this.state.checkoutLimit[name] < 1 && !cardSize.innerText.length) {
                this.setState(state => ({
                    summaryItems: [...state.summaryItems, addedItem],
                    summaryItemsLength: state.summaryItemsLength + 1,
                    checkoutError: false,
                    checkoutLimit: {
                        ...state.checkoutLimit,
                        [name]: this.state.checkoutLimit[name] + 1
                    },
                }))
            } else if (cardSize.innerText.length) {
                this.setState(state => ({
                    summaryItems: [...state.summaryItems, addedItem],
                    summaryItemsLength: state.summaryItemsLength + 1,
                    checkoutError: false,
                }))
            }else {
                let cardIndex = summaryItems.findIndex(elm => elm.id === id)
                let productQuantityChangeArr = [...summaryItems]
                productQuantityChangeArr[cardIndex] = {...productQuantityChangeArr[cardIndex], quantity: productQuantityChangeArr[cardIndex].quantity + addedItem.quantity,productTotal: productQuantityChangeArr[cardIndex].productTotal + (productQuantityChangeArr[cardIndex].price * addedItem.quantity)}
                this.setState(prevState => ({
                    summaryItems: productQuantityChangeArr,
                    productSubtotal: {
                        ...prevState.productSubtotal,
                        [name]: prevState.productSubtotal[name] + this.getTotalPrice(quantityChangeValues[name], cardProps.price),
                    },
                }))
            }
            this.setState(prevState => ({
                quantityChangeValues: {...prevState.quantityChangeValues, [name]: 0},
            }))
        } else {
            return
        }



    }


    handleDeleteClick = (e) => {
        const {summaryItems, summaryItemsLength, subTotalCartPrice} = this.state;
        const [undefined, name, baseName] = e.target.attributes
        const {cartSummaryInfo, totalPrice, checkoutLimit} = this.state
        const {discountActivated} = cartSummaryInfo
        const {value} = name
        const {value: deleteBtnIdentifyer } = baseName
        if (deleteBtnIdentifyer === 'cart') {
            let itemTotalPriceOuterText = e.target.parentElement.parentElement.children[5].innerText;
            let itemTotal = parseFloat(itemTotalPriceOuterText.slice(1, itemTotalPriceOuterText.length))
            summaryItemsLength === 1 ? this.setState({totalPrice: 0}): this.setState({totalPrice: trimPayment(totalPrice - itemTotal)})
            
            let subTotal = subTotalCartPrice - itemTotal
            let discount = 0.2
            let discountPrice = subTotal * discount
            if (discountActivated) {
                this.setState(state => ({
                    subTotalCartPrice: trimPayment(subTotal),
                    cartSummaryInfo: {
                        ...state.cartSummaryInfo,
                        discountPrice: trimPayment(discountPrice),
                    },
                    totalPrice: trimPayment((subTotal - discountPrice))
                }))
            } else {
                this.setState({
                    subTotalCartPrice: trimPayment(subTotal),
                    totalPrice: trimPayment(subTotal)
                })
            }
        }
        this.setState(prevState => ({
            summaryItems: summaryItems.filter(element => element.id !== e.target.id),
            summaryItemsLength: summaryItemsLength - 1,
            checkoutLimit: {
                ...prevState.checkoutLimit,
                [value]: 0
            },
        }))        
    }

    handlePromoChange = (e) => {
        this.setState(state => ({
            cartSummaryInfo: {
                ...state.cartSummaryInfo,
                promoValue: e.target.value

            }
        }))
    }
    getDiscountPrice = (subTotalCartPrice) => (subTotalCartPrice * 0.2)
    handlePromoSubmit = (e) => {
        e.preventDefault()

        let discountPrice = this.getDiscountPrice(this.state.subTotalCartPrice);
        let afterShippingPrice;
        if (this.state.expressClicked) {
            afterShippingPrice = (this.state.subTotalCartPrice - discountPrice) + 4.99;
        } else {
            afterShippingPrice = (this.state.subTotalCartPrice - discountPrice);
        }
        if (this.state.cartSummaryInfo.promoValue === "Electronics" && this.props.subTotalCartPrice !== 0) {
            this.setState(state => ({
                discountActivated: true,
                promoValue: '',
                totalPrice: Math.round(afterShippingPrice * 100) / 100,
                cartSummaryInfo: {
                    ...state.cartSummaryInfo,
                    discountPrice: trimPayment(discountPrice),
                    discountActivated: true,
                    
                }
            }))
        }

    }
/////////////////////////////////// SHIPPING FUNCTIONS ////////////////////////////////
    handleShippingValueChange = (e) => {
        const {name, value} = e.target

        this.numbersOnly = () => {
            if (value === '' || numOnlyCheck.test(value)) {
                this.setState(prevState => ({
                    shippingInputValues: {
                        ...prevState.shippingInputValues,
                        [name]: value
                    }
                }))
            } 
        }
        switch (name) {
            case 'zipCode':
                this.numbersOnly()
                break;
            case 'areaCellNum':
                this.numbersOnly()
                break;
            case 'areaTelNum':
                this.numbersOnly()
                break;
            case 'cellNum':
                this.numbersOnly()

                break;
            case 'telNum':
                this.numbersOnly()

                break;
            case 'countryCode':
                    if (value.length <= 2) {
                        this.setState(prevState => ({
                            shippingInputValues: {
                                ...prevState.shippingInputValues,
                                countryCode: value
                            }
                        }))
                    }

                break;
            default: 
                this.setState(prevState => ({
                    shippingInputValues: {
                        ...prevState.shippingInputValues,
                        [name]: value
                    }
                }))
                break;
        }
     
    }

    handleShippingBlur = (e) => {
        const {shippingInputValues} = this.state
        const {name, value} = e.target
        if (shippingInputValues[name].length && name === 'countryCode' && countries[value.toUpperCase()]){
            this.setState(prevState => ({
                phoneCode: countries[value.toUpperCase()].phone,
                buttonText: {
                    ...prevState.buttonText,
                    country: countries[value.toUpperCase()].name
                },
                shippingInputValues: {
                    ...prevState.shippingInputValues,
                    country: countries[value.toUpperCase()].name
                },
                locationListActivated: {
                    ...prevState.locationListActivated,
                    country: false
                }
            }))
        }
        if (!shippingInputValues[name].length) {
            this.setState(prevState => ({
                shippingErrorTexts: {
                    ...prevState.shippingErrorTexts,
                    [name]: true
                }
            }))
        } else {
            this.setState(prevState => ({
                shippingErrorTexts: {
                    ...prevState.shippingErrorTexts,
                    [name]: false
                }
            }))
        }
    }
    
    locationBtnClicked =(e) => {
        e.preventDefault()
        const [name] = e.target.attributes
        this.setState(prevState => ({
            locationListActivated: {
                ...prevState.locationListActivated,
                [name.value]: !this.state.locationListActivated[name.value]

            }
        }))

    }
    handleCountryOrStateClick = (e) => {
        const [name, countryPhoneCode] = e.target.attributes
        if (countryPhoneCode.textContent && name.value === 'country') {
            this.setState({
                phoneCode: countryPhoneCode.textContent
            })
            this.setState(prevState => ({
                shippingInputValues: {
                    ...prevState.shippingInputValues,
                    country: e.target.textContent
                }
            }))
        } else if(countryPhoneCode.textContent && name.value === 'state'){
            this.setState(prevState => ({
                shippingInputValues: {
                    ...prevState.shippingInputValues,
                    state: e.target.textContent
                }
            }))
        }
        this.setState(prevState => ({
            locationListActivated: {
                ...prevState.locationListActivated,
                [name.value]: false

            },
            buttonText: {
                ...prevState.buttonText,
                [name.value]: e.target.outerText
            }
        }))
    }
    handleShippingMethodClick = (e) => {
        const {id} = e.target;
        const {totalPrice, expressClicked} = this.state;
        if(id === "express"){
            let totalAfterExpress;
            totalAfterExpress = totalPrice + 4.99;
            this.setState({
                expressClicked: true,
                totalPrice: trimPayment(totalAfterExpress)
            })
        } else {
            if(expressClicked){
                let newPrice = totalPrice - 4.99;
                this.setState({totalPrice: trimPayment(newPrice)})
            }
            this.setState({expressClicked: false})
        }
        this.setState({shipMethod: id})

    }
    checkShippingForm = () => {
        let error = false;
        const {shippingInputValues, shipMethod} = this.state;
        if(this.state.shippingInputValues["country"] === "United States" && !this.state.shippingInputValues["state"].length){
            this.setState(prevState => ({
                shippingErrorTexts: {
                    ...prevState.shippingErrorTexts,
                    state: true,
                    country: false,
                    
                }
            }));
            return false;
        }
        for (let input in shippingInputValues){
            if(shippingInputValues.hasOwnProperty(input)){
                if(input !== "countryCode" && input !== "roomNum" && input !== "state" && input !== "areaTelNum" && input !== "telNum"){
                    if(!shippingInputValues[input].length || !shipMethod.length){
                        error = true;
                        this.setState({shippingCheckoutError: true});
                    }
                }
            }
        }
        if(error){
            return false;
        } else{
            return true;
        }

    }
///////////////////////////////// PAYMENT FUNCTIONS////////////////////////////////////////////////////////////
    
    findDebitCardType = (cardNumber) => {
        const regexPattern = {
            MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
            VISA: /^4[0-9]{2,}$/,
            AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
            DISCOVER: /^6(?:011|5[0-9]{2,})[0-9]{3,}$/,
        }
        for( const card in regexPattern){
            if (cardNumber.replace(/[^\d]/g, '').match(regexPattern[card])) return card;
        }
        return ''; 
    }

    handlePaymentInputChange = (e) => {
        const {name, value} = e.target
        switch (name) {
            case "cardName":
                this.setState(prevState => ({
                    paymentInputValues: {
                        ...prevState.paymentInputValues,
                        cardName: value
                    }
                }))
                
                break;
                case "cardNum":
                let mask = value.split(' ').join('');
                if (mask.length) {
                    mask = mask.match(new RegExp('.{1,4}', 'g')).join(' ');
                    this.setState(prevState => ({ 
                        paymentInputValues: { 
                            ...prevState.paymentInputValues, 
                            cardNum: mask,
                        } 
                    }));
                }  else {
                    this.setState(prevState => ({ 
                        paymentInputValues: { 
                        ...prevState.paymentInputValues, 
                        cardNum: ''
                        } 
                    }))
                }
                break;
                case "cvv":
                if (value === '' || numOnlyCheck.test(value)) {
                    this.setState(prevState => ({
                        paymentInputValues: {
                            ...prevState.paymentInputValues,
                            cvv: value
                        }
                    }))
                } 
                break;
        
            default:
                break;
        }
    }

    handleCardExpClick = (e) => {
        e.preventDefault();
        const {cardExpClicked} = this.state
        const {name} = e.target
        this.setState(prevState => ({
            cardExpClicked: {
                ...prevState.cardExpClicked,
                [name]: !cardExpClicked[name]
            }
        }))

    }


    handleDateClick = (e) => {
        const {className, textContent} = e.target;
        if(className === "exp-month"){
            this.setState(prevState => ({
                paymentInputValues: {
                    ...prevState.paymentInputValues,
                    expMonth: textContent
                },
                cardExpClicked: {
                    ...prevState.cardExpClicked,
                    monthExpBtn: false
                }
            }))
        } else if(className === "exp-year"){
            this.setState(prevState => ({
                paymentInputValues: {
                    ...prevState.paymentInputValues,
                    expYear: textContent
                },
                cardExpClicked: {
                    ...prevState.cardExpClicked,
                    yearExpBtn: false
                }
            }))
        }

    }

    handlePaymentBlur = (e) => {
        let errorText;
        const {name, value} = e.target
        const {paymentInputValues, paymentInputError} = this.state
        if (!paymentInputValues[name].length) {
            this.setState(prevState => ({
                paymentInputError: {
                    ...prevState.paymentInputError,
                    [name]: "Please fill out this field.",
                }
            }))
        } else{
            this.setState(prevState => ({
                paymentInputError: {
                    ...prevState.paymentInputError,
                    [name]: "",
                }
            }))
        }
        

        switch (name) {
            case "cardNum":
                const{paymentCardType} = this.state;
                errorText = cardNumberValidations(value);
                this.setState(prevState => ({
                    paymentCardType: this.findDebitCardType(value),

                    paymentInputError: {
                        ...prevState.paymentInputError,
                        cardNum: errorText
                    }
                }))
                if (paymentCardType.length > 1) {
                    this.setState({paymentCardImg: CARDICON[paymentCardType]})
                }
                break;
            default:
                break;
        }
        

    }
    checkPaymentForm(){
        let error = false;
        let month = new Date().getMonth();
        let year = new Date().getFullYear().toString();
        let todayYear = parseInt(year.slice(2,4));
        const {paymentInputValues} = this.state;
        if (!this.state.paymentInputValues["cardName"].length) {
            this.setState(prevState => ({
                paymentInputError: {
                    ...prevState.paymentInputError,
                    cardName: 'Please fill out this field.'
                }
            }))
            return false;
        }
        if (paymentInputValues["cardNum"].length < 18) {
            this.setState(prevState => ({
                paymentInputError: {
                    ...prevState.paymentInputError,
                    cardNum: 'Not enough digits.'
                }
            }))
            return false;
        }
        if (!this.state.paymentCardType.length) {
            this.setState(prevState => ({
                paymentInputError: {
                    ...prevState.paymentInputError,
                    cardNum: 'Enter a valid card.'
                }
            }))
            return false;
        }
        if(this.state.paymentInputValues["expMonth"] === "Month" || this.state.paymentInputValues["expYear"] === "Year"){
            this.setState(prevState => ({
                paymentInputError: {
                    ...prevState.paymentInputError,
                    expDate: 'Please fill out this field.'
                }
            }))
            return false;
        }
        if(parseInt(this.state.paymentInputValues["expYear"]) < todayYear){
            this.setState(prevState => ({
                paymentInputError: {
                    ...prevState.paymentInputError,
                    expDate: 'Your card has expired.'
                }
            }))
            return false;
        } else if (parseInt(this.state.paymentInputValues["expYear"]) === todayYear && parseInt(this.state.paymentInputValues["expMonth"]) <= month){
            this.setState(prevState => ({
                paymentInputError: {
                    ...prevState.paymentInputError,
                    expDate: 'Your card has expired.'
                }
            }))
            return false;
                
            }
        if(paymentInputValues["cvv"].length < 3){
            this.setState(prevState => ({
                paymentInputError: {
                    ...prevState.paymentInputError,
                    cvv: 'Not enough digits.'
                }
            }))
            
        }
        for (let input in paymentInputValues){
            if(paymentInputValues.hasOwnProperty(input)){
                if(!paymentInputValues[input].length){
                    error = true;
                }
            }
        }
        if(error){
            return false;
        } else{
            return true;
        }
    }
    /////////////////////////////////////////////////////////////////////////////
    calculatePrices = () => {
        const itemSubTotalList = [];
        let totalSum = 0;
        const {expressClicked} = this.state;
        const {discountActivated} = this.state.cartSummaryInfo;
        for (const item of this.state.summaryItems) {
            let itemTotal = parseFloat(item.price) * item.quantity;
            itemSubTotalList.push(itemTotal)
        }
        for(const price of itemSubTotalList){
            totalSum += price
        }
        let discountPrice = this.getDiscountPrice(totalSum)
        let realTotal;
        if(discountActivated && expressClicked){
            realTotal = totalSum - discountPrice + 4.99;
        } else if(discountActivated && !expressClicked){
            realTotal = totalSum - discountPrice;
        } else if (!discountActivated && expressClicked){
            realTotal = totalSum + 4.99;
        } else {
            realTotal = totalSum;
        }
        this.setState(state => ({
            subTotalCartPrice: trimPayment(totalSum),
            totalPrice: trimPayment(realTotal),
            cartSummaryInfo: {
                ...state.cartSummaryInfo,
                discountPrice: trimPayment(discountActivated) ? trimPayment(discountPrice) : 0,
                
            }
        }))    

    }
    handleCartClick = () => {
        this.calculatePrices();
        this.setState(state => ({
            direction: 'cart',
            navDynamicStyle: {
                ...state.navDynamicStyle,
                cart: navFilledStyle,
                shipping: {},
                payment: {},
                confirmation: {},
            }
        }))     
    }
    handleBackToBrowseClick = () => {
        const {direction} = this.state;
        switch (direction) {
            case 'cart':
            case 'shipping':
                this.setState(prevState => ({
                    direction: 'browse',
                    navDynamicStyle: {
                        ...prevState.navDynamicStyle,
                        shipping: {},
                        cart: {},
                    }
                }))    
                break;
            case 'payment':
                this.setState(prevState => ({
                    direction: 'shipping',
                    navDynamicStyle: {
                        ...prevState.navDynamicStyle,
                        payment: {},
                    }
            }))    
                break;
            case 'confirmation':
                this.setState(prevState => ({
                    direction: 'payment',
                    navDynamicStyle: {
                        ...prevState.navDynamicStyle,
                        confirmation: {},
                    }
                }))    
                break;
        
            default:
                break;
        }
    }
    handleCheckoutClick = () => {
        let shippingCheckedConfirmed;
        switch (this.state.direction) {
            case 'browse':
            case 'cart':
                if (this.state.summaryItems.length !== 0) {
                    this.calculatePrices();
                    this.setState(prevState => ({
                        direction: 'shipping',
                        checkoutError: false,
                        shippingCheckoutError: false,
                        navDynamicStyle: {
                            ...prevState.navDynamicStyle,
                            cart: navFilledStyle,
                            shipping: navFilledStyle,
                        }
                    }))
                } else {
                    this.setState({
                        checkoutError: true,
                    })
                }
                break;
            case 'shipping':
                for(let obj in this.state.shippingInputValues){
                    if(!this.state.shippingInputValues[obj].length && obj !== "state"){
                        this.setState(prevState => ({
                            shippingErrorTexts: {
                                ...prevState.shippingErrorTexts,
                                [obj]: true
                            }
                        }))
                    }
                }
                if(!this.state.shipMethod.length){
                    this.setState({shipMethodError: true})
                } else{
                    this.setState({shipMethodError: false})
                }
                shippingCheckedConfirmed = this.checkShippingForm();
                if (this.state.direction === 'shipping' && this.state.summaryItems.length && shippingCheckedConfirmed) {

                    this.setState(prevState => ({
                        direction: 'payment',
                        checkoutError: false,
                        shippingCheckoutError: false,
                        shipMethodError: false,
                        navDynamicStyle: {
                            ...prevState.navDynamicStyle,
                            payment: navFilledStyle,
                        }
                    }))
                } else if(this.state.direction === 'shipping' && this.state.summaryItems.length && !shippingCheckedConfirmed) {
                    this.setState({
                        shippingCheckoutError: true,
                    })
                    
                }
                break;
            case 'payment':
                let paymentCheckedConfirmed = false; 
                paymentCheckedConfirmed = this.checkPaymentForm();
                if (this.state.direction === 'payment' && this.state.summaryItems.length !== 0 && paymentCheckedConfirmed) {
                    this.setState(prevState => ({
                        direction: 'confirmation',
                        navDynamicStyle: {
                            ...prevState.navDynamicStyle,
                            confirmation: navFilledStyle,
                        }
                    }))
                } else if(this.state.direction === 'payment' && this.state.summaryItems.length !== 0 && !paymentCheckedConfirmed) {
                }
                break;
            default:
                break;
        }
    }

    displayNavUI(){
        const {navDynamicStyle} = this.state
        return(
            navItemProps.map(prop => (
                <NavItem 
                    className={prop.class}
                    label={prop.label}
                    navStyle={navDynamicStyle}
                    direction={this.state.direction}
                    key={uniqid()}
                />
                
            ))
        )
    }

    displayMainUi = () => {
        const {direction, productLoading, productError} = this.state
        switch (direction) {
            case 'browse':
                const cardFunctions = {
                    quantityChange: this.handleQuantityClick,
                    addToCart: this.handleAddToCartClick,
                    handleDropdownClick: this.handleDropdownClick,
                    handleBrowseDropdownClick: this.handleBrowseDropdownClick,
                    handleSearchInput: this.handleBrowseSearchInput,
                    handleProductSearch: this.handleProductSearch,
                    handleClothesSizeClick: this.handleClothesSizeClick
                }
                const cardState= {
                    products: this.state.productList,
                    quantity: this.state.quantityChangeValues,
                    clicked: this.state.browseSortClicked,
                    dropdownText: this.state.browseBtnText,
                    productSearchInput: this.state.productSearchInput,
                    clothesSizeClick: this.state.clothesSizeClick,
                    clothesSizeSelected: this.state.clothesSizeSelected,
                }
                const modalFunctions = {
                    modalQuantitySwitcher: this.handleQuantityClick,
                    modalAddProduct: this.handleModalAddProduct,
                }
                return <BrowseScreen 
                functions={cardFunctions}
                state={cardState}
                modalFunctions={modalFunctions}
                />
            case 'cart':
                const cartProps = {
                    items: this.state.summaryItems,
                    subtotal: this.state.productSubtotal
                }
                return <Cart 
                state={cartProps}
                deleteClick={this.handleDeleteClick}
                handleBackToBrowseClick={this.handleBackToBrowseClick}
                checkoutError={this.state.checkoutError}
                quantityChange={this.handleCartQuantityChange}
            />

            case 'shipping':
                const shippingSummaryFunctions = {
                    valueChange: this.handleShippingValueChange,
                    handleBlur: this.handleShippingBlur,
                    locationBtnClicked: this.locationBtnClicked,
                    handleCountryOrStateClick: this.handleCountryOrStateClick,
                    shipMethod: this.handleShippingMethodClick,
                }
                const shippingStateHolder = {
                    inputValues: this.state.shippingInputValues,
                    errorTexts: this.state.shippingErrorTexts,
                    locationClicked: this.state.locationListActivated,
                    locationBtnText: this.state.buttonText,
                    phoneAreaCode: this.state.phoneCode,
                    shippingMethod: this.state.shipMethod,
                    shipMethodError: this.state.shipMethodError
                }
                return <Shipping 
                    functions={shippingSummaryFunctions}
                    state={shippingStateHolder}
                    handleBackToBrowseClick={this.handleBackToBrowseClick}
                    
                />
            case 'payment':
                const paymentStateHolder = {
                    cardExpClicked: this.state.cardExpClicked,
                    paymentInputValue: this.state.paymentInputValues,
                    paymentInputError: this.state.paymentInputError,
                    totalPrice: this.state.totalPrice,
                    cardType: this.state.paymentCardType
                }
                const paymentFunctions = {
                    paymentInputChange: this.handlePaymentInputChange,
                    cardExpClick: this.handleCardExpClick,
                    dateClick: this.handleDateClick,
                    paymentBlur: this.handlePaymentBlur,
                }
                return <PaymentScreen 
                    functions={paymentFunctions}
                    state={paymentStateHolder}
                    handleBackToBrowseClick={this.handleBackToBrowseClick}
                    cardImg={CARDICON[this.state.paymentCardType]}
                />
            case 'confirmation':
                
                return <ConfirmationScreen 
                    handleBackToBrowseClick={this.handleBackToBrowseClick}
                    handleBackToHomeClick = {this.props.backToHome}
                />
                
        
            default:
                break;
        }

    }
    displaySummaryUI = (cartSummaryFunction) => {
        const {direction} = this.state
        const shippingSummaryState = {
            total: this.state.totalPrice,
            subTotal: this.state.subTotalCartPrice,
            summaryItems: this.state.summaryItems,
            expressClicked: this.state.expressClicked,
            cartInfo: this.state.cartSummaryInfo,

        }
        switch (direction) {
            
            case 'browse':
                const summaryState = {
                    items: this.state.summaryItems,
                    subtotal: this.state.productSubtotal
                }
                return <SummaryList 
                state={summaryState}
                deleteClick={this.handleDeleteClick}

                />

            case 'cart':
                return <CartSummary 
                subTotalPrice={this.state.subTotalCartPrice}
                totalPrice={this.state.totalPrice}
                functions={cartSummaryFunction}
                cartInfo={this.state.cartSummaryInfo}
                expressClicked={this.state.expressClicked}
            />
            case 'shipping':
                return <ShippingSummary 
                        functions={cartSummaryFunction}
                        state={shippingSummaryState}
                />
            case 'payment':
                return (
                    <div>
                        <ShippingSummary 
                            functions={cartSummaryFunction}
                            state={shippingSummaryState}

                        />
                        <PaymentSummary 
                            inputValues={this.state.shippingInputValues}
                            shippingMethod={this.state.shipMethod}
                        />
                    </div>
                )
                break;
            case 'confirmation':
                const {paymentCardType, totalPrice} = this.state;
                
                return (
                    <div>
                        <ShippingSummary 
                            functions={cartSummaryFunction}
                            state={shippingSummaryState}
                        />
                        <PaymentSummary 
                            inputValues={this.state.shippingInputValues}
                            shippingMethod={this.state.shipMethod}
                        />
                        <ConfirmationSummary 
                            cardType={paymentCardType}
                            cardImg={CARDICON[paymentCardType]}
                            totalPrice={totalPrice}
                        />
                    </div>
                )
                break;
        
            default:
                break;
        }
    }
    displayCheckoutBtn = () => {
        const{direction} = this.state;
        if (direction === 'payment') {
            return <button onClick={this.handleCheckoutClick}>{`Pay $${this.state.totalPrice}`}</button>
        }else if (direction === 'confirmation') {
            return null;
        } else {
            return <button onClick={this.handleCheckoutClick}>Checkout</button>
        }
    }
    render() {

        const cartSummaryFunctions = {
            promoChange: this.handlePromoChange,
            promoSubmit: this.handlePromoSubmit,

        }

        return (
            <div id="main-display">
                <div className="display-grid">
                    <div className="nav-container">
                        {this.displayNavUI()}
                    </div>
                    <div className="main-ui">
                        <h1 style={{textAlign: 'center', margin: '20px 0', borderBottom: '1px solid rgb(154,154,154)', paddingBottom: '10px'}}>{capitalize(this.state.direction)}</h1>
                        {!this.state.productLoading ? this.displayMainUi() : <div className='product-loading-page'>Loading Products...</div>}
                        {this.state.productError && <div className='product-error-page'>Sorry, there has been an error loading the products. 😔</div>}
                    </div>
                    <div className="summary">
                        <header className="summary-header">
                            <div className="header-container">
                                <i onClick={this.handleCartClick} class="fas fa-shopping-cart summary-cart"></i>
                                <p className="header-text">Summary</p>
                                <div style={{display: `${this.state.summaryItemsLength === 0 ? 'none' : 'block'}`}} className="cart-quantity-circle">
                                    <p>{this.state.summaryItemsLength}</p>
                                </div>
                            </div>
                            <hr />
                        </header>
                            {this.displaySummaryUI(cartSummaryFunctions)}
                        <footer className='checkout-section'>
                            {this.state.checkoutError ? <p className='checkout-error-text'>You must add an item into your cart first.</p> : null}
                            {this.state.shippingCheckoutError ? <p className="checkout-error-text">Please fill out all of the missing fields in red.</p> : null}
                            {this.displayCheckoutBtn()}
                        </footer>
                    </div>
                </div>
            </div>

        )
    }
}

