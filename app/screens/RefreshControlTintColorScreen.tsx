import { useState } from "react"
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"

/**
 * Bug Reproduction: RefreshControl tintColor Not Respected on iOS
 *
 * Expected: RefreshControl spinner should be orange
 * Actual: RefreshControl spinner appears in default color (gray)
 *
 * Steps to reproduce:
 * 1. Pull down on the ScrollView to trigger refresh
 * 2. Observe that the spinner is NOT orange as specified in tintColor prop
 *
 * Workaround (commented out below):
 * Setting tintColor after a delay works, but this shouldn't be necessary.
 */
export const RefreshControlTintColorScreen = () => {
  const [refreshing, setRefreshing] = useState(false)

  const manualRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 2000)
  }

  /**
   * Workaround: Applying tintColor after a delay fixes the issue
   * Uncomment to test the workaround
   */
  // const [tintColor, setTintColor] = useState<ColorValue>("white")
  // useEffect(() => {
  //   setTimeout(() => setTintColor("orange"), 500)
  // }, [])

  return (
    <SafeAreaView style={$container}>
      <ScrollView
        alwaysBounceVertical={false}
        automaticallyAdjustContentInsets={false}
        contentInsetAdjustmentBehavior="never"
        style={$scrollView}
        contentContainerStyle={$scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={manualRefresh}
            tintColor="orange" // Should be orange but isn't respected
            // tintColor={tintColor} // Uncomment for workaround
          />
        }
      >
        <Text style={$title}>RefreshControl tintColor Bug (iOS)</Text>

        <Text style={$instructions}>
          This screen demonstrates that the tintColor prop on RefreshControl is not respected on
          iOS.
        </Text>

        <Text style={$instructionsTitle}>Instructions:</Text>
        <Text style={$instructions}>1. Pull down on the ScrollView to trigger refresh</Text>
        <Text style={$instructions}>
          2. Observe that the spinner should be ORANGE but appears in default color
        </Text>

        {Array.from({ length: 20 }, (_, i) => (
          <View key={`square_${i}`} style={$blueSquare} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const $container: ViewStyle = { flex: 1, backgroundColor: "white" }

const $scrollView: ViewStyle = { width: "100%", height: "100%" }

const $scrollContent: ViewStyle = {
  paddingHorizontal: 40,
  paddingVertical: 20,
  alignItems: "center",
}

const $title: TextStyle = {
  fontSize: 24,
  fontWeight: "bold",
  marginBottom: 20,
  textAlign: "center",
}

const $instructionsTitle: TextStyle = {
  fontSize: 20,
  fontWeight: "600",
  marginTop: 20,
  marginBottom: 10,
}

const $instructions: TextStyle = { fontSize: 16, marginBottom: 10, lineHeight: 24 }

const $blueSquare: ViewStyle = {
  width: 200,
  height: 200,
  borderRadius: 20,
  backgroundColor: "blue",
  marginVertical: 20,
}
