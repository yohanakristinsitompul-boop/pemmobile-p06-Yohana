// components/SearchBar.js
import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Cari produk..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={() => setSearchTerm('')}>Clear</button>
    </div>
  );
};

export default SearchBar;