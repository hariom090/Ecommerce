import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import "./wishlist.css";

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const userId = localStorage.getItem("UserId"); // stored at login

  // ✅ Fetch wishlist on page load
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/wishlist/${userId}`);
        const data = await res.json();
        setWishlistItems(data.products || []);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
    if (userId) fetchWishlist();
  }, [userId]);

  // ✅ Remove item from wishlist
  const removeItem = async (productId) => {
    try {
      const res = await fetch("http://localhost:5000/api/wishlist/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
      });
      const data = await res.json();
      setWishlistItems(data.wishlist.products || []);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // ✅ Move item from wishlist → cart
  const moveToCart = async (productId) => {
    try {
      await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId, quantity: 1 }),
      });
      removeItem(productId); // no await needed
    } catch (error) {
      console.error("Error moving item to cart:", error);
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <section className="wishlist container">
      <h2>Your Wishlist</h2>
      {wishlistItems.length > 0 ? (
        <div className="wishlistItems">
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="wishlistItem"
              onClick={() => handleViewDetails(item._id)}
            >
              <img
                src={item.images?.[0]?.url || "/placeholder.png"}
                alt={item.name || "Product"}
              />
              <div className="wishlistDetails">
                <h4>{item.name || "No Title"}</h4>
                <div className="price-container">
                  {item.price && <p className="old-price">Rs. {item.price}</p>}
                  <p className="new-price">Rs. {item.newprice || item.price || 0}</p>
                </div>
              </div>

              <div className="wishlistActions">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item._id);
                  }}
                >
                  <DeleteIcon />
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={(e) => {
                    e.stopPropagation();
                    moveToCart(item._id);
                  }}
                >
                  Move to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </section>
  );
};

export default Wishlist;
