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
                        <a><button value='${wine.marca}' class="card__button add_to_cart">Add to cart</button></a>
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
    addToCartListener()
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

const addToCartListener = () => {
    const addToCartButtonsContainers = document.querySelectorAll('.add_to_cart')
    CartProducts = JSON.parse(localStorage.getItem('CartProducts'))

    addToCartButtonsContainers.forEach(addToCartButton => {
        addToCartButton.addEventListener('click', event => {
            allWines.map(wine => {
                if (wine.marca == event.target.value) {
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
                }
            })
        })
    })
}

const buttonTop = document.querySelector('#buttonTop');

window.onscroll = () => {
    if (document.documentElement.scrollTop > 100) {
        buttonTop.classList.add('shows')
    } else {
        buttonTop.classList.remove('shows')
    }
    buttonTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    })
}