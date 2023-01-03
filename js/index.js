var allWines = []
var cartProducts = []

const getWines = async () => {
  var response = await fetch("./db.json")
  const myWines = await response.json()

  return myWines.vinos
}

const wineCard = (wine) => {
  return `<div id="wine${wine.id}" class="card">
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
  const cardButtonsContainers = document.querySelectorAll(".card__button")

  cardButtonsContainers.forEach((cardButton) => {
    cardButton.addEventListener("click", (event) => {
      allWines.map((wine) => {
        wine.marca == event.target.value
          ? localStorage.setItem("myEvent", JSON.stringify(wine))
          : null
      })
    })
  })
}

const renderAllWines = async () => {
  const cardsContainer = document.querySelector(".cards-container")

  CartProductsExist = JSON.parse(localStorage.getItem("CartProducts"))
  CartProductsExist
    ? null
    : localStorage.setItem("CartProducts", JSON.stringify(cartProducts))

  allWines = await getWines()

  allWines.map((wine) => {
    cardsContainer.insertAdjacentHTML("beforeend", wineCard(wine))
  })
  cardButtonListeners()
  addToCartListener()
}

renderAllWines()

const renderTotalProductNumber = () => {
  document.querySelector(".cart_products_total").innerHTML = 0
  let cantidadTotal = CartProducts.reduce(
    (accumulator, product) => accumulator + product.cantidad,
    0
  )
  document.querySelector(".cart_products_total").innerHTML = cantidadTotal
}

renderTotalProductNumber()

let inputSearch = document.getElementById("input-search")
let padreSelect = document.getElementById("category-js")
let buttonsSelect = document.querySelectorAll(".button-filter")

const wineTypes = async () => {
  allWines = await getWines()
  let tipos = []
  allWines.map((wine) => {
    tipos.push(wine.tipo)
  })
  return [...new Set(tipos)]
}
// console.log(wineTypes())

function filtrarPorTipo(vinos, tipoSeleccionado) {
  if (tipoSeleccionado === "all_wines".toLowerCase()) {
    return vinos
  } else {
    return vinos.filter(
      (vino) => vino.tipo.toLowerCase() === tipoSeleccionado.toLowerCase()
    )
  }
}

function filtrarPorBusqueda(vinos, busqueda) {
  return vinos.filter((vino) => {
    return (
      vino.marca.toLowerCase().includes(busqueda.toLowerCase()) ||
      vino.tipo.toLowerCase().includes(busqueda.toLowerCase())
    )
  })
}

function filtrarPorTipoYbusqueda(event) {
  let vinosFiltrados = filtrarPorTipo(allWines, event.target.id)
  let vinosFiltradosPorBusqueda = filtrarPorBusqueda(
    vinosFiltrados,
    inputSearch.value
  )
  vinosFiltradosPorBusqueda.length === 0
    ? (document.querySelector(".error").classList.remove("hidden"),
      (document.querySelector(".cards-container").style.display = "none"))
    : (document.querySelector(".error").classList.add("hidden"),
      (document.querySelector(".cards-container").style.display = "flex"))
  return vinosFiltradosPorBusqueda
}

function renderWinesPorTipoYbusqueda(vinos) {
  let cardsContainer = document.querySelector(".cards-container")
  cardsContainer.innerHTML = ""
  vinos.map((vino) => {
    cardsContainer.insertAdjacentHTML("beforeend", wineCard(vino))
  })
  cardButtonListeners()
  addToCartListener()
}

// button-filter--active

padreSelect.addEventListener("click", (event) => {
  let buttonActive = document.querySelector(".button-filter--active")
  buttonActive.classList.remove("button-filter--active")
  event.target.classList.add("button-filter--active")
})

// Filtrando por buscador segun el tipo de vino seleccionado

inputSearch.addEventListener("keyup", (event) => {
  let buttonActive = document.querySelector(".button-filter--active")
  let vinosFiltrados = filtrarPorTipo(allWines, buttonActive.id)
  let vinosFiltradosPorBusqueda = filtrarPorBusqueda(
    vinosFiltrados,
    event.target.value
  )
  vinosFiltradosPorBusqueda.length === 0
    ? (document.querySelector(".error").classList.remove("hidden"),
      (document.querySelector(".cards-container").style.display = "none"))
    : (document.querySelector(".error").classList.add("hidden"),
      (document.querySelector(".cards-container").style.display = "flex"))
  renderWinesPorTipoYbusqueda(vinosFiltradosPorBusqueda)
  cardButtonListeners()
})

buttonsSelect.forEach((button) => {
  button.addEventListener("click", (event) => {
    let vinosFiltrados = filtrarPorTipoYbusqueda(event)
    renderWinesPorTipoYbusqueda(vinosFiltrados)
    cardButtonListeners()
  })
})

const addToCartListener = () => {
  const addToCartButtonsContainers = document.querySelectorAll(".add_to_cart")
  CartProducts = JSON.parse(localStorage.getItem("CartProducts"))

  addToCartButtonsContainers.forEach((addToCartButton) => {
    addToCartButton.addEventListener("click", (event) => {
      allWines.map((wine) => {
        if (wine.marca == event.target.value) {
          if (CartProducts.find((product) => product.id == wine.id)) {
            CartProducts.map((product) => {
              if (product.id == wine.id) {
                product.cantidad++
              }
            })
          } else {
            CartProducts.push(wine)
          }
          document.querySelector(".cart_products_total").innerHTML++
          localStorage.setItem("CartProducts", JSON.stringify(CartProducts))
        }
      })
    })
  })
}

const buttonTop = document.querySelector("#buttonTop")

window.onscroll = () => {
  if (document.documentElement.scrollTop > 100) {
    buttonTop.classList.add("shows")
  } else {
    buttonTop.classList.remove("shows")
  }
  buttonTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}
