

'use client';
import { useState, useEffect } from 'react';
import { fetchProductById } from '@/data/products';

export function useCachedProduct(productId) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    const cacheKey = `product_${productId}`;
    const cached = JSON.parse(localStorage.getItem(cacheKey) || 'null');

    const now = new Date().getTime();

    if (cached && now - cached.timestamp < 5 * 60 * 1000) {
      // Serve from cache if < 5 minutes old
      setProduct(cached.data);
      setLoading(false);
    } else {
      // Fetch from API
      fetchProductById(productId)
        .then((data) => {
          setProduct(data);
          setLoading(false);
          localStorage.setItem(
            cacheKey,
            JSON.stringify({ data, timestamp: new Date().getTime() })
          );
        })
        .catch(() => {
          setProduct(null);
          setLoading(false);
        });
    }
  }, [productId]);

  return { product, loading };
}

