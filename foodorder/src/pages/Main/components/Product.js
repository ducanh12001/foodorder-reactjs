import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Header from './Header';

const Product = () => {

  const itemPerPage = 20;
  const [DishList, setDishList] = useState([]);
  const [numCart, setNumCart] = useState(0);
  const [currentPage, setCurrentPage] = useState(1)

  const addToCart = (id) => {
    for (let j = 0; j < DishList.length; j++) {
      if (DishList[j].id === id) {
        numInCart(DishList[j])
        totalPrice(DishList[j])
        renderNumCart()
        showToast();
      }
    }
  }

  const goOrder = (id) => {
    for (let i = 0; i < DishList.length; i++) {
      if (DishList[i].id === id) {
        numInCart(DishList[i])
        totalPrice(DishList[i])
        renderNumCart()
      }
    }
  }

  const cards = DishList.filter((dish, index) => {
    let start = 0;
    let end = currentPage * itemPerPage;
    changePage(currentPage);
    if (index >= start && index < end) return true;
  }).map((dish) => {
    return (
      <div className="card" key={dish.id}>
        <div style={{ flex: 1 }}>
          <Link className="go-to-detail" to={{pathname: `/productDetail/dishId=${dish.id}`}}>
              <img className="dish-image" src={dish.imageS} alt={dish.name} />
          </Link>
        </div>
        <div style={{ flex: 2 }}>
          <Link className="go-to-detail" to={{pathname: `/productDetail/dishId=${dish.id}`}}>
            <div className="dish-name">{dish.name}</div>
          </Link>
        </div>
        <div className="data">
          <span className="price">{dish.price}đ</span>
          <span className="rate">{dish.rate}/5</span>
        </div>
        <p className="description">{dish.descriptionS}</p>
        <div className="btn-group">
          <button className="button cartBtn" onClick={() => addToCart(dish.id)}>Add to cart</button>
          <Link to="/pay" className="button orderBtn" onClick={() => goOrder(dish.id)}>Order Now</Link>
        </div>
      </div>
    )
  })

  function nextPage() {
    if (currentPage < DishList.length) {
      let a = currentPage + 1;
      setCurrentPage(a)
    }
  }

  function changePage(page) {
    var btn_next = document.getElementById("nextBtn");

    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();
    if (page === numPages()) {
      btn_next.style.visibility = "hidden";
    } else {
      btn_next.style.visibility = "visible";
    }
  }

  function numPages() {
    return Math.ceil(DishList.length / itemPerPage);
  }

  function showToast() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
  }

  function numInCart(dish) {
    let numCart = localStorage.getItem('numInCart');
    if (numCart) {
      numCart = parseFloat(numCart);
      localStorage.setItem('numInCart', numCart + 1);
    } else {
      localStorage.setItem('numInCart', 1)
    }
    setInCart(dish)
  }

  function setInCart(dish) {
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

  function totalPrice(dish) {
    let priceCart = localStorage.getItem('totalPrice');
    if (priceCart) {
      priceCart = parseFloat(priceCart);
      localStorage.setItem('totalPrice', priceCart + dish.price);
    } else {
      localStorage.setItem('totalPrice', dish.price);
    }
  }

  function renderNumCart() {
    let numCart = localStorage.getItem('numInCart');
    if (numCart) {
      setNumCart(numCart)
    }
  }

  const init = async () => {
    let res = await fetch(`https://62cfe5951cc14f8c087fabdf.mockapi.io/api/products`);
    let dishList = await res.json();
    setDishList(dishList);
    renderNumCart()
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div>
      <Header numCart={numCart} />
      <div className="content">
        <div className="title">
          Món ăn
        </div>
        <div className="dish-container">
          {cards}
        </div>
        <div className="pagination">
          <a onClick={nextPage} id="nextBtn">Load more &raquo;</a>
        </div>
      </div>
      <div id="snackbar">Thêm vào giỏ hàng thành công!</div>
    </div>
  )
}

export default Product