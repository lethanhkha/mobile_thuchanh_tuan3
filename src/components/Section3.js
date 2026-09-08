import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { ThemeContext, UserContext } from '../contexts/MyContext';

export function ThemeScreen() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  
  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#222222' : '#ffffff' }]}>
      <Text style={[styles.title, { color: isDarkMode ? '#ffffff' : '#222222' }]}>
        Ví dụ 3.1.3: {isDarkMode ? 'Chế độ tối' : 'Chế độ sáng'}
      </Text>
      <Button title="Đổi giao diện" onPress={toggleTheme} />
    </View>
  );
}

export function ProfileScreen() {
  const { user, logout } = useContext(UserContext);

  return (
    <View style={[styles.container, { backgroundColor: '#fff3e0' }]}>
      <Text style={styles.title}>Bài tập 3.1.3: Thông tin cá nhân</Text>
      {user ? (
        <View style={styles.profileBox}>
          {user.avatar && (
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          )}
          <Text style={styles.text}>Xin chào, {user.name}</Text>
          <Text style={styles.text}>Email: {user.email}</Text>
          <View style={{ marginTop: 12 }}>
            <Button title="Đăng xuất" onPress={logout} color="red" />
          </View>
        </View>
      ) : (
        <Text style={styles.text}>Vui lòng đăng nhập</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, marginBottom: 16, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  profileBox: { alignItems: 'center' },
  text: { fontSize: 16, marginBottom: 4 },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 12 }
});