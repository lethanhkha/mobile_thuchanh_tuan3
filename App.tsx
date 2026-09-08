// import React, { useState } from 'react';
// import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';

// import { CounterScreen, FullNameScreen } from './src/components/Section1';
// import { TimerScreen, ConnectionScreen } from './src/components/Section2';
// import { ThemeScreen, ProfileScreen } from './src/components/Section3';
// import { CartScreen, LoginScreen } from './src/components/Section4';
// import { ProductSearchScreen } from './src/components/Section5'; // IMPORT THÊM 3.1.5
// import { ThemeContext, UserContext } from './src/contexts/MyContext';

// export default function App() {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const toggleTheme = () => setIsDarkMode(previousMode => !previousMode);

//   const [user, setUser] = useState({
//     name: 'Nguyễn Văn An',
//     email: 'an.nguyen@example.com',
//     avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
//   });
//   const logout = () => setUser(null);

//   return (
//     <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
//       <UserContext.Provider value={{ user, logout }}>
//         <SafeAreaView style={[styles.main, { backgroundColor: isDarkMode ? '#121212' : '#f0f0f0' }]}>
//           <ScrollView contentContainerStyle={styles.scrollContent}>
            
//             <CounterScreen />
//             <FullNameScreen />

//             <TimerScreen />
//             <ConnectionScreen />

//             <ThemeScreen />
//             <ProfileScreen />

//             <CartScreen />
//             <LoginScreen />

//             <ProductSearchScreen />
            
//           </ScrollView>
//         </SafeAreaView>
//       </UserContext.Provider>
//     </ThemeContext.Provider>
//   );
// }

// const styles = StyleSheet.create({
//   main: { flex: 1 },
//   scrollContent: { padding: 16 },
//   headerText: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 16 }
// });
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from './src/contexts/MyContext';
import { TodoApp } from './src/components/BaiTapCuoiChuong';

export default function App() {
  // Quản lý trạng thái Theme để dùng cho toàn ứng dụng (useContext)
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => setIsDarkMode(previousMode => !previousMode);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <SafeAreaView style={[styles.main, { backgroundColor: isDarkMode ? '#121212' : '#f0f0f0' }]}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <Text style={[styles.headerText, { color: isDarkMode ? '#fff' : '#000' }]}>
            BÀI TẬP TỔNG HỢP CUỐI CHƯƠNG 3
          </Text>
          
          <TodoApp />
          
        </ScrollView>
      </SafeAreaView>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1 },
  scrollContent: { padding: 16 },
  headerText: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 16 }
});