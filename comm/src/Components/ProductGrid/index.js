// ProductGrid.js
import React from "react";
import ProductCard from "../ProductCard/index.js";
import "./style.css";

const ProductGrid = () => {
  const products = [
    {
      id: "1",
      title: "Aqua Blue Sunglasses",
      handle: "aqua-blue",
      price: 599,
      originalPrice: 899,
      imagePrimary: "//salty.co.in/cdn/shop/files/SG0034-BU-GY_20_2.jpg?v=1751902329",
      imageSecondary: "//salty.co.in/cdn/shop/files/SG0034-BU-GY_20_3.jpg?v=1751902329",
      url: "#",
    },
    {
      id: "2",
      title: "Pink Mirror Glasses",
      handle: "pink-mirror",
      price: 799,
      originalPrice: 999,
      imagePrimary: "//salty.co.in/cdn/shop/files/SG0034-BU-GY_20_2.jpg?v=1751902329",
      imageSecondary: "//salty.co.in/cdn/shop/files/SG0034-BU-GY_20_3.jpg?v=1751902329",
      url: "#",
    },
    {
      id: "3",
      title: "Black Night Vision",
      handle: "black-night",
      price: 699,
      originalPrice: 899,
      imagePrimary: "//salty.co.in/cdn/shop/files/SG0034-BU-GY_20_2.jpg?v=1751902329",
      imageSecondary: "//salty.co.in/cdn/shop/files/SG0034-BU-GY_20_3.jpg?v=1751902329",
      url: "#",
    },
    {
       id: "13",
    title: "Classic Analog Watch",
    price: 999,
    originalPrice: 1499,
    imagePrimary: "https://via.placeholder.com/300x300?text=Watch+1",
    imageSecondary: "https://via.placeholder.com/300x300?text=Watch+1B",
    url: "#",
    },
      {
       id: "14",
    title: "Classic Analog Watch",
    price: 999,
    originalPrice: 1499,
    imagePrimary: "https://via.placeholder.com/300x300?text=Watch+1",
    imageSecondary: "https://via.placeholder.com/300x300?text=Watch+1B",
    url: "#",
    },
  ];

  return (
  <>
    <div className="boxtitle">
      <h2>Popular Products</h2>
    </div>
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
    </>
  );
};

export default ProductGrid;
