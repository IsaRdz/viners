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
                        src="${wine.img}"
                        alt="${wine.marca}"
                        />
                    </div>
                    <div class="card__info">
                        <h2>${wine.marca}</h2>
                        <h2>${wine.tipo}</h2>
                    </div>
                    <div class="button-card-container">
                        <a href="#popup-add-cart" rel="noopener noreferrer" class="link"><button value='${wine.marca}' class="card__button add_to_cart">Add to cart</button></a>
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

const renderTotalProductNumber = () => {
    document.querySelector('.cart_products_total').innerHTML = 0
    let cantidadTotal = CartProducts.reduce((accumulator, product) => 
    accumulator + product.cantidad
    ,0)
    document.querySelector('.cart_products_total').innerHTML = cantidadTotal
}

renderTotalProductNumber()

const filterListeners = () => {
    // Filtrando por buscador
    const inputSearch = document.getElementById("input-search")

    inputSearch.addEventListener("keyup", (event) => {
        allWines.map((wine) => {
            let wineToFilter = document.querySelector(`#wine${wine.id}`)
            wineToFilter.classList.remove("hidden")
            if (
                !wine.marca.toLowerCase().includes(event.target.value.toLowerCase()) &&
                !wine.tipo.toLowerCase().includes(event.target.value.toLowerCase())
            ){
                wineToFilter.classList.toggle("hidden")
            }
        })

        const notHiddenWines =
        document.querySelectorAll(".card:not(.hidden)").length

        if (notHiddenWines == 0) {
            document.querySelector(".error").classList.remove("hidden")
        } else {
            document.querySelector(".error").classList.add("hidden")
        }
    })
    const filtersContainers = document.querySelectorAll('.button-filter')

    filtersContainers.forEach(filter => {
        filter.addEventListener('click', event => {
            allWines.map(wine => {
                let wineToFilter = document.querySelector(`#wine${wine.id}`)
                wineToFilter.classList.remove('hidden')
                if (event.target.id == 'all_wines') {
                    wineToFilter.classList.remove('hidden')
                } 
                else {
                    if (wine.tipo.split(' ')[0] != event.target.id ) {
                        wineToFilter.classList.toggle('hidden')
                    }
                }
            })
        })
    })
}

filterListeners()

/* const filterListeners = () => {
    const filtersContainers = document.querySelectorAll('.button-filter')
    filtersContainers.forEach(filter => {
        filter.addEventListener('click', event => {
            allWines.map(wine => {
                let wineToFilter = document.querySelector(`#wine${wine.id}`)
                wineToFilter.classList.remove('hidden')
                if (event.target.id == 'all_wines') {
                    wineToFilter.classList.remove('hidden')
                } 
                else {
                    if (wine.tipo.split(' ')[0] != event.target.id ) {
                        wineToFilter.classList.toggle('hidden')
                    }
                }
            })
        })
    })
}

filterListeners() */

 /*const filterListeners = () => {
    const filtersContainers = document.querySelectorAll('.button-filter')
    filtersContainers.forEach(filter => {
        filter.addEventListener('click', event => {
            allWines.map(wine => {
                let wineToFilter = document.querySelector(`#wine${wine.id}`)
                wineToFilter.classList.remove('hidden')
                if (event.target.id == 'all_wines') {
                    wineToFilter.classList.remove('hidden')
                } 
                else {
                    if (wine.tipo.split(' ')[0] != event.target.id ) {
                        wineToFilter.classList.toggle('hidden')
                    }
                }
            })
        })
    })
}
filterListeners() */

const addToCartListener = () => {
    const addToCartButtonsContainers = document.querySelectorAll('.add_to_cart')
    CartProducts = JSON.parse(localStorage.getItem('CartProducts'))

    addToCartButtonsContainers.forEach(addToCartButton => {
        addToCartButton.addEventListener('click', event => {
            allWines.map(wine => {
                if (wine.marca == event.target.value) {
                    if (CartProducts.find(product => product.id == wine.id)) {
                        CartProducts.map(product => {
                            if (product.id == wine.id) {
                                product.cantidad++
                            }
                        })
                    }
                    else {
                        CartProducts.push(wine)
                    }
                    document.querySelector('.cart_products_total').innerHTML++
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