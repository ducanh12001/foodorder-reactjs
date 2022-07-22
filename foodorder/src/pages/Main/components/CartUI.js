import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const CartUI = () => {
  const navigate = useNavigate();

  const [cartList, setCartList] = useState([]);
  const [numCart, setNumCart] = useState(0);
  const [priceCart, setPriceCart] = useState();

  function renderCart() {
    let list = localStorage.getItem('dishInCart');
    list = JSON.parse(list);
    setCartList(list);
    let priceCart = localStorage.getItem('totalPrice');
    setPriceCart(priceCart);
    renderNumCart()
  }

  const minusDish = (id) => {
    let totalPrice = localStorage.getItem('totalPrice');
    totalPrice = parseFloat(totalPrice);
    let numInCart = localStorage.getItem('numInCart');
    numInCart = parseFloat(numInCart);
    Object.values(cartList).map(dish => {
      if (dish.id === id && cartList[dish.id].quantity > 0) {
        cartList[dish.id].quantity -= 1;
        localStorage.setItem('dishInCart', JSON.stringify(cartList));
        numInCart = numInCart - 1;
        localStorage.setItem('numInCart', numInCart);
        totalPrice = totalPrice - cartList[dish.id].price;
        localStorage.setItem('totalPrice', totalPrice);
        if (cartList[dish.id].quantity === 0) {
          delete cartList[dish.id];
        }
        localStorage.setItem('dishInCart', JSON.stringify(cartList));
      }
    })
    renderCart()
  }

  const plusDish = (id) => {
    let totalPrice = localStorage.getItem('totalPrice');
    totalPrice = parseFloat(totalPrice);
    let numInCart = localStorage.getItem('numInCart');
    numInCart = parseFloat(numInCart);
    Object.values(cartList).map(dish => {
      if (dish.id === id) {
        cartList[dish.id].quantity += 1;
        localStorage.setItem('dishInCart', JSON.stringify(cartList));
        numInCart = numInCart + 1;
        localStorage.setItem('numInCart', numInCart);
        totalPrice = totalPrice + cartList[dish.id].price;
        localStorage.setItem('totalPrice', totalPrice);
      }
    })
    renderCart();
  }

  const removeDish = (id) => {
    let totalPrice = localStorage.getItem('totalPrice');
    totalPrice = parseFloat(totalPrice);
    let numInCart = localStorage.getItem('numInCart');
    numInCart = parseFloat(numInCart);
    Object.values(cartList).map(dish => {
      if (dish.id === id) {
        numInCart = numInCart - dish.quantity;
        localStorage.setItem('numInCart', numInCart);
        totalPrice = totalPrice - cartList[dish.id].price * cartList[dish.id].quantity;
        localStorage.setItem('totalPrice', totalPrice);
        delete cartList[dish.id];
        localStorage.setItem('dishInCart', JSON.stringify(cartList));
      }
    })
    renderCart()
  }

  const dishes = Object.values(cartList).map(dish => {
    return (
      <tr key={dish.id}>
        <td><img src={dish.image} /></td>
        <td style={{ textAlign: "left" }}>{dish.name}</td>
        <td>{dish.price}đ</td>
        <td>
          <div className="item-button">
            <button type="button" value={dish.id} className="minusBtn" onClick={() => minusDish(dish.id)}>-</button>
            <span className="item-num">{dish.quantity}</span>
            <button type="button" value={dish.id} className="plusBtn" onClick={() => plusDish(dish.id)}>+</button>
          </div>
        </td>
        <td style={{ textAlign: "right" }}>{dish.quantity * dish.price}đ</td>
        <td>
          <button type="button" value={dish.id} className="trash-icon">
            <i className="fa-solid fa-trash-can" onClick={() => removeDish(dish.id)}></i>
          </button>
        </td>
      </tr>
    )
  })

  function renderNumCart() {
    let numCart = localStorage.getItem('numInCart');
    if (numCart) {
      setNumCart(numCart)
    }
  }

  function goToPay() {
    if (cartList && Object.values(cartList).length !== 0) {
        navigate('/pay')
    } else {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }
  }

  useEffect(() => {
    renderCart();
  }, []);

  return (
    <div>
      <Header numCart={numCart} />
      <div id="snackbar" className="error">Bạn chưa có sản phẩm nào.</div>
      <div className="shopping-cart">
        <div className="title">Giỏ hàng</div>
        <span className="nodish-message"></span>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th></th>
                <td style={{ textAlign: "left" }}>Tên món</td>
                <td>Đơn giá</td>
                <td>Số lượng</td>
                <td style={{ textAlign: "right" }}>Tổng</td>
                <td>Xóa</td>
              </tr>
            </thead>
            <tbody id="cart-list">
              {dishes}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td style={{ fontWeight: "bold" }}>Tổng tiền:</td>
                <td style={{ textAlign: "right" }} id="totalPrice">{priceCart}đ</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="btn-container">
          <button type="button" className="payBtn" onClick={goToPay}>Thanh toán</button>
        </div>
      </div>
    </div>
  )
}

export default CartUI