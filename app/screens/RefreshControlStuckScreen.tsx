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
 * Bug Reproduction: RefreshControl Gets Stuck When Changing Tabs
 *
 * Steps to reproduce:
 * 1. Pull down on the ScrollView to trigger refresh
 * 2. While the RefreshControl is active, switch to another tab
 * 3. Return to this tab - the RefreshControl will be stuck
 */
export const RefreshControlStuckScreen = () => {
  const [refreshing, setRefreshing] = useState(false)

  const manualRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 10000)
  }

  return (
    <SafeAreaView style={$container}>
      <ScrollView
        alwaysBounceVertical={false}
        automaticallyAdjustContentInsets={false}
        contentInsetAdjustmentBehavior="never"
        style={$scrollView}
        contentContainerStyle={$scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={manualRefresh} tintColor="orange" />
        }
      >
        <Text style={$title}>RefreshControl Stuck Bug</Text>

        <Text style={$instructions}>
          This screen demonstrates that changing tabs while RefreshControl is active causes it to
          get stuck.
        </Text>

        <Text style={$instructionsTitle}>Instructions:</Text>
        <Text style={$instructions}>1. Pull down on the ScrollView to start refreshing</Text>
        <Text style={$instructions}>
          2. Switch to another tab while it's refreshing (10 second delay)
        </Text>
        <Text style={$instructions}>
          3. Return to this tab and observe the stuck RefreshControl
        </Text>

        {Array.from({ length: 20 }, (_, i) => (
          <View key={`square_${i}`} style={$greenSquare} />
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

const $greenSquare: ViewStyle = {
  width: 200,
  height: 200,
  borderRadius: 20,
  backgroundColor: "green",
  marginVertical: 20,
}
