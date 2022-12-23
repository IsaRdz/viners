var wine = {}

const renderDetail = (wine) => {
    return `<picture class="image-container">
                <img src="../assets/img/wines/${wine.img}" alt="">
            </picture>
            <div class="detail-info-container">
                <div class="name-id-container">
                    <h1 class="wine-name">${wine.marca}</h1>
                    <h2 class="wine-price">Price: $ ${wine.precio}</h2>
                </div>
                <p class="wine-id">ID product: ${wine.id}</p>
                <div class="description-container">
                    <h3>Description:</h3>
                    <p class="wine-description">
                        ${wine.descripcion}
                    </p>
                    <div class="wine-category">
                    <h3>Category: </h3>
                    <p class="wine-categories"> 
                        ${wine.tipo}
                    </p>
                    </div>
                </div>
                <div class="wine-available">Available: 15 units</div>
                <div class="purchase-container">
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

