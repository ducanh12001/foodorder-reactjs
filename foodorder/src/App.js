import './App.css';
import React from 'react';
import Home from './pages/Main/components/HomeComponent/Home'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Product from '../src/pages/Main/components/Product'
import CartUI from './pages/Main/components/CartUI';
import PayUI from './pages/Main/components/PayUI';
import FinishPay from './pages/Main/components/FinishPay';
import ProductDetail from './pages/Main/components/ProductDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/productDetail/:dishId" element={<ProductDetail />} />
        <Route path="/cart" element={<CartUI />} />
        <Route path="/pay" element={<PayUI />} />
        <Route path="/finish" element={<FinishPay />} />
      </Routes>
    </Router>
  );
}

export default App;
