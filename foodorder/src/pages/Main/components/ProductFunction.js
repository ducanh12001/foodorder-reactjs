export function showToast() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

export function numInCart(dish) {
  let numCart = localStorage.getItem('numInCart');
  if (numCart) {
    numCart = parseFloat(numCart);
    localStorage.setItem('numInCart', numCart + 1);
  } else {
    localStorage.setItem('numInCart', 1)
  }
  setInCart(dish)
}

export function setInCart(dish) {
  let carts = localStorage.getItem('dishInCart');
  carts = JSON.parse(carts);
  if (carts !== null) {
    if (carts[dish.id] === undefined) {
      carts = {
        ...carts,
        [dish.id]: {
          id: dish.id,
          name: dish.name,
          image: dish.imageS,
          price: dish.price,
          quantity: 0
        }
      }
    }
    carts[dish.id].quantity += 1;
  } else {
    carts = {
      [dish.id]: {
        id: dish.id,
        name: dish.name,
        image: dish.imageS,
        price: dish.price,
        quantity: 1
      }
    };
  }
  localStorage.setItem('dishInCart', JSON.stringify(carts));
}

export function totalPrice(dish) {
  let priceCart = localStorage.getItem('totalPrice');
  if (priceCart) {
    priceCart = parseFloat(priceCart);
    localStorage.setItem('totalPrice', priceCart + dish.price);
  } else {
    localStorage.setItem('totalPrice', dish.price);
  }
}

