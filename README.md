# Stack.Toolbar is never hidden on iOS

A minimal Expo app for the expo-router bottom toolbar (`Stack.Toolbar` with the
default `bottom` placement) on iOS.

`RouterToolbarHostView` calls `setToolbarHidden(false)` on the navigation
controller when a screen shows its bottom toolbar. Nothing calls
`setToolbarHidden(true)`. When that screen leaves, its host only clears its own
items. The navigation controller's toolbar stays shown for every screen that
comes after it in the stack, and for the screen you go back to.

On iOS 18 this is an empty bar with its background at the bottom of every such
screen, and their bottom safe area keeps the toolbar's height. On iOS 27.2
nothing shows: UIKit takes a toolbar without items out of the view hierarchy.

## Run

Expo SDK 58, expo-router 58.0.29, React Native 0.88. A development build:

```sh
npm install
npx expo run:ios --device "iPhone 16"
```

Pick a simulator with iOS 18 to see the bug.

## Screens

- **A** (first screen): no `Stack.Toolbar`.
- **B**: a bottom `Stack.Toolbar` with one button.
- **C**: no `Stack.Toolbar`.

Each screen prints its own bottom safe area. A shown toolbar adds its height to
it.

## Steps

1. Launch the app. A shows its bottom safe area.
2. Push B. The toolbar with the star button shows.
3. Push C.
4. Go back to B, then back to A.

## Expected and actual

Expected: a toolbar only on B. A and C keep the safe area of the home
indicator (34 on these simulators).

iPhone 16 simulator, iOS 18.0:

| Step          | Before the fix            | After the fix             |
| ------------- | ------------------------- | ------------------------- |
| 1. A          | No toolbar, 34            | No toolbar, 34            |
| 2. B          | Toolbar with the star, 83 | Toolbar with the star, 83 |
| 3. C (from B) | **Empty toolbar, 83**     | No toolbar, 34            |
| 4. B (back)   | Toolbar with the star, 83 | Toolbar with the star, 83 |
| 5. A (back)   | **Empty toolbar, 83**     | No toolbar, 34            |

iPhone 17 simulator, iOS 27.2:

| Step          | Before the fix                                     | After the fix             |
| ------------- | -------------------------------------------------- | ------------------------- |
| 1. A          | No toolbar, 34                                     | No toolbar, 34            |
| 2. B          | Toolbar with the star, 86                          | Toolbar with the star, 86 |
| 3. C (from B) | Nothing drawn, 34; `isToolbarHidden` is still `NO` | No toolbar, 34            |
| 4. B (back)   | Toolbar with the star, 86                          | Toolbar with the star, 86 |

Screenshots and the lldb output are in [evidence/](evidence/), named
`<iOS version>-<before|after>-<step>`.

## The fix

[patches/hide-bottom-toolbar.patch](patches/hide-bottom-toolbar.patch) is the
change from the pull request. To check it:

```sh
patch -p1 -d node_modules/expo-router < patches/hide-bottom-toolbar.patch
npx expo run:ios --device "iPhone 16"
```

Undo with `patch -R -p1 -d node_modules/expo-router < patches/hide-bottom-toolbar.patch`.
