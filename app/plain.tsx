import { Stack } from 'expo-router';
import { Screen } from '../components/Screen';

// C: no Stack.Toolbar.
export default function Plain() {
  return (
    <Screen note="C has no Stack.Toolbar. Expected: no bottom toolbar, whether pushed from A or from B.">
      <Stack.Screen options={{ title: 'C: no toolbar' }} />
    </Screen>
  );
}
