var wine = {}

const renderDetail = (wine) => {
    return `<picture class="image-container">
                <img src="..." alt="">
            </picture>
            <div class="detail-info-container">
                <div class="name-id-container">
                    <h1 class="wine-name">${wine.marca}</h1>
                    <p class="wine-id">ID: ${wine.id}</p>
                </div>
                <div class="description-container">
                    <p class="wine-description">
                        ${wine.descripcion}
                    </p>
                    <p class="wine-categories">
                        ${wine.tipo}
                    </p>
                </div>
                <div class="wine-available">Available: 15 units</div>
                <div class="purchase-container">
                    <p class="wine-price">Price: $ ${wine.precio}</p>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            </div>`
}

const buttonListener = () => {
    const detailContainer = document.querySelector('.add-to-cart')

    var CartProducts = JSON.parse(localStorage.getItem('CartProducts'))
    wine = JSON.parse(localStorage.getItem('myEvent'))

    detailContainer.addEventListener('click', () => {
        if (CartProducts) {
            if (CartProducts.find(product => product.id == wine.id)) {
                CartProducts.map(product => {
                    product.id == wine.id ? product.cantidad++ : null
                })
            }
            else {
                CartProducts.push(wine)
            } 
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

