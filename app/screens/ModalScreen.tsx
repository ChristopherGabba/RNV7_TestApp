import { navigationRef } from "@/navigators"
import { SafeAreaView, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native"

export const ModalScreen = () => {
  return (
    <SafeAreaView
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "gray",
        opacity: 0.8,
        flex: 1,
      }}
    >
      <TouchableOpacity
        onPress={() => navigationRef.goBack()}
        style={{
          width: 200,
          height: 45,
          backgroundColor: "orange",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Close Modal</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

// @demo remove-file
