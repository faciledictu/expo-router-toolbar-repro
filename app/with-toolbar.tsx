import { Link, Stack } from 'expo-router';
import { Screen } from '../components/Screen';

// B: the only screen with a bottom Stack.Toolbar.
export default function WithToolbar() {
  return (
    <Screen note="B has a bottom Stack.Toolbar with one button. Expected: the toolbar with the star button.">
      <Stack.Screen options={{ title: 'B: toolbar' }} />
      <Stack.Toolbar>
        <Stack.Toolbar.Spacer />
        <Stack.Toolbar.Button icon="star" onPress={() => {}} />
      </Stack.Toolbar>
      <Link href="/plain">Push C (no toolbar)</Link>
    </Screen>
  );
}
