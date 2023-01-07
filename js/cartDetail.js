const renderDetail = (wine) => {
  return `<div id="Container${wine.id}" class="item-cart">
              <div class="item-image">
                  <img src="${wine.img}" alt="${wine.marca}">
              </div>
              <div class="item-name">
                  <p>${wine.marca}</p>
              </div>
              <form class="count-product">
                  <button id="${wine.id}" type="button" class="button-item-cart subtract" aria-label="Subtract one item">-</button>
                  <span id="${wine.id}" class="show-units">${wine.cantidad}</span>
                  <button id="${wine.id}" type="button" class="button-item-cart add" aria-label="Add one item">+</button>
              </form>
              <div class="item-price">
                  <p id="Precio${wine.id}">$ ${wine.precio * wine.cantidad}</p>
              </div>
              <i id="${wine.id}" class="fa-regular fa-trash-can fa-xl"></i>
          </div>`
}

const renderProducts = () => {
  const cartDetailContainer = document.querySelector('.cart-detail-container')
  var CartProducts = JSON.parse(localStorage.getItem('CartProducts'))
  CartProducts.length != 0 ? null : document.querySelector('#empty-cart').classList.remove('hidden')
  
  CartProducts.map(product => {
      cartDetailContainer.insertAdjacentHTML('afterbegin', renderDetail(product))
  })
 
}

renderProducts()

const cleanProductListener = () => {
  const clenaProductButtons = document.querySelectorAll('.fa-trash-can')
  
  clenaProductButtons.forEach(clenaProductButton => {
      clenaProductButton.addEventListener('click', cleanProduct => {
          var CartProducts = JSON.parse(localStorage.getItem('CartProducts'))
          ProductEliminated = CartProducts.filter(product => product.id == cleanProduct.target.id)
          for (let i = 0; i < ProductEliminated[0].cantidad; i++) {
              document.querySelector('.cart_products_total').innerHTML--
          }
          let CartProductsFiltered = CartProducts.filter(product => product.id != cleanProduct.target.id)
          localStorage.setItem('CartProducts', JSON.stringify(CartProductsFiltered))
          document.querySelector(`#Container${cleanProduct.target.id}`).remove()
          renderTotalPrice()
          emptyCartMessage()
      })
  }) 
}

cleanProductListener()

const subtractListener = () => {
  const subtractButtonsContainer = document.querySelectorAll('.subtract')
  const unitsContainer = document.querySelectorAll('.show-units')

  subtractButtonsContainer.forEach(subtractButton => {
      subtractButton.addEventListener('click', event => {
          var CartProducts = JSON.parse(localStorage.getItem('CartProducts'))
          
          CartProducts.map(CartProduct => {
              if (CartProduct.id == event.target.id) {
                  unitsContainer.forEach(Unit => {
                      if (Unit.id == event.target.id) {
                          if (Unit.innerHTML > 1) {
                              document.querySelector('.cart_products_total').innerHTML--
                              Unit.innerHTML--
                              CartProduct.cantidad--
                              document.querySelector(`#Precio${event.target.id}`).innerHTML = CartProduct.cantidad * CartProduct.precio
                              localStorage.setItem('CartProducts', JSON.stringify(CartProducts))
                              renderTotalPrice()
                          }
                          else {
                              event.target.disabled = true
                          }
                      }
                  })
              }
          })
      })
  })
}

subtractListener()

const addListener = () => {
  const addButtonsContainer = document.querySelectorAll('.add')
  const unitsContainer = document.querySelectorAll('.show-units')
  const subtractButtonsContainer = document.querySelectorAll('.subtract')


  addButtonsContainer.forEach(addButton => {
      addButton.addEventListener('click', event => {
          var CartProducts = JSON.parse(localStorage.getItem('CartProducts'))
          
          CartProducts.map(CartProduct => {
              if (CartProduct.id == event.target.id) {
                  unitsContainer.forEach(Unit => {
                      if (Unit.id == event.target.id) {
                          document.querySelector('.cart_products_total').innerHTML++
                          Unit.innerHTML++
                          CartProduct.cantidad++
                          document.querySelector(`#Precio${event.target.id}`).innerHTML = CartProduct.cantidad * CartProduct.precio
                          localStorage.setItem('CartProducts', JSON.stringify(CartProducts))
                          renderTotalPrice()
                          subtractButtonsContainer.forEach(subtract => {
                              if (event.target.id == subtract.id) {
                                  subtract.disabled = false
                              }  
                          })
                      }
                  })
              }
          })
      })
  })
}

addListener()

const renderTotalPrice = () => {
  const totalPriceContainer = document.querySelector('.total-product-price')
  var CartProducts = JSON.parse(localStorage.getItem('CartProducts'))

  let preciototal = CartProducts.reduce((accumulator, product) => 
      accumulator + product.cantidad * product.precio
  ,0)

  totalPriceContainer.innerHTML = `Total: $${preciototal}`
}

renderTotalPrice()

const cleanCartListener = () => {
  const cleanCartContainer = document.querySelector('.btn-limpiar')
  const ProductCartContainer = document.querySelectorAll('.item-cart')
  
  cleanCartContainer.addEventListener('click', () => {
      ProductCartContainer.forEach(product => product.remove())
      localStorage.setItem('CartProducts', JSON.stringify([]))
      document.querySelector('.cart_products_total').innerHTML = 0
      renderProducts()
      renderTotalPrice()
      emptyCartMessage()
  })
}

cleanCartListener()

const emptyCartMessage = () => {
  const emptyCart = document.getElementById('empty-cart');
  var cartProducts = JSON.parse(localStorage.getItem('CartProducts'))

  if(cartProducts.length == 0){
      emptyCart.classList.remove('hidden')
  }else{
      emptyCart.classList.add('hidden')
  }
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

const checkouttListener = () => {
    const checkoutContainer = document.querySelector('.btn-finalizar')
    const ProductCartContainer = document.querySelectorAll('.item-cart')
    
    checkoutContainer.addEventListener('click', () => {
        console.log(checkoutContainer)
        console.log("click")
        ProductCartContainer.forEach(product => product.remove())
        localStorage.setItem('CartProducts', JSON.stringify([]))
        document.querySelector('.cart_products_total').innerHTML = 0
        window.open("./confirmation.html","Confirmation","")
        renderProducts()
        renderTotalPrice()
    })
  }
  
  checkouttListener()