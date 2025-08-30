import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";
import ProductCard2 from "../../Components/ProductCard2";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import "./style.css";

const Listing = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get("category");
  const tagParam = queryParams.get("tag");

  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [products, setProducts] = useState([]);
  const [sortType, setSortType] = useState("Featured");

  // ✅ Fetch products from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // ✅ Apply tag/category filtering
  let filteredProducts = [...products];
  if (tagParam) {
    filteredProducts = filteredProducts.filter(
      (product) => product.tag === tagParam
    );
  }
  if (categoryParam) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === categoryParam
    );
  }

  // ✅ Apply sorting
  if (sortType === "Price: Low to High") {
    filteredProducts.sort((a, b) => (a.newprice || a.price) - (b.newprice || b.price));
  } else if (sortType === "Price: High to Low") {
    filteredProducts.sort((a, b) => (b.newprice || b.price) - (a.newprice || a.price));
  }

  // ✅ Dynamic page title
  const pageTitle = categoryParam || tagParam || "Shop";

  return (
    <section className="listing">
      <div className="container-fluid">
        <div className="breadcrumb flex-column">
          <h1>{pageTitle}</h1>

          <ul className="list list-inline mb-0">
            <li className="list-inline-item"><Link to="/">Home</Link></li>
            <li className="list-inline-item"><Link to="/listing">Shop</Link></li>
            {categoryParam && (
              <li className="list-inline-item">
                <Link to={`/listing?category=${categoryParam}`}>{categoryParam}</Link>
              </li>
            )}
            {!categoryParam && tagParam && (
              <li className="list-inline-item">
                <Link to={`/listing?tag=${tagParam}`}>{tagParam}</Link>
              </li>
            )}
          </ul>
        </div>

        <div className="listingData">
          <div className="row">
            {/* Sidebar */}
            <div className="col-md-3 sideBarWrapper">
              <Sidebar />
            </div>

            {/* Product List */}
            <div className="col-md-9 right-content">
              <div className="topStrip d-flex align-items-center">
                <p className="mb-0">
                  We found <span className="text-success">{filteredProducts.length}</span> items for you!
                </p>

                {/* Sorting Dropdown */}
                <div className="ml-auto d-flex align-items-center">
                  <ClickAwayListener onClickAway={() => setIsOpenDropdown(false)}>
                    <div className="tab_">
                      <Button onClick={() => setIsOpenDropdown(!isOpenDropdown)}>
                        Sort by: {sortType}
                      </Button>
                      <ul className={`dropdownMenu ${isOpenDropdown ? "" : "hidden"}`}>
                        <li onClick={() => { setSortType("Featured"); setIsOpenDropdown(false); }}>Featured</li>
                        <li onClick={() => { setSortType("Price: Low to High"); setIsOpenDropdown(false); }}>Price: Low to High</li>
                        <li onClick={() => { setSortType("Price: High to Low"); setIsOpenDropdown(false); }}>Price: High to Low</li>
                      </ul>
                    </div>
                  </ClickAwayListener>
                </div>
              </div>

              {/* Products */}
              <div className="productList row">
                {filteredProducts.map((product) => (
                  <div className="col-md-3 col-sm-6 mb-4" key={product._id}>
                    <Link to={`/product/${product._id}`} className="product-link">
                      <ProductCard2 product={product} tag={product.tag} />
                    </Link>
                  </div>
                ))}
              </div>

              {/* No products */}
              {filteredProducts.length === 0 && (
                <div className="text-center mt-5">
                  <h4>No products found.</h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Listing;
