import React, { useEffect, useState } from 'react'
import '../../styles/style.css'
import '../../styles/toast.css'
import { Link } from "react-router-dom";
import Header from '../Header';

export default function Home() {

    const [TypeList, setTypeList] = useState([]);
    const [numCart, setNumCart] = useState(0);

    const init = async () => {
        let res = await fetch(`https://62cfe5951cc14f8c087fabdf.mockapi.io/api/type`);
        let typeList = await res.json();
        setTypeList(typeList)
        renderNumCart()
    }

    function renderNumCart() {
        let numCart = localStorage.getItem('numInCart');
        if (numCart) {
            setNumCart(numCart)
        }
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <div>
            <Header numCart={numCart}/>
            <div className="content">
                <div className="title">
                    Món ăn
                </div>
                <div className="card-container">
                    {
                        TypeList.map((type, index) => {
                            return (
                                <div className="card" key={type.id}>
                                    <Link to="/product">
                                        <img src={type.image} />
                                        <span>{type.name}</span>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}