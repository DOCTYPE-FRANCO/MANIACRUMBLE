import React from "react";
function Shop(){
    const products = [
        {
            id: 1,
            name: "Beanie",
            description: "A stylish black beanie.",
            price: 19.99,
            image: "path/to/beanie.jpg"
        },
        {
            id: 2,
            name: "Wave Cap",
            description: "A trendy black wave cap.",
            price: 24.99,
            image: "path/to/wavecap.jpg"
        }
    ]

    return(
        <div>
            <h1 className="text-4xl font-bold text-center mt-10">Shop Our Products</h1>
            <p className="text-4xl text-white font-extrabold text-center mt-10">This Page is still under Development :)</p>
        </div>
    );
}

export default Shop;