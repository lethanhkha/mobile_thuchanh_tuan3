import React, { useState, useEffect, useContext, useReducer, useMemo, useCallback, memo } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../contexts/MyContext';

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        { id: Date.now().toString(), title: action.payload, completed: false }
      ];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
}

const TodoItem = memo(function TodoItem({ item, onToggle, onDelete, isDarkMode }) {
  const textColor = isDarkMode ? '#ffffff' : '#000000';
  
  return (
    <View style={[styles.todoItem, { borderBottomColor: isDarkMode ? '#444' : '#ccc' }]}>
      <TouchableOpacity style={styles.todoTextContainer} onPress={() => onToggle(item.id)}>
        <Text style={[
          styles.todoText, 
          { color: textColor, textDecorationLine: item.completed ? 'line-through' : 'none' }
        ]}>
          {item.completed ? '✅ ' : '⏳ '}{item.title}
        </Text>
      </TouchableOpacity>
      <Button title="Xóa" color="red" onPress={() => onDelete(item.id)} />
    </View>
  );
});

// 3. Component chính
export function TodoApp() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const [todos, dispatch] = useReducer(todoReducer, []);

  const [inputValue, setInputValue] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    console.log(`Danh sách hiện có ${todos.length} công việc`);
  }, [todos.length]);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo =>
      todo.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [todos, searchKeyword]);

  const incompleteCount = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const handleToggle = useCallback((id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  }, []);

  const handleDelete = useCallback((id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  }, []);

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      dispatch({ type: 'ADD_TODO', payload: inputValue });
      setInputValue('');
    }
  };

  const containerBg = isDarkMode ? '#1e1e1e' : '#ffffff';
  const textColor = isDarkMode ? '#ffffff' : '#000000';
  const inputBg = isDarkMode ? '#333333' : '#f9f9f9';

  return (
    <View style={[styles.container, { backgroundColor: containerBg }]}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: textColor }]}>Quản lý công việc</Text>
        <View style={styles.themeToggle}>
          <Text style={{ color: textColor }}>{isDarkMode ? 'Tối' : 'Sáng'}</Text>
          <Switch value={isDarkMode} onValueChange={toggleTheme} />
        </View>
      </View>

      <Text style={[styles.infoText, { color: textColor }]}>
        Số việc chưa hoàn thành: {incompleteCount}
      </Text>

      <TextInput
        style={[styles.input, { backgroundColor: inputBg, color: textColor }]}
        placeholder="Nhập công việc mới..."
        placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
        value={inputValue}
        onChangeText={setInputValue}
      />
      <Button title="Thêm công việc" onPress={handleAddTodo} />

      <TextInput
        style={[styles.input, { backgroundColor: inputBg, color: textColor, marginTop: 12 }]}
        placeholder="Tìm kiếm công việc..."
        placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
        value={searchKeyword}
        onChangeText={setSearchKeyword}
      />

      <View style={{ height: 300, marginTop: 12 }}>
        <FlatList
          data={filteredTodos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TodoItem 
              item={item} 
              onToggle={handleToggle} 
              onDelete={handleDelete} 
              isDarkMode={isDarkMode}
            />
          )}
          ListEmptyComponent={
            <Text style={{ color: textColor, textAlign: 'center', marginTop: 20 }}>
              Không có công việc nào.
            </Text>
          }
          nestedScrollEnabled
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, borderRadius: 8, borderWidth: 1, borderColor: '#ccc', marginBottom: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title: { fontSize: 20, fontWeight: 'bold' },
  themeToggle: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  infoText: { fontSize: 16, fontWeight: 'bold', color: '#d9534f', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#aaa', padding: 10, marginBottom: 8, borderRadius: 6 },
  todoItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1 },
  todoTextContainer: { flex: 1 },
  todoText: { fontSize: 16 }
});