var CartProducts = []

const productRender = (wine) => {
  return `<div id="Container${wine.id}" class="product-resume">
                <p class="product-name">${wine.marca}</p>
                <p class="product-units">Cant. x${wine.cantidad}</p>
                <p class="product-price">$ ${wine.precio}</p>
                <i id="${wine.id}" class="fa-solid fa-trash-can"></i>
            </div>`
}

const showProducts = () => {
    CartProducts = JSON.parse(localStorage.getItem('CartProducts'))
    const cartResumeContainer = document.querySelector('.products_container_resume')
    const productsContainers = document.querySelectorAll('.product-resume')
    if (CartProducts.length == 0) {
        document.querySelector('#empty-cart').classList.remove('hidden')
    } else {
        document.querySelector('#empty-cart').classList.add('hidden')
    }
    productsContainers.forEach(product => product.remove())
    
    CartProducts.map(product => {
        cartResumeContainer.insertAdjacentHTML('afterbegin', productRender(product))
    })

}

const showCartResume = () => {
    const cartResumeContainer = document.querySelector('.cart-resume-container')
    const shoppingCartImageContainer = document.querySelector('.shopping-cart-image-container')
    
    showProducts()
    
    shoppingCartImageContainer.addEventListener('click', () => {
        showProducts()
        cleanProductListener()
        cartResumeContainer.classList.toggle('hidden')
    })
}

showCartResume()

const cleanProductListener = () => {
    const clenaProductButtons = document.querySelectorAll('.fa-trash-can')
    
    clenaProductButtons.forEach(clenaProductButton => {
        clenaProductButton.addEventListener('click', cleanProduct => {
            CartProducts = JSON.parse(localStorage.getItem('CartProducts'))
            ProductEliminated = CartProducts.filter(product => product.id == cleanProduct.target.id)
            for (let i = 0; i < ProductEliminated[0].cantidad; i++) {
                document.querySelector('.cart_products_total').innerHTML--
            }
            CartProducts = CartProducts.filter(product => product.id != cleanProduct.target.id)
            localStorage.setItem('CartProducts', JSON.stringify(CartProducts))
            showProducts()
            cleanProductListener()
        })
    }) 
}

const cleanCartListener = () => {
    const cleanCartContainer = document.querySelector('.clean-cart-button')
    const ProductCartContainer = document.querySelectorAll('.product-resume')
    
    cleanCartContainer.addEventListener('click', () => {
        ProductCartContainer.forEach(product => product.remove())
        localStorage.setItem('CartProducts', JSON.stringify([]))
        showProducts()
        document.querySelector('.cart_products_total').innerHTML = 0
    })
}

cleanCartListener()