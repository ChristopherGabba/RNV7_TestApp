import { SafeAreaView, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { useAuth } from "@/models/AuthContext"

export const LoginScreen = () => {
  const { login } = useAuth()

  return (
    <SafeAreaView style={{ paddingVertical: 50, paddingHorizontal: 50, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={$logIn}>Login Screen</Text>

      <TouchableOpacity style={$tapButton} onPress={() => login("RANDOMTOKEN")}>
        <Text>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const $logIn: TextStyle = {
  marginBottom: 50,
}

const $tapButton: ViewStyle = {
  marginTop: 50,
  backgroundColor: "red",
  justifyContent: "center",
  alignItems: "center",
  width: 200,
  height: 50,
}
// @demo remove-file
