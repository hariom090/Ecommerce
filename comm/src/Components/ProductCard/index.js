// ProductCard.js
import React from "react";
import "./style.css";
import Button from "@mui/material/Button";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <a href={product.url} className="product-image-link">
        <div className="image-wrapper">
          <img
            src={product.imagePrimary}
            alt={product.title}
            className="primary-image"
          />
          <img
            src={product.imageSecondary}
            alt={`${product.title} alt`}
            className="secondary-image"
          />
        </div>
      </a>

      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <div className="product-price">
          <span className="original-price">Rs. {product.originalPrice}</span>
          <span className="sale-price">Rs. {product.price}</span>
        </div>
        <Button
          className="add-to-cart"
          onClick={() => console.log("Add to cart:", product.id)}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
