import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

export function CounterScreen() {
    const [count, setCount] = useState(0);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ví dụ 3.1.1: Số lượng: {count}</Text>
            <View style={styles.buttonRow}>
                <Button title="Tăng" onPress={() => setCount(previousCount => previousCount + 1)} />
                <Button title="Giảm" onPress={() => setCount(previousCount => Math.max(0, previousCount - 1))} />
                <Button title="Đặt lại" onPress={() => setCount(0)} />
            </View>
        </View>
    );
}

export function FullNameScreen() {
    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bài tập 3.1.1: Nhập thông tin</Text>
            <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Nhập họ tên"
            />
            <TextInput
                style={styles.input}
                value={age}
                onChangeText={setAge}
                placeholder="Nhập tuổi"
                keyboardType="numeric"
            />

            <Text style={styles.greeting}>
                {fullName ? `Xin chào, ${fullName}!` : 'Vui lòng nhập họ tên'}
            </Text>

            {age !== '' && parseInt(age) < 18 && (
                <Text style={styles.warning}>Cảnh báo: Tuổi nhỏ hơn 18</Text>
            )}

            <Button
                title="Xóa toàn bộ dữ liệu"
                onPress={() => { setFullName(''); setAge(''); }}
                color="red"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: '#f9f9f9', marginBottom: 16, borderRadius: 8 },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
    buttonRow: { flexDirection: 'row', justifyContent: 'space-around' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 8, borderRadius: 4 },
    greeting: { fontSize: 16, color: 'blue', marginVertical: 8 },
    warning: { fontSize: 16, color: 'red', marginBottom: 8 }
});