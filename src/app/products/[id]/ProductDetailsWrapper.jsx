

'use client';

import { useState, useContext, useEffect } from 'react';
import ProductDetails from '@/components/ProductDetails';
import RecentlyViewed from '@/components/RecentlyViewed';
import { CartContext } from '@/context/CartContext';

export default function ProductDetailsWrapper({ product }) {
  const { addToCart } = useContext(CartContext);

  // ✅ Default to first color if available
  const [selectedColor, setSelectedColor] = useState(
    product?.variants?.[0]?.color || ''
  );
  const [selectedSize, setSelectedSize] = useState('');

  // ✅ Sizes for the currently selected color
  const currentVariant = product?.variants?.find(
    (variant) => variant.color === selectedColor
  );
  const availableSizesForColor = currentVariant?.sizes || [];

  // ✅ Reset size when color changes
  useEffect(() => {
    setSelectedSize('');
  }, [selectedColor]);

  // ✅ Save product to Recently Viewed when this page loads
  useEffect(() => {
    if (!product) return;

    let viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');

    // Remove duplicate if already exists
    viewed = viewed.filter((p) => p.id !== product.id);

    // Add current product
    viewed.push({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });

    // Keep only last 3
    if (viewed.length > 3) {
      viewed = viewed.slice(viewed.length - 3);
    }

    localStorage.setItem('recentlyViewed', JSON.stringify(viewed));
  }, [product]);

  // ✅ Add-to-cart validation
  const handleAddToCart = () => {
    if (!selectedColor) {
      alert('Please select a color.');
      return;
    }
    if (!selectedSize) {
      alert('Please select a size.');
      return;
    }
    addToCart(product, selectedColor, selectedSize);
  };

  return (
    <>
      <ProductDetails
        product={product}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        onColorSelect={setSelectedColor}
        onSizeSelect={setSelectedSize}
        onAddToCart={handleAddToCart} // ✅ validated handler passed here
        availableSizesForColor={availableSizesForColor}
      />
      <RecentlyViewed />
    </>
  );
}
