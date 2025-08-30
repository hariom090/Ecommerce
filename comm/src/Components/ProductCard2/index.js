import React ,{useEffect,useState} from "react";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import "./style.css";
import { useNavigate } from "react-router-dom";


const ProductCard2 = ({ product, tag, onRate, onAddToCart }) => {
  // product: product object
  // tag: optional badge (e.g., "new", "sale")
  // onRate: function(productId, value)
  // onAddToCart: function(product)
    const navigate = useNavigate();
      const [rating, setRating] = useState(0);

  // ✅ Compute average rating from product.ratings array
 useEffect(() => {
         if (product?.ratings?.length > 0) {
             const avg =
                 product.ratings.reduce((acc, r) => acc + r.value, 0) / product.ratings.length;
             setRating(avg);
         }
     }, [product]);

  const handleViewDetails = (id) => {
    navigate(`/product/${id}`);
  };

  

  return (
    <div className="productthumb">
      {tag && <span className={`badge ${tag}`}>{tag}</span>}

      <div className="imgWrapper"  onClick={() => handleViewDetails(product._id)}>
        <img
          src={product.images?.[0]?.url || "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-100"
        />
      </div>

      <div className="info">
        <span className="d-block catName" onClick={() => handleViewDetails(product._id)}>{product.category || "General" }</span>

        <h4 className="title" onClick={() => handleViewDetails(product._id)}>{product.name}</h4>

        {/* ⭐ Clickable Rating */}
        <Rating
          name={`rating-${product._id}`}
          value={rating}
          precision={0.25}
           onChange={(event, newValue) => {
            if (newValue >= 1) {
              setRating(newValue);
              onRate(product._id, newValue);
            }
          }}
        />

        <div className="d-flex align-items-center">
  <div className="d-flex align-items-center">
    <span
      className="newPrice"
      onClick={() => handleViewDetails(product._id)}
    >
      ₹{product.newprice}
    </span>
    {product.price && (
      <span
        className="oldPrice"
        onClick={() => handleViewDetails(product._id)}
      >
        ₹{product.price}
      </span>
    )}
  </div>
</div>


        {/* 🛒 Add to cart */}
        <div className="CartButton">
          <Button
            className="addToCart"
            onClick={() => onAddToCart && onAddToCart(product)}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard2;
