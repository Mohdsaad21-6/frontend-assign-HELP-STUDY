'use client';
import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';

export default function CartBadge() {
  const { cartItems } = useContext(CartContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // now we can safely render client-only values
  }, []);

  if (!mounted) return null;

  return (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1">
      {cartItems.length}
    </span>
  );
}
