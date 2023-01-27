import React, {Component} from "react";
import './browse.css'
import DetailModal from './DetailModal'
import BrowseCard from "./BrowseCard";
const uniqid = require('uniqid')

const categoryList = [
    {text: "All", name: "category", categoryItem: "all"},
    {text: "Accessories", name: "category", categoryItem: "accessories"},
    {text: "Clothes", name: "category", categoryItem: "clothes"},
    {text: "Electronics", name: "category", categoryItem: "electronics"},
    {text: "School", name: "category", categoryItem: "school"},
    {text: "Tools", name: "category", categoryItem: "tools"},
]
const sortList = [
    {text: "A - Z", name: "sort", sortItem: "ascendingName"},
    {text: "Z - A", name: "sort", sortItem: "descendingName"},
    {text: "Price: Lo to Hi", name: "sort", sortItem: "ascendingPrice"},
    {text: "Price: Hi to Lo", name: "sort", sortItem: "descendingPrice"},
]

export default class BrowseScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            modalClicked: false,
            selectedProdIndex: 0,
        }
    }

    handleDetailsPageClick = (e) => {
        this.setState({modalSwitcher: true})
        let prodIndex = this.props.state.products.findIndex(i => i.id === e.target.id)
        this.setState({selectedProdIndex: prodIndex})
    }
    closeModal = (e) => {
        if (e.target.attributes[1] && e.target.attributes[1].value === "close-modal"){
            this.setState({modalSwitcher: false})
        }
    }

    render(){
        const {products, clicked, dropdownText, productSearchInput, quantity} = this.props.state;
        const { handleDropdownClick, handleBrowseDropdownClick, handleSearchInput, handleProductSearch} = this.props.functions;

        const detailsFunction = {
            itemsDetailClick: this.handleDetailsPageClick,
        }
        const modalFunctions = {
            closeModal: this.closeModal,
            modalQuantitySwitcher: this.props.modalFunctions.modalQuantitySwitcher,
            modalAddProduct: this.props.modalFunctions.modalAddProduct
        }
        const modalState = {
            modalClicked: this.state.modalSwitcher,
            productIndex: this.state.selectedProdIndex,
            quantity: quantity
        }
        return(
            <>
                <div className="browse-header-container">
                    <form onSubmit={handleProductSearch} className="search-container">
                        <input type="text" name="search-bar" id="search-bar" placeholder="Product Name" onChange={handleSearchInput} value={productSearchInput}/>
                        <button className="search-btn"><i class="fas fa-search"></i></button>
                    </form>
                    <div className="category-container">
                        <p >Category: </p>
                        <button name="category" onClick={handleDropdownClick}>{dropdownText.categoryText} <i class="fas fa-angle-down"></i></button>
                        <div style={{display: `${clicked["category"] ? "block" : "none"}`}} className="category-dropdown search-dropdown">
                            {categoryList.map(category => (
                                <p onClick={handleBrowseDropdownClick} key={uniqid()} name={category.name} categoryName={category.categoryItem}>{category.text}</p>
                            ))}
                        </div>
                    </div>
                    <div className="sort-container">
                        <p>Sort: </p>
                        <button name="sort" onClick={handleDropdownClick}>{dropdownText.sortText} <i class="fas fa-angle-down"></i></button>
                        <div style={{display: `${clicked["sort"] ? "block" : "none"}`}} className="sort-dropdown search-dropdown">
                            {sortList.map(sortItem => (
                                <p onClick={handleBrowseDropdownClick} key={uniqid()} name={sortItem.name} sortName={sortItem.sortItem}>{sortItem.text}</p>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="card-container">
                    {products.map(product => (
                        <BrowseCard 
                            cardProps={this.props.state}
                            cardFunctions={this.props.functions}
                            product={product}
                            key={product.id}
                            detailsPageFunction={detailsFunction}
                        />
                    ))}
                </div>
                <DetailModal 
                    functions={modalFunctions}
                    state={modalState}
                    products={products}
                />
            </>
        )
    }



}