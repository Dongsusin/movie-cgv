import React from "react";
import "./Cart.css";

function Cart({ cartItems, setCartOpen, removeFromCart }) {
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-overlay" onClick={() => setCartOpen(false)}>
      <div className="cart" onClick={(e) => e.stopPropagation()}>
        <h2>장바구니</h2>
        {cartItems.length === 0 ? (
          <p>장바구니가 비어 있습니다.</p>
        ) : (
          <>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item">
                  <span>
                    {item.name} - {item.price.toLocaleString()}원 × {item.quantity}
                  </span>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    제거
                  </button>
                </li>
              ))}
            </ul>
            <p>
              <strong>총합: {totalPrice.toLocaleString()}원</strong>
            </p>
          </>
        )}
        <button onClick={() => setCartOpen(false)}>닫기</button>
      </div>
    </div>
  );
}

export default Cart;

