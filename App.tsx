import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { TodoApp } from './src/components/BaiTapCuoiChuong';
import { ThemeContext, UserContext } from './src/contexts/MyContext';
import { CounterScreen, FullNameScreen } from './src/components/Section1';
import { ConnectionScreen, TimerScreen } from './src/components/Section2';
import { ProfileScreen, ThemeScreen } from './src/components/Section3';
import { CartScreen, LoginScreen } from './src/components/Section4';
import { ProductSearchScreen } from './src/components/Section5';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => setIsDarkMode(previousMode => !previousMode);

  const [user, setUser] = useState({
    name: 'Lê Thanh Kha',
    email: 'kha.le@example.com',
    avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
  });
  const logout = () => setUser(null);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <UserContext.Provider value={{ user, logout }}>
        <SafeAreaView style={[styles.main, { backgroundColor: isDarkMode ? '#121212' : '#f0f0f0' }]}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            
            <Text style={[styles.headerText, { color: isDarkMode ? '#fff' : '#000' }]}>
              THỰC HÀNH TẤT CẢ HOOKS (3.1.1 - 3.1.5)
            </Text>
            
            <CounterScreen />
            <FullNameScreen />

            <TimerScreen />
            <ConnectionScreen />

            <ThemeScreen />
            <ProfileScreen />

            <CartScreen />
            <LoginScreen />

            <ProductSearchScreen />
            
            <View style={styles.divider} />

            <Text style={[styles.headerText, { color: isDarkMode ? '#fff' : '#000' }]}>
              BÀI TẬP TỔNG HỢP CUỐI CHƯƠNG
            </Text>

            <TodoApp />
            
          </ScrollView>
        </SafeAreaView>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1 },
  scrollContent: { padding: 16 },
  headerText: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 16 },
  divider: { height: 2, backgroundColor: '#888', marginVertical: 30 } // Tạo đường kẻ ngang phân tách rõ ràng
});