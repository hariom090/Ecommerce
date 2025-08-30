import React from "react";
import './style.css';
import BannerImg from "../../Assets/Img/banner.jpg";
import { useNavigate } from "react-router-dom";

const Banners = () => {
  const navigate = useNavigate();

  const bannerData = [
    { img: BannerImg, tag: "new" },
    { img: BannerImg, tag: "sale" },
    { img: BannerImg, tag: "hot" }
  ];

  return (
    <div className="bannersection">
      <div className="container-fluid">
        <div className="row">
          {bannerData.map((item, idx) => (
            <div className="col" key={idx}>
              <div
                className="box"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/listing?tag=${item.tag}`)}
              >
                <img src={item.img} alt={`Banner ${item.tag}`} className="w-100 transition" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banners;
