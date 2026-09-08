import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CounterScreen, FullNameScreen } from './src/components/Section1';
import { ConnectionScreen, TimerScreen } from './src/components/Section2';



export default function App() {
  return (
    <SafeAreaView styles={styles.main}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <CounterScreen />
        <FullNameScreen />
        <TimerScreen />
        <ConnectionScreen />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: '#f0f0f0' },
  scrollContent: { padding: 16 },
});
