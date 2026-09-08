// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default function TimerScreen() {
//     const [seconds, setSeconds] = useState(0);

//     useEffect(() => {
//         const timerId = setInterval(() => {
//             setSeconds(previousSeconds => previousSeconds + 1);
//         }, 1000);

//         return () => clearInterval(timerId);
//     }, []);

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Thời gian: {seconds} giây</Text>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#f9f9f9'
//     },
//     title: {
//         fontSize: 24,
//     },
// });

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

export function TimerScreen() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const timerId = setInterval(() => {
      setSeconds(previousSeconds => previousSeconds + 1);
    }, 1000);
    return () => clearInterval(timerId); // Hàm dọn dẹp
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ví dụ 3.1.2: Thời gian: {seconds} giây</Text>
    </View>
  );
}

export function ConnectionScreen() {
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState('Chưa kết nối');
  const [lastConnected, setLastConnected] = useState(null);

  useEffect(() => {
    if (isConnected) {
      setMessage('Thiết bị đã kết nối');
      setLastConnected(new Date().toLocaleTimeString());
    } else {
      setMessage('Thiết bị đã ngắt kết nối');
    }
  }, [isConnected]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài tập 3.1.2: Trạng thái kết nối</Text>
      <View style={styles.switchRow}>
        <Text>Công tắc kết nối:</Text>
        <Switch value={isConnected} onValueChange={setIsConnected} />
      </View>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: isConnected ? 'green' : 'red' }}>
        {message}
      </Text>
      {lastConnected && (
        <Text style={styles.info}>Thời điểm kết nối gần nhất: {lastConnected}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#e9f5f9', marginBottom: 16, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  info: { marginTop: 8, fontStyle: 'italic', color: '#555' }
});