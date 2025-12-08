import React, { createContext, useState, useMemo } from "react";
import { Toaster, toast } from "react-hot-toast";

export const CartContext = createContext();

export function CartProvider  ({ children }) {
    const [items, setItems] = useState([]);
    const [number , setNumber] = useState(0);
    const [isEmpty, setIsEmpty] =  useState(true);

    const total = useMemo(
        () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        [items]
    );


    function addToCart(item) {
        setItems(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            setNumber(number + 1)
            return [...prev, { ...item, quantity: 1 }];         
        });
        setIsEmpty(false);
        toast.success("Added to cart!");
        console.log(`Added to cart.`);
    };

    function removeFromCart(itemId) {
        setItems(items => items.filter(item => item.id !== itemId));
        setNumber(number - 1);
    }

    function increment(id){
        setItems(items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
        setNumber(number + 1);
    };

    function decrement (id) {
        setItems(items.map(item => 
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ));
        setNumber(number - 1);
    };


    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, increment, decrement, number, isEmpty, total}}>
            {children}
        </CartContext.Provider>
    );
};