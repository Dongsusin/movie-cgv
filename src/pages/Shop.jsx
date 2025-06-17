import shopItems from "../data/shopData";
import "./Shop.css";

const Shop = ({ addToCart }) => {
  return (
    <div className="shop-container">
      <h1>상점</h1>
      <div className="shop-grid">
        {shopItems.map((item) => (
          <div
            key={item.id}
            className="shop-item"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="item-info">
              <h3>{item.name}</h3>
              <span>{item.price.toLocaleString()}원</span>
              <button className="info-button" onClick={() => addToCart(item)}>
                구매하기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
