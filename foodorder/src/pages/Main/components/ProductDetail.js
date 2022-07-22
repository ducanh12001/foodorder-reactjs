import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import Header from './Header';
import { showToast, numInCart, totalPrice } from './ProductFunction';

const ProductDetail = (props) => {

  const [DishList, setDishList] = useState([]);
  const [CommentList, setCommentList] = useState([]);
  const [numCart, setNumCart] = useState(0);
  const [dish, setDish] = useState();
  const { dishId } = useParams();

  const init = async () => {
    let res = await fetch(`https://62cfe5951cc14f8c087fabdf.mockapi.io/api/comment`);
    let commentList = await res.json();
    let res1 = await fetch(`https://62cfe5951cc14f8c087fabdf.mockapi.io/api/products`);
    let dishList = await res1.json();
    setDishList(dishList);
    getDish(dishList);
    setCommentList(commentList)
    renderNumCart()
  }

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

  const getDish = (DishList) => {
    let dishId1 = dishId;
    dishId1 = parseFloat(dishId);
    if (dishId1) {
      setDish(DishList[dishId1 - 1])
    }
  }

  const comments = CommentList.map((comment, index) => {
    return (
      <div className="comment-card" key={comment.id}>
        <div className="user-info">
          <img src={comment.image} alt="Image" className="user-image" />
          <span>{comment.username}</span>
        </div>
        <div className="comment">{comment.comment}</div>
      </div>
    )
  })

  function renderNumCart() {
    let numCart = localStorage.getItem('numInCart');
    if (numCart) {
      setNumCart(numCart)
    }
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div>
      <Header numCart={numCart} />
      <div className="cart-container">
        {dish &&
          <>
            <div className="dish-image">
              <img src={dish.imageB} alt={dish.name} />
            </div>
            <div className="dish-info">
              <h3 className="name-dish">{dish.name}</h3>
              <div className="address">{dish.address}</div>
              <div className="rating">
                <div className="point">{dish.rate}/5</div>
                <div className="number-rating">10</div>
              </div>
              <div className="price">
                <i className="fa-solid fa-dollar-sign"></i>
                {dish.price}đ
              </div>
              <div className="btn-group">
                <button type="button" className="button cartBtn" onClick={() => addToCart(dish.id)}>Add to cart</button>
                <Link to="/pay" className="button orderBtn" onClick={() => goOrder(dish.id)}>Order Now</Link>
              </div>
            </div>
          </>
        }
      </div>
      <div id="snackbar">Thêm vào giỏ hàng thành công!</div>
      <div className="container2">
        <h4>Comments</h4>
        <div className="comment-container">
          {comments}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail