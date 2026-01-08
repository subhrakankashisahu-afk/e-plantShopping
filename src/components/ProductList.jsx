import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/CartSlice";
import { Link } from "react-router-dom";

const productsData = [
  {
    category: "Indoor Plants",
    items: [
      { id: 1, name: "Snake Plant", price: 15, image: "https://via.placeholder.com/100" },
      { id: 2, name: "Peace Lily", price: 18, image: "https://via.placeholder.com/100" },
      { id: 3, name: "Spider Plant", price: 12, image: "https://via.placeholder.com/100" },
      { id: 4, name: "Aloe Vera", price: 10, image: "https://via.placeholder.com/100" },
      { id: 5, name: "Rubber Plant", price: 20, image: "https://via.placeholder.com/100" },
      { id: 6, name: "ZZ Plant", price: 22, image: "https://via.placeholder.com/100" },
    ],
  },
  {
    category: "Outdoor Plants",
    items: [
      { id: 7, name: "Rose", price: 25, image: "https://via.placeholder.com/100" },
      { id: 8, name: "Hibiscus", price: 18, image: "https://via.placeholder.com/100" },
      { id: 9, name: "Jasmine", price: 20, image: "https://via.placeholder.com/100" },
      { id: 10, name: "Tulsi", price: 8, image: "https://via.placeholder.com/100" },
      { id: 11, name: "Bougainvillea", price: 30, image: "https://via.placeholder.com/100" },
      { id: 12, name: "Sunflower", price: 14, image: "https://via.placeholder.com/100" },
    ],
  },
  {
    category: "Succulents",
    items: [
      { id: 13, name: "Echeveria", price: 12, image: "https://via.placeholder.com/100" },
      { id: 14, name: "Haworthia", price: 14, image: "https://via.placeholder.com/100" },
      { id: 15, name: "Jade Plant", price: 16, image: "https://via.placeholder.com/100" },
      { id: 16, name: "Cactus", price: 10, image: "https://via.placeholder.com/100" },
      { id: 17, name: "Sedum", price: 11, image: "https://via.placeholder.com/100" },
      { id: 18, name: "Crassula", price: 13, image: "https://via.placeholder.com/100" },
    ],
  },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [disabledButtons, setDisabledButtons] = useState({});

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    setDisabledButtons((prev) => ({ ...prev, [product.id]: true }));
  };

  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/plants">Plants</Link> |{" "}
        <Link to="/cart">Cart ({cartItems.length})
        </Link>
      </nav>

      <h1>Our Plants</h1>

      {productsData.map((category) => (
        <div key={category.category}>
          <h2>{category.category}</h2>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {category.items.map((plant) => (
              <div key={plant.id} style={{ margin: "10px", border: "1px solid #ccc", padding: "10px" }}>
                <img src={plant.image} alt={plant.name} />
                <h4>{plant.name}</h4>
                <p>Price: ${plant.price}</p>
                <button
                  onClick={() => handleAddToCart(plant)}
                  disabled={disabledButtons[plant.id]}
                >
                  {disabledButtons[plant.id] ? "Added" : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
