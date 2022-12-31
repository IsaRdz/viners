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

let contenedorSelect = document.getElementById("select-js")
let inputSearch = document.getElementById("input-search")
let padreSelect = document.getElementById("category-js")
let buttonsSelect = document.querySelectorAll(".button-filter")
let padreButtons = document.getElementById("buttons-js")

const wineTypes = async () => {
  allWines = await getWines()
  let tipos = []
  allWines.map((wine) => {
    tipos.push(wine.tipo)
  })
  return [...new Set(tipos)]
}
console.log(wineTypes())

// function renderButtons() {
//   wineTypes().then((tipos) => {
//     tipos.map((tipo) => {
//       padreButtons.insertAdjacentHTML(
//         "beforeend",
//         `<button id="${tipo}" class="button-filter">
//          <i id="${tipo}" class="fa-solid fa-wine-bottle"></i>
//          <h2 id="${tipo}">${tipo}</h2>
//          </button>`
//       )
//     })
//     console.log(tipos)
//   })
// }
// renderButtons()

contenedorSelect.addEventListener("click", (event) => {
  let filtadoPorTipo = filtrar()
  renderWines(filtadoPorTipo)
})

// function renderOptions() {
//   wineTypes().then((tipos) => {
//     tipos.map((tipo) => {
//       contenedorSelect.insertAdjacentHTML(
//         "beforeend",
//         `<option class="fa-solid fa-wine-bottle" value="${tipo}">${tipo}</option>`
//       )
//     })
//     console.log(tipos)
//   })
// }
// renderOptions()

// padreSelect.addEventListener("change", (event) => {
//   let filtadoPorTipo = filtrar()
//   renderWines(filtadoPorTipo)
// })

function renderWines(vinos) {
  let cardsContainer = document.querySelector(".cards-container")
  cardsContainer.innerHTML = ""
  vinos.map((vino) => {
    cardsContainer.insertAdjacentHTML("beforeend", wineCard(vino))
  })
  cardButtonListeners()
}

function filtarPorTipo(vinos, tipoSeleccionado) {
  if (tipoSeleccionado === "Todos".toLowerCase()) {
    return vinos
  } else {
    return vinos.filter(
      (vino) => vino.tipo.toLowerCase() === tipoSeleccionado.toLowerCase()
    )
  }
}

// inputSearch.addEventListener("keyup", (event) => {
//   let vinosFiltradosPorBusqueda = filtrar()
//   renderWines(vinosFiltradosPorBusqueda)
// })

function filtarPorBusqueda(vinos, busqueda) {
  return vinos.filter((vino) => {
    return (
      vino.marca.toLowerCase().includes(busqueda.toLowerCase()) ||
      vino.tipo.toLowerCase().includes(busqueda.toLowerCase())
    )
  })
}

function filtrar() {
  let vinosFiltrados = filtarPorTipo(allWines, contenedorSelect.value)
  let vinosFiltradosPorBusqueda = filtarPorBusqueda(
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

// const filterListeners = () => {
//   const filtersContainers = document.querySelectorAll(".button-filter")

//   filtersContainers.forEach((filter) => {
//     filter.addEventListener("click", (event) => {
//       allWines.map((wine) => {
//         let wineToFilter = document.querySelector(`#wine${wine.id}`)
//         wineToFilter.classList.remove("hidden")
//         if (wine.tipo.split(" ")[0] != event.target.id) {
//           wineToFilter.classList.toggle("hidden")
//         }
//       })
//     })
//   })
// }
// filterListeners()

// filtrar por busqueda segun buttonSelect

function filtrarPorTipoPorBoton(vinos, tipoSeleccionado) {
  if (tipoSeleccionado === "Todos".toLowerCase()) {
    return vinos
  } else {
    return vinos.filter(
      (vino) => vino.tipo.toLowerCase() === tipoSeleccionado.toLowerCase()
    )
  }
}

function filtrarPorBusquedaPorBoton(vinos, busqueda) {
  return vinos.filter((vino) => {
    return (
      vino.marca.toLowerCase().includes(busqueda.toLowerCase()) ||
      vino.tipo.toLowerCase().includes(busqueda.toLowerCase())
    )
  })
}

function filtrarPorBotonYBusqueda(event) {
  let vinosFiltrados = filtrarPorTipoPorBoton(allWines, event.target.id)
  let vinosFiltradosPorBusqueda = filtrarPorBusquedaPorBoton(
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

function renderWinesPorBotonYBusqueda(vinos) {
  let cardsContainer = document.querySelector(".cards-container")
  cardsContainer.innerHTML = ""
  vinos.map((vino) => {
    cardsContainer.insertAdjacentHTML("beforeend", wineCard(vino))
  })
  cardButtonListeners()
}

buttonsSelect.forEach((button) => {
  button.addEventListener("click", (event) => {
    let vinosFiltradosPorBoton = filtrarPorBotonYBusqueda(event)
    renderWinesPorBotonYBusqueda(vinosFiltradosPorBoton)
    console.log(event.target.id)
  })
})
