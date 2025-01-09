import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { UploadScreen, WatchAndDeleteScreen } from "@/screens"

export type DemoTabParamList = {
  Upload: undefined
  WatchAndDelete: undefined
  // Add other tab screens here
}

const Tab = createBottomTabNavigator<DemoTabParamList>()

export function DemoNavigator() {
  return (
    <Tab.Navigator
    // Don't set initialRouteName here unless you're sure you want to override the default
    >
      <Tab.Screen name="Upload" component={UploadScreen} />
      <Tab.Screen name="WatchAndDelete" component={WatchAndDeleteScreen} />
      {/* Add other tab screens here */}
    </Tab.Navigator>
  )
}
