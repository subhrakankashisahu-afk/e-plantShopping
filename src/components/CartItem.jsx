import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "../redux/CartSlice";
import { Link } from "react-router-dom";

const CartItem = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const increaseQty = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const decreaseQty = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/plants">Plants</Link> |{" "}
        <Link to="/cart">Cart</Link>
      </nav>

      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #ccc",
                padding: "10px 0",
              }}
            >
              <img src={item.image} alt={item.name} width="80" />
              <div style={{ marginLeft: "20px", flex: 1 }}>
                <h4>{item.name}</h4>
                <p>Unit Price: ${item.price}</p>
                <p>Total: ${item.price * item.quantity}</p>
                <div>
                  <button onClick={() => decreaseQty(item)}>-</button>
                  <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                  <button onClick={() => increaseQty(item)}>+</button>
                </div>
              </div>
              <button onClick={() => dispatch(removeItem(item.id))}>
                Delete
              </button>
            </div>
          ))}

          <h2>Total Cart Amount: ${totalAmount}</h2>

          <button onClick={() => alert("Checkout Coming Soon")}>
            Checkout
          </button>

          <br /><br />

          <Link to="/plants">
            <button>Continue Shopping</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartItem;
