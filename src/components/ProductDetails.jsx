

'use client';

import Image from 'next/image';

export default function ProductDetails({
  product,
  selectedColor,
  selectedSize,
  onColorSelect,
  onSizeSelect,
  onAddToCart,
  availableSizesForColor,

  


}) {
  return (
     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Product Image */}
      <div className="relative w-full h-96">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-contain rounded-lg"
          // priority // ✅ load this image faster
          sizes="(max-width: 768px) 100vw, 50vw" // responsive sizing
        />
        
      </div>

      {/* Product Info */}
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-700 mb-6">${product.price}</p>

        {/* Colors */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Color:</h3>
          <div className="flex gap-2 mt-2">
            {product.variants.map((variant) => (
              <button
                key={variant.color}
                onClick={() => onColorSelect(variant.color)}
                className={`px-4 py-2 rounded-lg border ${
                  selectedColor === variant.color
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200'
                }`}
              >
                {variant.color}
              </button>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Size:</h3>
          <div className="flex gap-2 mt-2">
            {availableSizesForColor.map((size) => (
              <button
                key={size}
                onClick={() => onSizeSelect(size)}
                className={`px-4 py-2 rounded-lg border ${
                  selectedSize === size
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart */}
        <button
          onClick={onAddToCart}
          className="w-full py-4 bg-blue-600 text-white text-xl font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-all"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
