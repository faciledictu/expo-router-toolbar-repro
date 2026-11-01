import { Link, Stack } from 'expo-router';
import { Screen } from '../components/Screen';

// A: no Stack.Toolbar.
export default function Home() {
  return (
    <Screen note="A has no Stack.Toolbar. Expected: no bottom toolbar, also after coming back from B.">
      <Stack.Screen options={{ title: 'A: no toolbar' }} />
      <Link href="/with-toolbar">Push B (with toolbar)</Link>
      <Link href="/plain">Push C (no toolbar)</Link>
    </Screen>
  );
}
