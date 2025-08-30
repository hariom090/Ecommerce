import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard2 from "../ProductCard2";
import "./style.css";

const ProductGrid2 = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // ✅ Fetch products from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []); 

  // ⭐ Handle rating update (per product)
 const handleRatingChange = async (productId, newValue) => {
    const userId = localStorage.getItem("UserId");
    if (!userId) {
      alert("⚠️ Please login to rate");
      return;
    }
    if (!newValue || newValue < 1) return; // 👈 prevent invalid rating

    try {
      const res = await fetch(`http://localhost:5000/api/products/${productId}/rating`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, value: newValue }),
      });

      const data = await res.json();
      console.log("Rating updated:", data);

      // ✅ Update state with new avg rating
      setProducts((prev) =>
        prev.map((p) =>
          p._id === productId ? { ...p, rating: data.avgRating } : p
        )
      );
    } catch (err) {
      console.error("Error updating rating:", err);
    }
  };

  // ✅ Function to handle Add to Cart
  const handleAddToCart = async (product) => {
    try {
      const userId = localStorage.getItem("UserId");
      if (!userId) {
        alert("⚠️ Please login first to add items to your cart.");
        navigate("/login");
        return;
      }
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          productId: product._id,
          quantity: 1,
        }),
      });

      if (!response.ok) throw new Error("Failed to add to cart");

      const data = await response.json();
      alert("✅ Product added to cart!");
      console.log("Cart Response:", data);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("❌ Could not add product to cart. Try again.");
    }
  };

  return (
    <section className="homeProduct">
      <div className="boxtitle">
        <h2>Top Picks</h2>
      </div>
      <div className="container-fluid">
        <div className="productrow">
          {products.length > 0 ? (
            products.map((product) => (
              <div className="item" key={product._id}>
                <div className="product-link" style={{ cursor: "pointer" }}>
                  <ProductCard2
                    product={product}
                    tag={product.tags}
                    onRate={(event, newValue) =>
                      handleRatingChange(product._id, newValue)
                    }
                    onAddToCart={() => handleAddToCart(product)} // ✅ Pass product
                  />
                </div>
              </div>
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </div>
      </div>
    </section>
  );
};
//export {handleRatingChange};
export default ProductGrid2;
