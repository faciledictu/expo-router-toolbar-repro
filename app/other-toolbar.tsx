import { Stack } from 'expo-router';
import { Screen } from '../components/Screen';

// D: a second screen with a bottom Stack.Toolbar, pushed from B.
export default function OtherToolbar() {
  return (
    <Screen note="D has its own bottom Stack.Toolbar. Expected: the toolbar with the heart button, and the star again when you go back to B.">
      <Stack.Screen options={{ title: 'D: toolbar' }} />
      <Stack.Toolbar>
        <Stack.Toolbar.Spacer />
        <Stack.Toolbar.Button icon="heart" onPress={() => {}} />
      </Stack.Toolbar>
    </Screen>
  );
}
