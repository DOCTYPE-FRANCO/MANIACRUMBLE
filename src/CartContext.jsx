import React, { createContext, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

export const CartContext = createContext();

export function CartProvider  ({ children }) {
    const [items, setItems] = useState([]);


    function addToCart(item) {
        setItems(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { ...item, quantity: 1 }];         
        });
        toast.success("Added to cart!");
        console.log(`Added to cart.`);
    };

    function removeFromCart(itemId) {
        setItems(items => items.filter(item => item.id !== itemId));
    }

    function increment(id){
        setItems(items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
    };

    function decrement (id) {
        setItems(items.map(item => 
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ));
    };


    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, increment, decrement }}>
            {children}
        </CartContext.Provider>
    );
};