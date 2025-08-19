

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const RecentlyViewed = () => {
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('recentlyViewed');
      if (stored) {
        const parsed = JSON.parse(stored);

        // ✅ Keep unique products (by id)
        const unique = Array.from(
          new Map(parsed.map((p) => [p.id, p])).values()
        );

        // ✅ Only last 3 products
        setRecentlyViewedProducts(unique.slice(-3).reverse());
      }
    } catch (error) {
      console.error('Failed to load recently viewed products', error);
    }
  }, []);

  if (recentlyViewedProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Recently Viewed</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recentlyViewedProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`} className="block">
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {product.name}
                </h3>
                <p className="text-blue-600 font-bold mt-1">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
