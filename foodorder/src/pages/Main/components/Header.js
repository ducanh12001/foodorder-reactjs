import React from 'react'
import {Link} from "react-router-dom";

export default function Header(props) {


  return (
    <header>
        <div className="left_area"> 
            <Link to="/">FoodOrder</Link>
        </div>
        <div className="right_area">
            <div className="item">
                <Link className="basketIcon" to="/cart">
                    <i className="fa-solid fa-basket-shopping"></i>
                    <div className="dish-num">
                        <span className="num">{props.numCart}</span>
                    </div>
                </Link>
            </div>
        </div>
    </header>
  )
}
