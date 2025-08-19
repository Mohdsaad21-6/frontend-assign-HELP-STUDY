

'use client';
import React, { use } from 'react';
import ProductDetailsWrapper from './ProductDetailsWrapper';
import { useCachedProduct } from '@/app/useCachedProduct';

export default function ProductPage({ params }) {
  // ✅ unwrap params promise
  const { id } = use(params);

  const { product, loading } = useCachedProduct(id);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="p-8 bg-white rounded-lg shadow-xl">
      <ProductDetailsWrapper product={product} />
    </div>
  );
}
