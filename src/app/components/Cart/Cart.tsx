// components/Cart/Cart.tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";

type ClothingItem = {
  id: string;
  name: string;
  image: string;
  type: string;
};

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<ClothingItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("outfitCart");
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  const handleRemove = (id: string) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("outfitCart", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-contain bg-white rounded"
                />
                <span className="text-lg">{item.name}</span>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-400 hover:text-red-300 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <Link href="/create">
        <button className="mt-6 mr-5 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded">
          Continue Shopping
        </button>
      </Link>
      <Link href="/">
        <button className="mt-2 bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded">
          Home
        </button>
      </Link>
    </div>
  );
};

export default Cart;
