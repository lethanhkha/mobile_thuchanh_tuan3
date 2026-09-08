import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CounterScreen, FullNameScreen } from './src/components/Section1';
import { ConnectionScreen, TimerScreen } from './src/components/Section2';
import { ProfileScreen, ThemeScreen } from './src/components/Section3';
import { useState } from 'react';
import { ThemeContext, UserContext } from './src/contexts/MyContext';



export default function App() {
  // 1. Quản lý trạng thái cho Theme (Sáng/Tối)
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => setIsDarkMode(previousMode => !previousMode);

  // 2. Quản lý trạng thái cho User (Thông tin cá nhân)
  const [user, setUser] = useState({
    name: 'Le Thanh Kha',
    email: 'kha.le@email.com',
    avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
  });
  const logout = () => setUser(null); // Xóa thông tin user khi đăng xuất

  return (
    // Bọc ThemeContext và UserContext ở cấp cao nhất
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <UserContext.Provider value={{ user, logout }}>
        
        {/* Cập nhật màu nền tổng thể dựa trên isDarkMode */}
        <SafeAreaView style={[styles.main, { backgroundColor: isDarkMode ? '#121212' : '#f0f0f0' }]}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={[styles.headerText, { color: isDarkMode ? '#fff' : '#000' }]}>
              THỬ NGHIỆM TỔNG HỢP (TỪ 3.1.1 ĐẾN 3.1.3)
            </Text>
            
            {/* Test Mục 3.1.1 */}
            <CounterScreen />
            <FullNameScreen />

            {/* Test Mục 3.1.2 */}
            <TimerScreen />
            <ConnectionScreen />

            {/* Test Mục 3.1.3 */}
            <ThemeScreen />
            <ProfileScreen />
            
          </ScrollView>
        </SafeAreaView>

      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1 },
  scrollContent: { padding: 16 },
  headerText: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 16 }
});
