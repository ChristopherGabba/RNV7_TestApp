import { useNavigation } from "@react-navigation/native"
import { SafeAreaView, Text, TouchableOpacity } from "react-native"

export const FirstTabScreen = () => {
  const navigation = useNavigation()

  const openModel = () => {
    navigation.navigate("Modal")
  }

  return (
    <SafeAreaView style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <TouchableOpacity
        onPress={openModel}
        style={{
          width: 200,
          height: 45,
          backgroundColor: "green",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text> Open Modal Screen</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

// @demo remove-file
