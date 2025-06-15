import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Booking from './pages/Booking';
import Ticket from './pages/Ticket';
import Navbar from './components/Navbar';
import Shop from './pages/Shop';
import Cart from './components/Cart';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

const addToCart = (item) => {
  setCartItems((prev) => {
    const existingIndex = prev.findIndex(i => i.id === item.id);
    if (existingIndex !== -1) {
      const updated = [...prev];
      updated[existingIndex].quantity += 1;
      return updated;
    } else {
      return [...prev, { ...item, quantity: 1 }];
    }
  });
  setCartOpen(true);
};

const removeFromCart = (id) => {
  setCartItems((prev) => prev.filter(item => item.id !== id));
};

  return (
    <div className="app">
      <Navbar cartItems={cartItems} setCartOpen={setCartOpen} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/shop" element={<Shop addToCart={addToCart} />} />
      </Routes>

      {cartOpen && (
      <Cart
        cartItems={cartItems}
        setCartOpen={setCartOpen}
        removeFromCart={removeFromCart}
      />
    )}
    </div>
  );
}

export default App;
