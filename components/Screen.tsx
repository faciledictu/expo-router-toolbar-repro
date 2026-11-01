import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

// A shown toolbar adds its height to the screen's bottom safe area. A provider
// inside the screen reads the screen's own insets, not the window's.
const ROWS = Array.from({ length: 30 }, (_, i) => i + 1);

export function Screen(props: { note: string; children?: ReactNode }) {
  return (
    <SafeAreaProvider>
      <ScreenContent {...props} />
    </SafeAreaProvider>
  );
}

function ScreenContent({ note, children }: { note: string; children?: ReactNode }) {
  const { bottom } = useSafeAreaInsets();
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.content}>
      <Text style={styles.note}>{note}</Text>
      <Text style={styles.inset}>Bottom safe area: {Math.round(bottom)}</Text>
      <View style={styles.links}>{children}</View>
      {ROWS.map((row) => (
        <Text key={row} style={styles.row}>
          Row {row}
        </Text>
      ))}
      <Text style={styles.end}>End of content</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 8 },
  note: { fontSize: 15 },
  inset: { fontSize: 17, fontWeight: '600' },
  links: { gap: 12, paddingVertical: 8 },
  row: { color: '#666' },
  end: { fontWeight: '600' },
});
