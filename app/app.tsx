import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context" // @mst remove-current-line
import { AppNavigator } from "./navigators"
import { useEffect } from "react"
import { Authenticator } from "@aws-amplify/ui-react-native"

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

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
      <Authenticator.Provider>
        <Authenticator>
          <AppNavigator />
        </Authenticator>
      </Authenticator.Provider>
    </SafeAreaProvider>
  )
}

export default App
