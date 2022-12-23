const productRender = (wine) => {
    return `<div id="Container${wine.id}" class="product-resume">
                <p class="product-name">${wine.marca}</p>
                <p class="product-units">Cant. x${wine.cantidad}</p>
                <p class="product-price">$ ${wine.precio}</p>
                <i id="${wine.id}" class="fa-solid fa-trash-can"></i>
            </div>`
}

const showProducts = () => {
    var CartProducts = JSON.parse(localStorage.getItem('CartProducts'))
    const cartResumeContainer = document.querySelector('.cart-resume-container')

    CartProducts.map(product => {
        cartResumeContainer.insertAdjacentHTML('afterbegin', productRender(product))
    })
}

const showCartResume = () => {
    const cartResumeContainer = document.querySelector('.cart-resume-container')
    const shoppingCartImageContainer = document.querySelector('.shopping-cart-image-container')

    showProducts()
    
    shoppingCartImageContainer.addEventListener('click', () => {
        cartResumeContainer.classList.toggle('hidden')
    })
}

showCartResume()

const cleanProductListener = () => {
    const clenaProductButtons = document.querySelectorAll('.fa-trash-can')
    
    clenaProductButtons.forEach(clenaProductButton => {
        clenaProductButton.addEventListener('click', cleanProduct => {
            var CartProducts = JSON.parse(localStorage.getItem('CartProducts'))
            let CartProductsFiltered = CartProducts.filter(product => product.id != cleanProduct.target.id)
            localStorage.setItem('CartProducts', JSON.stringify(CartProductsFiltered))
            document.querySelector(`#Container${cleanProduct.target.id}`).remove()
        })
    }) 
}

cleanProductListener()

