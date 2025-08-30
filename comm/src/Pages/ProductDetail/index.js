import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Slider from "react-slick";
import Zoom from "react-medium-image-zoom";
import 'react-medium-image-zoom/dist/styles.css';
import ProductCard2 from "../../Components/ProductCard2";
import "./style.css";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [isWishlist, setIsWishlist] = useState(false);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        if (product?.ratings?.length > 0) {
            const avg =
                product.ratings.reduce((acc, r) => acc + r.value, 0) / product.ratings.length;
            setRating(avg);
        }
    }, [product]);

    const handleRatingChange = async (event, newValue) => {
        const userId = localStorage.getItem("UserId");
        if (!userId) {
            alert("⚠️ Please login to rate");
            return;
        }
        if (!newValue || newValue < 1) return; // 👈 don’t send invalid rating
 
        setRating(newValue);

        await fetch(`http://localhost:5000/api/products/${product._id}/rating`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, value: newValue }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Rating updated:", data);
                setRating(data.avgRating); // update avg rating
            })
            .catch((err) => console.error("Error updating rating:", err));
    };



    // ✅ Fetch single product
    useEffect(() => {
        fetch(`http://localhost:5000/api/products/${id}`)
            .then((res) => res.json())
            .then((data) => setProduct(data))
            .catch((err) => console.error("Error fetching product:", err));
    }, [id]);

    // ✅ Fetch related products
    useEffect(() => {
        fetch("http://localhost:5000/api/products")
            .then((res) => res.json())
            .then((data) => {
                setRelatedProducts(data.filter((p) => p._id !== id).slice(0, 5));
            })
            .catch((err) => console.error("Error fetching related products:", err));
    }, [id]);

    // ✅ Check if product is already in wishlist when page loads
    useEffect(() => {
        const checkWishlist = async () => {
            const userId = localStorage.getItem("UserId");
            if (!userId || !product?._id) return;

            try {
                const response = await fetch(`http://localhost:5000/api/wishlist/${userId}`);
                if (!response.ok) throw new Error("Failed to fetch wishlist");

                const data = await response.json();

                // ✅ If product exists in wishlist → set heart red
                if (data?.products?.some((p) => p._id === product._id)) {
                    setIsWishlist(true);
                } else {
                    setIsWishlist(false);
                }
            } catch (error) {
                console.error("Error fetching wishlist:", error);
            }
        };

        checkWishlist();
    }, [product]);



    // ✅ Function to handle Add to Cart
    const handleAddToCart = async () => {
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

    // ✅ Function to handle Wishlist
    // ✅ Function to handle Wishlist with backend
    const handleWishlist = async () => {
        try {
            const userId = localStorage.getItem("UserId"); // Assuming you save userId at login
            if (!userId) {
                alert("⚠️ Please login to use wishlist");
                return;
            }

            const response = await fetch("http://localhost:5000/api/wishlist/toggle", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId,
                    productId: product._id,
                }),
            });

            if (!response.ok) throw new Error("Failed to update wishlist");

            const data = await response.json();

            // Toggle UI state
            setIsWishlist(data.wishlist.products.includes(product._id));

            alert(data.message);
            console.log("Wishlist Updated:", data);

        } catch (error) {
            console.error("Error updating wishlist:", error);
            alert("❌ Could not update wishlist. Try again.");
        }
    };



    if (!product) {
        return (
            <div className="container text-center py-5">
                <h2>Loading product...</h2>
                <Button variant="contained" color="primary" onClick={() => navigate("/listing")}>
                    Back to Listing
                </Button>
            </div>
        );
    }

    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    return (
        <section className="productDetail container">
            <div className="productBox">
                <div className="productLeft">
                    {/* Product Images */}
                    <div className="productImage">
                        <Slider {...sliderSettings}>
                            {product.images?.length > 0 ? (
                                product.images.map((img, index) => (
                                    <div key={index} className="slider-image">
                                        <Zoom>
                                            <img
                                                src={img.url || "https://via.placeholder.com/400"}
                                                alt={product.name}
                                            />
                                        </Zoom>
                                    </div>
                                ))
                            ) : (
                                <Zoom>
                                    <img
                                        src="https://via.placeholder.com/400"
                                        alt={product.name}
                                    />
                                </Zoom>
                            )}
                        </Slider>

                        {/* Wishlist Button */}
                        <div className="wishlistIcon" onClick={handleWishlist}>
                            {isWishlist ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="productInfo">
                        {product.tag && <span className={`badge ${product.tag}`}>{product.tags}</span>}
                        <h2>{product.name}</h2>
                        <p className="category">{product.category}</p>
                        <Rating
                            name="user-rating"
                            value={rating}
                            precision={0.25}
                            onChange={handleRatingChange}
                        />


                        <div className="prices">
                            <span className="newPrice">₹{product.newprice || product.price}</span>
                            {product.price && (
                                <span className="oldPrice">₹{product.price}</span>
                            )}
                        </div>

                        <p className="description">{product.description}</p>

                        <Button onClick={handleAddToCart} variant="contained" color="success" className="mt-3">
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <div className="relatedProductBox">
                <h3>Related Products</h3>
                <div className="relatedProducts row">
                    {relatedProducts.map((item) => (
                        <div key={item._id} className="col-md-4 col-sm-6 mb-4">
                            <ProductCard2  
                            
                             product={item}
                                                tag={item.tags}
                                                onRate={(event, newValue) =>
                                                  handleRatingChange(item._id, newValue)
                                                }
                                                onAddToCart={() => handleAddToCart(item)} // ✅ Pass product
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;
