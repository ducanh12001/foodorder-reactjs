import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const PayUI = () => {
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
    renderAddress()
    renderNumCart()
  }

  const dishes = Object.values(cartList).map(dish => {
    return (
      <tr key={dish.id}>
        <td><img src={dish.image} /></td>
        <td style={{ textAlign: "left" }}>{dish.name}</td>
        <td>{dish.price}đ</td>
        <td>{dish.quantity}</td>
        <td style={{ textAlign: "right" }}>{dish.quantity * dish.price}đ</td>
      </tr>
    )
  })

  async function renderAddress() {
    renderCity();
    let citySelect = document.querySelector('#city');
    citySelect?.addEventListener('change', () => {
      if (citySelect.value) {
        renderQuan(citySelect.value);
      }
    })

    let quanSelect = document.querySelector('#quan');
    quanSelect?.addEventListener('change', () => {
      if (quanSelect.value) {
        renderPhuong(quanSelect.value)
      }
    })
  }

  async function renderCity() {
    let citySelect = document.querySelector('#city');
    let res = await fetch(`https://provinces.open-api.vn/api/p/`);
    let CityList = await res.json();
    if (CityList !== null) {
      let result = `<option selected="selected" value="">Chọn thành phố--</option>`;
      CityList.forEach((city) => {
        result += `
            <option value="${city.code}">${city.name}</option>
            `
      })
      citySelect.innerHTML = result;
    }
  }

  async function renderQuan(cityId) {
    let quanSelect = document.querySelector('#quan');
    let res = await fetch(`https://provinces.open-api.vn/api/d/`);
    let QuanList = await res.json();
    let result = `<option selected="selected" value="">Chọn quận(huyện)--</option>`;
    QuanList.forEach((quan) => {
      if (quan.province_code == cityId) {
        result += `
            <option value="${quan.code}">${quan.name}</option>
            `
      }
    })
    quanSelect.innerHTML = result;
  }

  async function renderPhuong(phuongId) {
    let phuongSelect = document.querySelector('#phuong');
    let res = await fetch(`https://provinces.open-api.vn/api/w/`);
    let PhuongList = await res.json();
    let result = `<option selected="selected" value="">Chọn phường(xã)--</option>`;
    PhuongList.forEach((phuong) => {
      if (phuong.district_code == phuongId) {
        result += `
            <option value="${phuong.code}">${phuong.name}</option>
            `
      }
    })
    phuongSelect.innerHTML = result;
  }

  function renderNumCart() {
    let numCart = localStorage.getItem('numInCart');
    if (numCart) {
      setNumCart(numCart)
    }
  }

  function doPay(e) {
    e.preventDefault();
    navigate('/finish')
    localStorage.clear()
  }

  function cancelPay() {
    navigate('/')
    localStorage.clear()
  }

  useEffect(() => {
    renderCart()
  }, []);
  return (
    <div>
      <Header numCart={numCart} />
      <div className="shopping-cart">
        <div className="title">Thanh toán</div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th></th>
                <th style={{ textAlign: "left" }}>Tên món</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th style={{ textAlign: "right" }}>Tổng tiền</th>
              </tr>
            </thead>
            <tbody id="pay-list">
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
      </div>
      <div className="ship-container">
        <div className="title">Thông tin giao hàng</div>
        <form id="shipForm" action="" onSubmit={doPay}>
          <div className="input-div">
            <label htmlFor="imageB">Thành phố</label>
            <select id="city" name="city" required>
            </select>
          </div>
          <div className="input-div">
            <label htmlFor="imageS">Quận (Huyện)</label>
            <select id="quan" name="quan" required>
            </select>
          </div>
          <div className="input-div">
            <label htmlFor="name">Phường (Xã)</label>
            <select id="phuong" name="phuong" required>
            </select>
          </div>
          <div className="input-div">
            <label htmlFor="address">Địa chỉ giao hàng</label>
            <input type="text" id="address" name="address" className="input" required />
          </div>
          <div className="input-div btn-div">
            <input type="button" id="cancelBtn" value="Hủy" className="btn cancelBtn" onClick={cancelPay} />
            <input type="submit" id="payBtn" value="Thanh toán" className="btn payBtn" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default PayUI