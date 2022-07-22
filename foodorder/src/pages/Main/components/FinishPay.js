import React, { useEffect, useState } from 'react'
import Header from './Header';

const FinishPay = () => {

    const [numCart, setNumCart] = useState(0);

    function renderNumCart() {
        let numCart = localStorage.getItem('numInCart');
        if (numCart) {
          setNumCart(numCart)
        }
      }

      useEffect(() => {
        renderNumCart()
      }, []);

  return (
    <div>
        <Header numCart={numCart} />
        <div className="paysuccess-message">
            <p>Thanh toán thành công!</p>
        </div>
    </div>
  )
}

export default FinishPay
