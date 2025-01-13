import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { FirstTabScreen, SecondTabScreen } from "@/screens"

export type DemoTabParamList = {
  FirstTab: undefined
  SecondTab: undefined
}

const Tab = createBottomTabNavigator<DemoTabParamList>()

export function DemoNavigator() {
  return (
    <Tab.Navigator
    // Don't set initialRouteName here unless you're sure you want to override the default
    >
      <Tab.Screen
        name="FirstTab"
        component={FirstTabScreen}
        options={{ headerTitle: "First Tab Screen" }}
      />
      <Tab.Screen
        name="SecondTab"
        component={SecondTabScreen}
        options={{ headerTitle: "Second Tab Screen" }}
      />
      {/* Add other tab screens here */}
    </Tab.Navigator>
  )
}
