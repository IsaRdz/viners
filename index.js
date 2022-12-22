var allWines = []

const showCartResume = () => {
    const cartResumeContainer = document.querySelector('.cart-resume-container')
    const shoppingCartImageContainer = document.querySelector('.shopping-cart-image-container')

    shoppingCartImageContainer.addEventListener('click', () => {
        cartResumeContainer.classList.toggle('hidden')
    })
}

showCartResume()

const cleanProductListener = () => {
    const clenaProductButtons = document.querySelectorAll('.fa-trash-can')
    
    clenaProductButtons.forEach(clenaProductButton => {
        clenaProductButton.addEventListener('click', cleanProduct => {
            let asd = document.querySelector(`#${cleanProduct.target.id}Container`).remove()
            console.log(asd)
        })
    }) 
}

cleanProductListener()

const getWines = async () => {
    var response = await fetch('./db.json')
    const myWines = await response.json()
    
    return myWines.vinos
}

const wineCard = (wine) => {
    return `<div class="card">
                <p>${wine.tipo}</p>
                <div class="card__body">
                    <div class="card__img">
                        <img src="./assets/img/vino1.jpg" alt="Producto">
                    </div>
                    <div class="card__info">
                        <h2>${wine.marca}</h2>
                        <h3>Id: ${wine.id}</h3>
                        <h2>$ ${wine.precio}</h2>
                        <h2>Description</h2>
                        <p>${wine.descripcion}</p>
                        <h2>Avalaible: 20</h2>
                        <a href="">More...</a>
                    </div>
                </div>
            </div>`
}

const renderAllWines = async () => {
    const cardsContainer = document.querySelector('.cards-container')

    allWines = await getWines()

    // allWines.map(wine => {
    //     cardsContainer.insertAdjacentHTML('beforeend', wineCard(wine))
    // })
    
}

renderAllWines()