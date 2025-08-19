'use client';

import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems } = useContext(CartContext);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-50 flex justify-end z-50">
      <div className="bg-white w-80 h-full shadow-lg p-4 flex flex-col">
        <button
          className="self-end text-gray-600 hover:text-red-600"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-lg font-bold mb-4">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <ul className="space-y-3">
            {cartItems.map((item, idx) => (
              <li key={idx} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.color} | {item.size}
                  </p>
                  <p className="text-sm">Qty: {item.quantity}</p>
                </div>
                <span className="font-semibold">${item.price}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
