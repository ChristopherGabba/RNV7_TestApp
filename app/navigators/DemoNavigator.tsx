import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { DemoShowroomScreen } from "../screens/DemoShowroomScreen/DemoShowroomScreen"

export type DemoTabParamList = {
  DemoShowroom: undefined
  // Add other tab screens here
}

const Tab = createBottomTabNavigator<DemoTabParamList>()

export function DemoNavigator() {
  return (
    <Tab.Navigator
      // Don't set initialRouteName here unless you're sure you want to override the default
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="DemoShowroom" component={DemoShowroomScreen} />
      {/* Add other tab screens here */}
    </Tab.Navigator>
  )
}
