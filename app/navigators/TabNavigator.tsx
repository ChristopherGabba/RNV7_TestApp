import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { RefreshControlTintColorScreen, RefreshControlStuckScreen } from "@/screens"

export type DemoTabParamList = {
  RefreshControlTintColor: undefined
  RefreshControlStuck: undefined
}

const Tab = createBottomTabNavigator<DemoTabParamList>()

export function TabNavigator() {
  return (
    <Tab.Navigator
    // Don't set initialRouteName here unless you're sure you want to override the default
    >
      <Tab.Screen
        name="RefreshControlTintColor"
        component={RefreshControlTintColorScreen}
        options={{ headerTitle: "RefreshControl Tint Color Reproduction" }}
      />
      <Tab.Screen
        name="RefreshControlStuck"
        component={RefreshControlStuckScreen}
        options={{ headerTitle: "RefreshControl Stuck Reproduction" }}
      />
      {/* Add other tab screens here */}
    </Tab.Navigator>
  )
}
