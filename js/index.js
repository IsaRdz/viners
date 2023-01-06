var allWines = []
var cartProducts = []

const getWines = async () => {
  var response = await fetch("./db.json")
  const myWines = await response.json()

  return myWines.vinos
}

const wineCard = (wine) => {
<<<<<<< HEAD
    return  `<div id="wine${wine.id}" class="card no_hidden">
=======
  return `<div id="wine${wine.id}" class="card">
>>>>>>> origin/develop
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
                        <a href="#popup-add-cart" rel="noopener noreferrer" class="link"><button value='${wine.marca}' class="card__button add_to_cart">Agregar al carrito</button></a>
                        <a href="./pages/detail.html"><button value='${wine.marca}' class="card__button">Ver producto</button></a>
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

<<<<<<< HEAD
    inputSearch.addEventListener("keyup", (event) => {
        console.log(event)
        const winesRenderContainer = document.querySelectorAll('.no_hidden')
        var winesRender = []
        var winesFiltered = []
        
        winesRenderContainer.forEach(wineRender => {
            let id = wineRender.id.split('wine')[1]
            allWines.find(wine => {
                if (wine.id == id) winesRender.push(wine)
            })
        })
        console.log(winesRender)
        winesRender.map(wine => {
            wine.marca.toLowerCase().includes(event.target.value.toLowerCase()) ? winesFiltered.push(wine) : null
        })
        winesRenderContainer.forEach(wineRender => {
            let id = wineRender.id.split('wine')[1]
            winesFiltered.find(wine => {
                wine.id == id ? null : wineRender.classList.add('hidden')
            })
        })
        // allWines.map((wine) => {
        //     let wineToFilter = document.querySelector(`#wine${wine.id}`)
        //     wineToFilter.classList.remove("hidden")
        //     if (
        //         !wine.marca.toLowerCase().includes(event.target.value.toLowerCase())
        //     ){
        //         wineToFilter.classList.toggle("hidden")
        //     }
        // })

        // const notHiddenWines =
        // document.querySelectorAll(".card:not(.hidden)").length

        // if (notHiddenWines == 0) {
        //     document.querySelector(".error").classList.remove("hidden")
        // } else {
        //     document.querySelector(".error").classList.add("hidden")
        // }
    })
=======
const wineTypes = async () => {
  allWines = await getWines()
  let tipos = []
  allWines.map((wine) => {
    tipos.push(wine.tipo)
  })
  return [...new Set(tipos)]
}

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
      (document.querySelector(".cards-container").style.display = "none")) && 
      (document.querySelector(".title-container").classList.add("hidden"))
    : (document.querySelector(".error").classList.add("hidden"),
      (document.querySelector(".cards-container").style.display = "flex")) &&
      (document.querySelector(".title-container").classList.remove("hidden"))
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

 const filterListeners = () => {
>>>>>>> origin/develop
    const filtersContainers = document.querySelectorAll('.button-filter')
    filtersContainers.forEach(filter => {
        filter.addEventListener('click', event => {
            allWines.map(wine => {
                let wineToFilter = document.querySelector(`#wine${wine.id}`)
                wineToFilter.classList.remove('hidden')
                if (event.target.id == 'all_wines') {
                    wineToFilter.classList.remove('hidden')
                    wineToFilter.classList.add('no_hidden')
                } 
                else {
                    if (wine.tipo.split(' ')[0] != event.target.id ) {
                        wineToFilter.classList.toggle('hidden')
                        wineToFilter.classList.remove('no_hidden')
                    }
                    else {
                        wineToFilter.classList.add('no_hidden')
                    }
                }
            })
        })
    })
    //searchListener()
}
filterListeners() 

// const searchListener = () => {
//     const searchContainer = document.querySelector('.searchInput')

//     searchContainer.addEventListener('keyup', event => {
//         const winesRenderContainer = document.querySelectorAll('.no_hidden')
//         var winesRender = []
//         var winesFiltered = []
        
//         winesRenderContainer.forEach(wineRender => {
//             let id = wineRender.id.split('wine')[1]
//             allWines.find(wine => {
//                 if (wine.id == id) winesRender.push(wine)
//             })
//         })
//         winesRender.map(wine => {
//             wine.marca.toLowerCase().includes(event.target.value.toLowerCase()) ? winesFiltered.push(wine) : null
//         })
//         winesRenderContainer.forEach(wineRender => {
//             let id = wineRender.id.split('wine')[1]
//             winesFiltered.find(wine => {
//                 wine.id == id ? null : winesRender.classList.toggle('hidden')
//             })
//         })
//         //console.log(winesFiltered)
//         // `wine${wine.id}` == event.target.value
//     })
// }

//searchListener()

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
