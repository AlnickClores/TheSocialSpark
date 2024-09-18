import React, { createContext, useState } from "react";

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basketItems, setBasketItems] = useState([]);

  const addToBasket = (item) => {
    setBasketItems((prevItems) => [...prevItems, item]);
  };

  return (
    <BasketContext.Provider
      value={{ basketItems, addToBasket, setBasketItems }}
    >
      {children}
    </BasketContext.Provider>
  );
};
