# RefreshControl Bug Reproductions

This repository contains minimal reproductions for two React Native `RefreshControl` bugs on iOS.

## 🐛 Bug #1: RefreshControl Gets Stuck When Changing Tabs

**File:** `RefreshControlStuckScreen.tsx`

### Description
When a `RefreshControl` is actively refreshing and the user navigates away from the screen (e.g., switching tabs), the refresh indicator becomes stuck upon returning to the screen.

### Reproduction Steps
1. Pull down on the ScrollView to trigger refresh
2. While the spinner is animating, switch to another tab
3. Return to the original tab
4. **Result:** RefreshControl remains stuck in refreshing state

### Expected Behavior
The RefreshControl should properly cancel or complete when the screen unmounts/remounts.

---

## 🎨 Bug #2: RefreshControl `tintColor` Not Respected (iOS)

**File:** `RefreshControlTintColorScreen.tsx`

### Description
The `tintColor` prop on `RefreshControl` is not applied on initial render on iOS. The spinner appears in the default gray color instead of the specified color.

### Reproduction Steps
1. Pull down on the ScrollView to trigger refresh
2. **Result:** Spinner appears gray instead of orange

### Expected Behavior
The RefreshControl spinner should be orange as specified by `tintColor="orange"`.

### Workaround
Setting the `tintColor` after a short delay (~500ms) works, but this shouldn't be necessary:

```typescript
const [tintColor, setTintColor] = useState("white")
useEffect(() => {
  setTimeout(() => setTintColor("orange"), 500)
}, [])
```

---

## 🚀 Running the Reproduction

```bash
# Install dependencies
yarn install

# Run on iOS
yarn ios
```

## 📱 Environment

- **Platform:** iOS (bugs not present on Android)
- **React Native:** [Your version]
- **React Native Navigation:** [Your version if applicable]

## 📝 Notes

Both screens contain detailed inline comments and clear visual indicators to make the bugs immediately apparent during testing.