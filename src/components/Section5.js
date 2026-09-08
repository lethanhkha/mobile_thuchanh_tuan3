import React, { memo, useCallback, useMemo, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Switch } from 'react-native';

const INITIAL_PRODUCTS = [
  { id: '1', name: 'Áo thun', price: 200000 },
  { id: '2', name: 'Quần jean', price: 450000 },
  { id: '3', name: 'Giày thể thao', price: 800000 },
  { id: '4', name: 'Áo khoác', price: 550000 },
  { id: '5', name: 'Mũ lưỡi trai', price: 100000 },
];

const ProductItem = memo(function ProductItem({ item, onSelect }) {
  console.log('Render:', item.name); 
  return (
    <View style={styles.itemWrapper}>
      <Button
        title={`${item.name} - ${item.price.toLocaleString('vi-VN')}đ`}
        onPress={() => onSelect(item)}
      />
    </View>
  );
});

export function ProductSearchScreen() {
  const [keyword, setKeyword] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isAscending, setIsAscending] = useState(true); // Sắp xếp giá tăng/giảm
  
  const filteredProducts = useMemo(() => {
    let result = INITIAL_PRODUCTS.filter(product =>
      product.name.toLowerCase().includes(keyword.toLowerCase())
    );

    if (maxPrice && !isNaN(maxPrice)) {
      result = result.filter(product => product.price <= parseInt(maxPrice, 10));
    }

    result.sort((a, b) => (isAscending ? a.price - b.price : b.price - a.price));

    return result;
  }, [keyword, maxPrice, isAscending]);

  const totalPrice = useMemo(() => {
    return filteredProducts.reduce((total, product) => total + product.price, 0);
  }, [filteredProducts]);

  const handleSelect = useCallback(product => {
    alert(`Đã chọn: ${product.name}`);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài tập 3.1.5: Lọc & Tính tổng</Text>
      
      <TextInput
        style={styles.input}
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Tìm tên sản phẩm..."
      />
      <TextInput
        style={styles.input}
        value={maxPrice}
        onChangeText={setMaxPrice}
        placeholder="Giá tối đa (VNĐ)..."
        keyboardType="numeric"
      />

      <View style={styles.switchRow}>
        <Text>Sắp xếp giá: {isAscending ? 'Tăng dần' : 'Giảm dần'}</Text>
        <Switch value={isAscending} onValueChange={setIsAscending} />
      </View>

      <Text style={styles.totalText}>
        Tổng giá hiển thị: {totalPrice.toLocaleString('vi-VN')}đ
      </Text>

      <View style={{ height: 250, backgroundColor: '#fff', borderRadius: 8 }}>
        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <ProductItem item={item} onSelect={handleSelect} />}
          ListEmptyComponent={<Text style={{ padding: 10 }}>Không tìm thấy sản phẩm</Text>}
          nestedScrollEnabled
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#e8f5e9', marginBottom: 16, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 8, borderRadius: 6, backgroundColor: '#fff' },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 8 },
  totalText: { fontSize: 16, fontWeight: 'bold', color: 'blue', marginBottom: 12 },
  itemWrapper: { marginBottom: 6, paddingHorizontal: 4 }
});