var wine = {}

const renderDetail = (wine) => {
    return `<div class="icon"><i class="fa-solid fa-heart fa-xl"></i></div>
            <picture class="image-container">
                <img src="${wine.img}" alt="${wine.marca}">
            </picture>
            <div class="detail-info-container">
                <div class="name-id-container">
                    <h1 class="wine-name">${wine.marca}</h1>
                    <p class="wine-id">ID product: ${wine.id}</p>
                </div>
                <h2 class="wine-price">Price: $ ${wine.precio}</h2>
                <div class="description-container">
                    <h3 class="wine-description-title">Description:</h3>
                    <p class="wine-description">
                        ${wine.descripcion}
                    </p>
                    <div class="wine-category">
                    <h3 class="wine-category-title">Category: </h3>
                    <p class="wine-categories">
                        ${wine.tipo}
                    </p>
                    </div>
                </div>
                <div class="wine-available">
                    <h3 class="wine-available-title"> Available: </h3>
                    <p>15 units</p>
                </div>
                <div class="purchase-container">
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            </div>`
}

const buttonListener = () => {
    const detailContainer = document.querySelector('.add-to-cart')

    detailContainer.addEventListener('click', () => {
        var CartProducts = JSON.parse(localStorage.getItem('CartProducts'))
        if (CartProducts.find(product => product.id == wine.id)) {
            CartProducts.map(product => {
                product.id == wine.id ? product.cantidad++ : null
            })
        }
        else {
            CartProducts.push(wine)
        }
        localStorage.setItem('CartProducts', JSON.stringify(CartProducts))
    })
}

const readLocalStorage = () => {
    wine = JSON.parse(localStorage.getItem('myEvent'))

    const detailContainer = document.querySelector('.detail-container')

    detailContainer.insertAdjacentHTML('beforeend', renderDetail(wine))
    buttonListener()
}

readLocalStorage()

