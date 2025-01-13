import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context" // @mst remove-current-line
import { AppNavigator } from "./navigators"
import { useEffect } from "react"
import * as Linking from "expo-linking"
import { LinkingOptions, PathConfigMap } from "@react-navigation/native"
import * as Notifications from "expo-notifications"
export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

const prefixes = [Linking.createURL("")]
const config: {
  initialRouteName?: never
  screens: PathConfigMap<NonNullable<unknown>>
} = {
  screens: {
    Demo: {
      screens: {
        FirstTab: "firsttab",
        SecondTab: "secondtab",
      },
    },
    Modal: "modal",
  },
}
const linking: LinkingOptions<NonNullable<unknown>> = {
  prefixes,
  config,
  async getInitialURL() {
    // First, you may want to do the default deep link handling
    // Check if app was opened from a deep link
    const url = await Linking.getInitialURL()

    if (url != null) {
      return url
    }

    // Handle URL from expo push notifications
    const response = await Notifications.getLastNotificationResponseAsync()

    return response?.notification.request.content.data.url
  },
  subscribe(listener) {
    const onReceiveURL = ({ url }: { url: string }) => listener(url)

    // Listen to incoming links from deep linking
    const eventListenerSubscription = Linking.addEventListener("url", onReceiveURL)

    // Listen to expo push notifications
    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      const url = response.notification.request.content.data.url

      // Any custom logic to see whether the URL needs to be handled
      //...
      console.log("Deep linking to url", url)
      // Let React Navigation handle the URL
      listener(url)
    })

    return () => {
      // Clean up the event listeners
      eventListenerSubscription.remove()
      subscription.remove()
    }
  },
}

interface AppProps {
  hideSplashScreen: () => Promise<void>
}

/**
 * This is the root component of our app.
 * @param {AppProps} props - The props for the `App` component.
 * @returns {JSX.Element} The rendered `App` component.
 */
function App(props: AppProps) {
  const { hideSplashScreen } = props
  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  useEffect(() => {
    setTimeout(() => hideSplashScreen(), 2000)
  }, [])

  // otherwise, we're ready to render the app
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <AppNavigator linking={linking} />
    </SafeAreaProvider>
  )
}

export default App
