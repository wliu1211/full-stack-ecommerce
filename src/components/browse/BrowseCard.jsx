import React from 'react'


function BrowseCard({cardProps, product, cardFunctions, detailsPageFunction}) {
    const {clothesSizeClick, quantity, clothesSizeSelected} = cardProps
    const {id, title, name, description, img, price, clothesSize} = product
    const {itemsDetailClick} = detailsPageFunction
    const displayClothesSize = () => {
        const sizesArr = clothesSize.split(",")
        return (
            <div className='size-primary-container'>
                <p>Size: </p>
                <div className='size-secondary-container'>
                    <div className='size-selected' onClick={cardFunctions.handleClothesSizeClick} name={name} label="size-switcher-btn" >{clothesSizeSelected[name]}</div>
                    <div style={{display: `${clothesSizeClick[name] ? "flex" : "none"}`}} className='size-list'>
                        {sizesArr.map(size => <p className='size-text' onClick={cardFunctions.handleClothesSizeClick} name={name} label="size-option" id={id}>{size}</p>)}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <form className="card" onSubmit={cardFunctions.addToCart}>
            <h3 className="card-title">{title}</h3>
            <div className="img-wrapper">
                <img onClick={itemsDetailClick} id={id} name={name} src={img} alt="electronic-img" />
            </div>
            <p className="price">Price: $<span className="price-number">{price}</span></p>
            {clothesSize.length ? displayClothesSize() : <div></div>}
            <div className="quantity-container">
                <p>Quantity: </p>
                <div className="quantity-switcher">
                    <button name={name} onClick={cardFunctions.quantityChange} type="button">-</button>
                    <p>{quantity[name]}</p>
                    <button name={name} onClick={cardFunctions.quantityChange} type="button">+</button>
                </div>
            </div>
            
            <input id={id} className="card-to-cart-btn" name={name} value="Add to Cart" type="submit"/>
        </form>
    )
}

export default BrowseCard
