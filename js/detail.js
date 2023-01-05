var wine = {}

const renderDetail = (wine) => {
    return `<div class="icon"><i class="fa-solid fa-heart fa-xl active" id="fa-heart"></i></div>
            <picture class="image-container">
                <img src="${wine.img}" alt="${wine.marca}">
            </picture>
            <div class="detail-info-container">
                <div class="name-id-container">
                    <h1 class="wine-name">${wine.marca}</h1>
                    <p class="wine-id">ID producto: ${wine.id}</p>
                </div>
                <h2 class="wine-price">Precio: $ ${wine.precio}</h2>
                <div class="description-container">
                    <h3 class="wine-description-title">Descripción:</h3>
                    <p class="wine-description">
                        ${wine.descripcion}
                    </p>
                    <div class="wine-category">
                    <h3 class="wine-category-title">Categoría: </h3>
                    <p class="wine-categories">
                        ${wine.tipo}
                    </p>
                    </div>
                </div>
                <div class="wine-available">
                    <h3 class="wine-available-title"> Stock: </h3>
                    <p>15 unidades</p>
                </div>
                <div class="purchase-container">
                    <a href="#popup-add-cart" rel="noopener noreferrer" class="link">
                    <button class="add-to-cart">Agregar al carrito</button>
                    </a>
                </div>
            </div>`
}

const buttonListener = () => {
  const detailContainer = document.querySelector(".add-to-cart")

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
        document.querySelector('.cart_products_total').innerHTML++
        localStorage.setItem('CartProducts', JSON.stringify(CartProducts))
    })
}

const renderTotalProductNumber = () => {
    document.querySelector('.cart_products_total').innerHTML = 0
    var CartProducts = JSON.parse(localStorage.getItem('CartProducts'))
    let cantidadTotal = CartProducts.reduce((accumulator, product) => 
        accumulator + product.cantidad
    ,0)
    document.querySelector('.cart_products_total').innerHTML = cantidadTotal
}

renderTotalProductNumber()

const readLocalStorage = () => {
  wine = JSON.parse(localStorage.getItem("myEvent"))

  const detailContainer = document.querySelector(".detail-container")

  detailContainer.insertAdjacentHTML("beforeend", renderDetail(wine))
  buttonListener()
}

readLocalStorage()

const addFavorite = () => {
    const faHeart = document.getElementById('fa-heart')

    faHeart.addEventListener('click', ()=>{
        if(faHeart.classList.toggle("active")){
            faHeart.style.fontSize = "x-large"
            faHeart.style.color = "#25282a"
        }else{
            faHeart.style.fontSize = "xx-large"
            faHeart.style.color = "#9e2a2b"
        }
    })
}
addFavorite()