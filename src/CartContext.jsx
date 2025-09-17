import React, { createContext, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

export const CartContext = createContext();

export function CartProvider  ({ children }) {
    const [items, setItems] = useState([]);

    function addToCart(item) {
        setItems(prev => [...prev, item]);
        toast.success("Added to cart!");
        console.log(`Added to cart.`);
    }

    function removeFromCart(itemId) {
        setItems(items => items.filter(item => item.id !== itemId));
    }


    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};