import React, { useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

import './style.css';

const CatSlider = () => {
  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 6 } },
      { breakpoint: 768, settings: { slidesToShow: 4 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  // ✅ Jewelry-themed elegant colors
  const [itemBg] = useState([
    "#F8F3E7", // light cream
    "#D4AF37", // gold
    "#C0C0C0", // silver
    "#B76E79", // rose gold
    "#8B6F4E", // bronze
    "#E6D3B3", // champagne
    "#A67B5B", // antique gold
    "#2C2C2C", // deep charcoal
    "#EEE5D0", // ivory
    "#6E4B3A"  // dark coffee brown
  ]);

  const categories = [
    { title: "Kada", img: "https://d1311wbk6unapo.cloudfront.net/NushopCatalogue/tr:f-webp,w-600,fo-auto/62136e41bad7417a5d621432/cat_img/M41St8n__UQMPRANHCQ_2024-09-21_1.jpg" },
    { title: "Earrings", img: "https://th.bing.com/th/id/OIP.9tkHvIqMZsEUtUqedCQoXwHaHa?pid=ImgDet&rs=1" },
    { title: "Rings", img: "https://images.unsplash.com/photo-1616627787232-e66d15f1a5fd?auto=format&fit=crop&w=500&q=60" },
    { title: "Bracelets", img: "https://images.unsplash.com/photo-1612392061783-cf5cc777a4ee?auto=format&fit=crop&w=500&q=60" },
    { title: "Necklaces", img: "https://images.unsplash.com/photo-1612392062074-e2b90b0b34d0?auto=format&fit=crop&w=500&q=60" },
    { title: "Anklets", img: "https://images.unsplash.com/photo-1616627787273-0a5deee0f0ea?auto=format&fit=crop&w=500&q=60" },
    { title: "Mangalsutra", img: "https://images.unsplash.com/photo-1616627787333-e1871fbe5a97?auto=format&fit=crop&w=500&q=60" },
    { title: "Bangles", img: "https://images.unsplash.com/photo-1612392062065-03830d4aa31c?auto=format&fit=crop&w=500&q=60" },
    { title: "Chains", img: "https://images.unsplash.com/photo-1616627787288-dc52cfa5f6a2?auto=format&fit=crop&w=500&q=60" },
    { title: "Pendants", img: "https://images.unsplash.com/photo-1612392062070-8c64dfaad913?auto=format&fit=crop&w=500&q=60" },
  ];

  return (
    <div className="catSliderSection">
      <div className="container-fluid">
        <h2 className="hd">Featured Categories</h2>
        <Slider {...settings} className="cat_slider_main">
          {categories.map((category, index) => (
            <div className="item" key={index}>
              <div
                className="info"
                style={{
                  backgroundColor: itemBg[index % itemBg.length],
                  cursor: "pointer"
                }}
                onClick={() => navigate(`/listing?category=${category.title}`)}
              >
                <img src={category.img} alt={category.title} />
                <h4>{category.title}</h4>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CatSlider;
