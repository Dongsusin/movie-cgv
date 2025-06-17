import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar({ cartItems, setCartOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            영화 웹
          </Link>

          {/* 햄버거 아이콘 (모바일용) */}
          <div className="hamburger" onClick={toggleMenu}>
            ☰
          </div>

          {/* 데스크탑 내비게이션 */}
          <nav className="navbar-links">
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
              홈
            </Link>
            <Link
              to="/shop"
              className={location.pathname === "/shop" ? "active" : ""}
            >
              상점
            </Link>
            <Link
              to="/ticket"
              className={location.pathname === "/ticket" ? "active" : ""}
            >
              예매티켓
            </Link>
            <button className="cart-button" onClick={() => setCartOpen(true)}>
              장바구니/수량: {cartItems.length}
            </button>
          </nav>
        </div>
      </header>

      {/* 오버레이 */}
      {menuOpen && <div className="overlay" onClick={closeMenu}></div>}

      {/* 모바일 메뉴 */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <Link
          to="/"
          className={location.pathname === "/" ? "active" : ""}
          onClick={closeMenu}
        >
          홈
        </Link>
        <Link
          to="/shop"
          className={location.pathname === "/shop" ? "active" : ""}
          onClick={closeMenu}
        >
          상점
        </Link>
        <Link
          to="/ticket"
          className={location.pathname === "/ticket" ? "active" : ""}
          onClick={closeMenu}
        >
          예매티켓
        </Link>
        <button
          className="cart-button"
          onClick={() => {
            setCartOpen(true);
            closeMenu();
          }}
        >
          장바구니/수량: {cartItems.length}
        </button>
      </div>
    </>
  );
}

export default Navbar;
