import React from "react";
import { Link } from "react-router-dom";
import './style.css';


const PageNotFound = () => {
    return (
        <section className="notFound">
            <div className="container text-center">
                <h1 className="notFoundTitle">404</h1>
                <h2 className="notFoundSubtitle">Oops! Page Not Found</h2>
                <p className="notFoundText">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link to="/" className="backHomeBtn">
                    Go Back Home
                </Link>
            </div>
        </section>
    );
};

export default PageNotFound;
