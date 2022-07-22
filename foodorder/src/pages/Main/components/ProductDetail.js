import React, { useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom";
import Header from './Header';

const ProductDetail = () => {

  const [CommentList, setCommentList] = useState([]);
  const [numCart, setNumCart] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const init = async () => {
    let res = await fetch(`https://62cfe5951cc14f8c087fabdf.mockapi.io/api/comment`);
    let commentList = await res.json();
    setCommentList(commentList)
    renderNumCart()
    //console.log(searchParams.get("dishId"))
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

  const details = []

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
      <div class="cart-container">
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