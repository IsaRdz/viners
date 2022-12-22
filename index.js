var allWines = []
var cartProducts = []

const getWines = async () => {
    var response = await fetch('./db.json')
    const myWines = await response.json()
    
    return myWines.vinos
}

const wineCard = (wine) => {
    return  `<div class="card">
                <div class="card__body">
                    <div class="card__img">
                        <img
                        src="./assets/img/products/botella_gaudila2013.svg"
                        alt="Producto"
                        />
                    </div>
                    <div class="card__info">
                        <h2>${wine.marca}</h2>
                        <h2>${wine.tipo}</h2>
                        <a href="./pages/detail.html"><button value='${wine.marca}' class="card__button">Conocelo...</button></a>
                    </div>
                </div>
            </div>`
}

const cardButtonListeners = () => {
    const cardButtonsContainers = document.querySelectorAll('.card__button')
    
    cardButtonsContainers.forEach(cardButton => {
        cardButton.addEventListener('click', (event) => {
            allWines.map(wine => {
                wine.marca == event.target.value ? localStorage.setItem('myEvent', JSON.stringify(wine)) : null
            })
        })
    })
}



const renderAllWines = async () => {
    const cardsContainer = document.querySelector('.cards-container')

    //localStorage.clear()
    CartProductsExist = JSON.parse(localStorage.getItem('CartProducts'))
    
    CartProductsExist ? null : localStorage.setItem('CartProducts', JSON.stringify(cartProducts))
    console.log(CartProductsExist)

    allWines = await getWines()

    allWines.map(wine => {
        cardsContainer.insertAdjacentHTML('beforeend', wineCard(wine))
    })
    cardButtonListeners()
}

renderAllWines()
