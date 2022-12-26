var allWines = []
var cartProducts = []

const getWines = async () => {
    var response = await fetch('./db.json')
    const myWines = await response.json()
    
    return myWines.vinos
}

const wineCard = (wine) => {
    return  `<div id="wine${wine.id}" class="card">
                <div class="card__body">
                    <div class="card__img">
                        <img
                        src="./assets/img/wines/${wine.img}"
                        alt="${wine.marca}"
                        />
                    </div>
                    <div class="card__info">
                        <h2>${wine.marca}</h2>
                        <h2>${wine.tipo}</h2>
                    </div>
                    <div class="button-card-container">
                        <a><button class="card__button">Add to cart</button> </a>
                        <a href="./pages/detail.html"><button value='${wine.marca}' class="card__button">See more...</button></a>
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

    allWines = await getWines()

    allWines.map(wine => {
        cardsContainer.insertAdjacentHTML('beforeend', wineCard(wine))
    })
    cardButtonListeners()
}

renderAllWines()

const filterListeners = () => {
    const filtersContainers = document.querySelectorAll('.button-filter')

    filtersContainers.forEach(filter => {
        filter.addEventListener('click', event => {
            allWines.map(wine => {
                let wineToFilter = document.querySelector(`#wine${wine.id}`)
                wineToFilter.classList.remove('hidden')
                if (wine.tipo.split(' ')[0] != event.target.id) {
                    wineToFilter.classList.toggle('hidden')
                }
            })
        })
    })
}

filterListeners()