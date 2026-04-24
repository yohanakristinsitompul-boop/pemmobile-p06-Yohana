// components/ProductCard.js
import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
      <h3>{product.name}</h3>
      <p>Kategori: {product.category}</p>
      <p>Harga: Rp{product.price}</p>
    </div>
  );
};

export default ProductCard;