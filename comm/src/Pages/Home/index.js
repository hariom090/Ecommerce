import React from "react";
import ProductGrid from "../../Components/ProductGrid/index.js";

import Banners from "../../Components/Banners/index.js";
import CatSlider from "../../Components/CatSlider/index.js";
import ProductGrid2 from "../../Components/ProductGrid2/index.js";

const Home = () => {
    return (
        <>
       
        <CatSlider/>
        <ProductGrid/>
        <Banners/>
        <ProductGrid2/>
     
        </>
    )
}

export default Home;