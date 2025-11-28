This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

## Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

## UI & Styling Guidelines

- **Imports & aliases**
  - Use `@` alias instead of relative `../` imports:
    - Theme: `@/theme/metrics`, `@/theme/font`, `@/theme/useTheme`, `@/theme/ThemeContext`
    - Screens: `@/screens/...`
    - Components: `@/components/...`
    - Types: `@/types/...`

- **Scaling helpers (for all numeric sizes)**
  - Import from `@/theme/metrics`:
    - `scale(value)`: horizontal spacing/sizes (left/right padding & margin, `paddingHorizontal`, widths, gaps).
    - `verticalScale(value)`: vertical spacing/sizes (top/bottom padding & margin, `paddingVertical`, heights).
    - `moderateScale(value)`: radii, icon containers, dots, chips, small squares.
  - Avoid raw numbers like `padding: 24` or `height: 56` – always wrap with a scaling helper.
  - Keep `flex` and percentage values as-is (`flex: 1`, `width: '100%'`).

- **Fonts & accessibility**
  - Use `scaledFontSize` from `@/theme/font` for **all** `fontSize` values:
    - `scaledFontSize(baseSize, maxScale = 1.3)` combines device-size scaling and system font scale, capped to avoid breaking layouts.
  - Derive `lineHeight` from the scaled font: `lineHeight: scaledFontSize(14) * 1.4`.
  - Global defaults (in `App.tsx`) ensure `Text` and `TextInput` respect system font size via `allowFontScaling = true`.

- **Theme usage**
  - Always use theme tokens instead of hard-coded colors:
    - Text: `theme.colors.text.primary`, `theme.colors.text.secondary`, etc.
    - Backgrounds: `theme.colors.backgrounds.primary`, `backgrounds.card`, etc.
    - Borders: `theme.colors.borders.light/medium/dark`.
    - Buttons: `theme.colors.buttons.primary/secondary/...`.
  - Use `theme.typography.fontSize` and `theme.spacing` as **base design tokens**, then wrap with scaling helpers:
    - `fontSize: scaledFontSize(theme.typography.fontSize.lg)`
    - `padding: scale(theme.spacing.md)`

- **Screen & component structure**
  - Screens live under `src/screens/ScreenName/` with:
    - `index.tsx` for logic/layout.
    - `styles.ts` for `StyleSheet` definitions.
  - Prefer theme-aware styles:
    - `export const createStyles = (theme: Theme) => StyleSheet.create({ ... })`
  - Components define a local `StyleSheet.create` in the same file and use theme + scaling helpers.

- **Common patterns**
  - Buttons:
    - Height around `verticalScale(56)`, radius `moderateScale(12–16)`.
    - Use theme button colors and `scaledFontSize(16)` for labels.
  - Cards & chips:
    - Card radius `moderateScale(12–18)`, chip radius `moderateScale(12–20)`.
    - Horizontal padding with `scale`, vertical with `verticalScale`.

Follow these conventions for any new screens/components so the UI stays consistent and responsive across all devices and system font sizes.
