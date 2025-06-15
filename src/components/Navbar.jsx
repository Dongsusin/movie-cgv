import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ cartItems, setCartOpen }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">영화 웹</Link>
        <nav>
          <Link to="/">홈</Link>
          <Link to="/shop">상점</Link>
          <Link to="/ticket">예매티켓</Link>
          <button className="cart-button" onClick={() => setCartOpen(true)}>
          장바구니/수량:  {cartItems.length}
        </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;