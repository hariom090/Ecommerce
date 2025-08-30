import React, { createContext, useState } from "react";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  return (
    <StoreContext.Provider value={{ cart, setCart, wishlist, setWishlist }}>
      {children}
    </StoreContext.Provider>
  );
};
