import React, { useReducer } from 'react';
import { View, Text, Button, StyleSheet, TextInput, ActivityIndicator } from 'react-native';

const cartInitialState = { quantity: 0 };

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { ...state, quantity: state.quantity + 1 };
    case 'REMOVE':
      return { ...state, quantity: Math.max(0, state.quantity - 1) };
    case 'RESET':
      return cartInitialState;
    default:
      return state;
  }
}

export function CartScreen() {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ví dụ 3.1.4: Số sản phẩm: {state.quantity}</Text>
      <View style={styles.buttonRow}>
        <Button title="Thêm" onPress={() => dispatch({ type: 'ADD' })} />
        <Button title="Bớt" onPress={() => dispatch({ type: 'REMOVE' })} />
        <Button title="Xóa" onPress={() => dispatch({ type: 'RESET' })} color="red" />
      </View>
    </View>
  );
}

const loginInitialState = {
  email: '',
  password: '',
  error: '',
  isSubmitting: false, 
};

function loginReducer(state, action) {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload, error: '' };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload, error: '' };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isSubmitting: false };
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.payload };
    case 'RESET':
      return loginInitialState;
    default:
      return state;
  }
}

export function LoginScreen() {
  const [state, dispatch] = useReducer(loginReducer, loginInitialState);

  const handleLogin = () => {
    if (!state.email || !state.password) {
      return dispatch({ type: 'SET_ERROR', payload: 'Vui lòng nhập đầy đủ thông tin' });
    }
    if (!state.email.includes('@')) {
      return dispatch({ type: 'SET_ERROR', payload: 'Email không hợp lệ (phải chứa @)' });
    }
    if (state.password.length < 6) {
      return dispatch({ type: 'SET_ERROR', payload: 'Mật khẩu phải có ít nhất 6 ký tự' });
    }

    dispatch({ type: 'SET_SUBMITTING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: '' });

    setTimeout(() => {
      dispatch({ type: 'SET_SUBMITTING', payload: false });
      alert('Đăng nhập thành công!');
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài tập 3.1.4: Đăng nhập</Text>
      <TextInput
        style={styles.input}
        value={state.email}
        onChangeText={text => dispatch({ type: 'SET_EMAIL', payload: text })}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={state.password}
        onChangeText={text => dispatch({ type: 'SET_PASSWORD', payload: text })}
        placeholder="Mật khẩu"
        secureTextEntry
      />
      
      {state.error ? <Text style={styles.errorText}>{state.error}</Text> : null}

      {state.isSubmitting ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: 10 }} />
      ) : (
        <View style={styles.buttonRow}>
          <Button title="Đăng nhập" onPress={handleLogin} />
          <Button title="Đặt lại" onPress={() => dispatch({ type: 'RESET' })} color="gray" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f4f4f4', marginBottom: 16, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 6, backgroundColor: '#fff' },
  errorText: { color: 'red', textAlign: 'center', marginBottom: 10, fontWeight: 'bold' }
});