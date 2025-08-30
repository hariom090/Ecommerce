import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import "./cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem("UserId");

  // ✅ Fetch cart items from backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/cart/${userId}`);
        const data = await res.json();

        // populate with product details if backend sends only IDs
        const formatted = data.products.map((item) => ({
          id: item.productId._id || item.productId, // support populated product
          title: item.productId.name || "Product",
          image: item.productId.images?.[0]?.url || "/placeholder.jpg",
          price: item.productId.newprice || item.productId.price || 0,
          quantity: item.quantity,
        }));

        setCartItems(formatted);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };

    if (userId) fetchCart();
  }, [userId]);

  const updateQuantity = async (id, change) => {
    try {
      await fetch("http://localhost:5000/api/cart/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId: id, change }),
      });

      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + change) }
            : item
        )
      );
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const removeItem = async (id) => {
    try {
      await fetch("http://localhost:5000/api/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId: id }),
      });

      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <section className="cart container">
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        <div className="cartItems">
          {cartItems.map((item) => (
            <div key={item.id} className="cartItem">
              <img src={item.image} alt={item.title} />
              <div className="cartDetails">
                <h4>{item.title}</h4>
                <p>Price: Rs. {item.price}</p>
                <div className="quantityControl">
                  <Button variant="outlined" onClick={() => updateQuantity(item.id, -1)}>-</Button>
                  <span>{item.quantity}</span>
                  <Button variant="outlined" onClick={() => updateQuantity(item.id, 1)}>+</Button>
                </div>
              </div>
              <div className="cartActions">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => removeItem(item.id)}
                >
                  <DeleteIcon />
                </Button>
              </div>
            </div>
          ))}

          <div className="cartSummary">
            <h4>Total: Rs. {totalPrice}</h4>
            <Button variant="contained" color="success">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </section>
  );
};

export default Cart;
