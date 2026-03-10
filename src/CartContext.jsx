import React, { createContext, useState, useMemo, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { updateProductQuantity } from "./database";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('maniacrumble_cart');
        if (savedCart) {
            setItems(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage whenever items change
    useEffect(() => {
        localStorage.setItem('maniacrumble_cart', JSON.stringify(items));
    }, [items]);

    const total = useMemo(
        () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        [items]
    );

    const number = useMemo(
        () => items.reduce((sum, i) => sum + i.quantity, 0),
        [items]
    );

    const isEmpty = items.length === 0;

    function addToCart(item) {
        setItems(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { ...item, quantity: 1 }];
        });
        toast.success("Added to cart!");
    }

    function removeFromCart(itemId) {
        setItems(items => items.filter(item => item.id !== itemId));
        toast.success("Removed from cart!");
    }

    function increment(id) {
        setItems(items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
    }

    function decrement(id) {
        setItems(items.map(item => 
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ));
    }

    function updateQuantity(id, quantity) {
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }
        setItems(items.map(item => item.id === id ? { ...item, quantity } : item));
    }

    function clearCart() {
        setItems([]);
        localStorage.removeItem('maniacrumble_cart');
    }

    async function processOrder(orderData) {
        setLoading(true);
        try {
            // Update product quantities in database
            for (const item of items) {
                const newQuantity = Math.max(0, item.quantity - item.quantity);
                await updateProductQuantity(item.id, newQuantity);
            }
            
            clearCart();
            toast.success("Order placed successfully!");
            return { success: true };
        } catch (error) {
            toast.error("Failed to process order");
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    }

    return (
        <CartContext.Provider value={{ 
            items, 
            addToCart, 
            removeFromCart, 
            increment, 
            decrement, 
            updateQuantity,
            number, 
            isEmpty, 
            total,
            loading,
            clearCart,
            processOrder
        }}>
            {children}
        </CartContext.Provider>
    );
}