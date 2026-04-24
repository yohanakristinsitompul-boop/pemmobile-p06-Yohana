import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const HomeScreen = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua');
  const [isGrid, setIsGrid] = useState(false);
  const [sortBy, setSortBy] = useState('Harga Terendah');

  // Logic Filter & Sort
  const filteredData = useMemo(() => {
    let data = products.filter(p => 
      (category === 'Semua' || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sortBy === 'Harga Terendah') data.sort((a, b) => a.price - b.price);
    if (sortBy === 'Harga Tertinggi') data.sort((a, b) => b.price - a.price);
    if (sortBy === 'Rating Tertinggi') data.sort((a, b) => b.rating - a.rating);
    
    return data;
  }, [search, category, sortBy]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>ShopList App</Text>
      <Text style={styles.subHeader}>Menampilkan {filteredData.length} produk</Text>

      {/* Search Bar (R5) */}
      <View style={styles.searchContainer}>
        <TextInput style={styles.input} value={search} onChangeText={setSearch} placeholder="Cari..." />
        {search ? <TouchableOpacity onPress={() => setSearch('')}><Text>✕</Text></TouchableOpacity> : null}
      </View>

      {/* Filter Chips (E1) & Toggle View (E2) */}
      <View style={styles.toolbar}>
        {['Semua', 'Pakaian', 'Sepatu', 'Aksesoris'].map(cat => (
          <TouchableOpacity key={cat} style={[styles.chip, category === cat && styles.activeChip]} onPress={() => setCategory(cat)}>
            <Text>{cat}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={() => setIsGrid(!isGrid)} style={styles.toggleBtn}>
          <Text>{isGrid ? 'List' : 'Grid'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        key={isGrid ? 'grid' : 'list'}
        numColumns={isGrid ? 2 : 1}
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard item={item} />}
        ListEmptyComponent={<View style={styles.empty}><Text>❌ Produk Tidak Ditemukan</Text></View>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8f9fa' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  subHeader: { color: '#666', marginBottom: 10 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  input: { flex: 1 },
  toolbar: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10 },
  chip: { padding: 8, marginHorizontal: 4, backgroundColor: '#eee', borderRadius: 20 },
  activeChip: { backgroundColor: '#007bff' },
  empty: { alignItems: 'center', marginTop: 50 }
});

export default HomeScreen;