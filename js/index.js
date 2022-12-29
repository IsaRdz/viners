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
                        <a><button class="card__button">Add to cart</button> </a>
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

  //localStorage.clear()
  CartProductsExist = JSON.parse(localStorage.getItem("CartProducts"))

  CartProductsExist
    ? null
    : localStorage.setItem("CartProducts", JSON.stringify(cartProducts))

  allWines = await getWines()

  allWines.map((wine) => {
    cardsContainer.insertAdjacentHTML("beforeend", wineCard(wine))
  })
  cardButtonListeners()
}

renderAllWines()

// Array de tipos de vinos sin repetir

const wineTypes = async () => {
  allWines = await getWines()
  let tipos = []
  allWines.map((wine) => {
    tipos.push(wine.tipo)
  })
  return [...new Set(tipos)]
}

console.log(wineTypes())

function renderOptions() {
  const select = document.getElementById("select-js")
  wineTypes().then((tipos) => {
    tipos.map((tipo) => {
      select.insertAdjacentHTML(
        "beforeend",
        `<option selected value="${tipo}">${tipo}</option>`
      )
    })
  })
}

renderOptions()

let contenedorSelect = document.getElementById("select-js")

contenedorSelect.addEventListener("change", (event) => {
  allWines.map((wine) => {
    let wineToFilter = document.querySelector(`#wine${wine.id}`)
    wineToFilter.classList.remove("hidden")
    if (wine.tipo.toLowerCase() != event.target.value.toLowerCase()) {
      wineToFilter.classList.toggle("hidden")
    }
  })
})

let inputBusqueda = document.getElementById("input-search")

inputBusqueda.addEventListener("keyup", (event) => {
  allWines.map((wine) => {
    let wineToFilter = document.querySelector(`#wine${wine.id}`)
    wineToFilter.classList.remove("hidden")
    if (
      !wine.marca.toLowerCase().includes(event.target.value.toLowerCase()) &&
      !wine.tipo.toLowerCase().includes(event.target.value.toLowerCase())
    ) {
      wineToFilter.classList.toggle("hidden")
    }
  })

  const notHiddenWines = document.querySelectorAll(".card:not(.hidden)").length

  if (notHiddenWines == 0) {
    document.querySelector(".error").classList.remove("hidden")
  } else {
    document.querySelector(".error").classList.add("hidden")
  }
})

function filtradoPorBusquedaYSelect() {
  let inputBusqueda = document.getElementById("input-search")
  let contenedorSelect = document.getElementById("select-js")

  allWines.map((wine) => {
    let wineToFilter = document.querySelector(`#wine${wine.id}`)
    wineToFilter.classList.remove("hidden")
    if (
      !wine.marca.toLowerCase().includes(inputBusqueda.value.toLowerCase()) &&
      !wine.tipo.toLowerCase().includes(inputBusqueda.value.toLowerCase())
    ) {
      wineToFilter.classList.toggle("hidden")
    }
    if (wine.tipo.toLowerCase() != contenedorSelect.value.toLowerCase()) {
      wineToFilter.classList.toggle("hidden")
    }
  })
}

filtradoPorBusquedaYSelect()

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
      ) {
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

  const filtersContainers = document.querySelectorAll(".button-filter")

  filtersContainers.forEach((filter) => {
    filter.addEventListener("click", (event) => {
      allWines.map((wine) => {
        let wineToFilter = document.querySelector(`#wine${wine.id}`)
        wineToFilter.classList.remove("hidden")
        if (wine.tipo.split(" ")[0] != event.target.id) {
          wineToFilter.classList.toggle("hidden")
        }
      })
    })
  })
}

filterListeners()

// Filtrando por buscador
